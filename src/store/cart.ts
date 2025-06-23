import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, qty: number) => void;
  updateItem: (productId: number, qty: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty) => set(state => {
        const existing = state.items.find(i => i.product.id === product.id);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
            ),
          };
        }
        return { items: [...state.items, { product, quantity: qty }] };
      }),
      updateItem: (productId, qty) => set(state => ({
        items: state.items.map(i =>
          i.product.id === productId ? { ...i, quantity: qty } : i
        ),
      })),
      removeItem: (productId) => set(state => ({
        items: state.items.filter(i => i.product.id !== productId),
      })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ items: state.items }),
    }
  )
);
