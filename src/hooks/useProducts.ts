import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import type { Product } from '../types';

interface UseProductsParams {
  search?: string;
  limit?: number;
  category?: string;
}

export function useProducts(params: UseProductsParams) {
  return useQuery<Product[], Error>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
}
