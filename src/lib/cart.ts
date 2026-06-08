import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

// Ensure your CartItem interface handles both String URLs and Next.js local image objects
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: any; 
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

/**
 * Persisted Zustand cart store shielded against Next.js SSR Hydration errors.
 */
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: qty,
              },
            ],
          };
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [] }),
      
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "kifaru-cart",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * Custom hook wrapper to select cart state safely inside your Next.js components.
 * Returns empty fallback data values on Server side execution rendering passes.
 */
export function useCart<T>(selector: (state: CartState) => T): T {
  const store = useCartStore();
  const result = selector(store);
  
  if (!store._hasHydrated) {
    // If a component tries to read items before browser hydration, feed an empty array safely
    if (selector.toString().includes(".items")) {
      return [] as unknown as T;
    }
  }
  
  return result;
}

// Global utility helper configurations
export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);