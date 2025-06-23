import type { Product } from '../types';


export async function fetchProducts({ search = '', limit = 20, category = '' }: {
  search?: string;
  limit?: number;
  category?: string;
}): Promise<Product[]> {
  
  if (category && search) {
    const url = `${import.meta.env.VITE_API_BASE_URL}/products/category/${encodeURIComponent(category)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    const filtered = (data.products || data).filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(0, limit);
  }
  
  if (search && !category) {
    const params = new URLSearchParams();
    params.append('q', search);
    if (limit) params.append('limit', String(limit));
    const url = `${import.meta.env.VITE_API_BASE_URL}/products/search?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return (data.products || data).slice(0, limit);
  }
  
  if (category && !search) {
    const params = new URLSearchParams();
    if (limit) params.append('limit', String(limit));
    const url = `${import.meta.env.VITE_API_BASE_URL}/products/category/${encodeURIComponent(category)}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return (data.products || data).slice(0, limit);
  }
  
  const params = new URLSearchParams();
  if (limit) params.append('limit', String(limit));
  const url = `${import.meta.env.VITE_API_BASE_URL}/products?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return (data.products || data).slice(0, limit);
}
