export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  stock: number;
  // extend as needed
}

export interface CartItem {
  product: Product;
  quantity: number;
}
