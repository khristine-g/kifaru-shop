import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, Category } from "./products";

interface AdminState {
  items: Product[];
  add: (p: Omit<Product, "id">) => void;
  remove: (id: string) => void;
  _hasHydrated: boolean; // Tracking property to safe-guard client hydration
  setHasHydrated: (state: boolean) => void;
}

/**
 * Frontend-only stub for admin-added items.
 * Protected against Next.js SSR Hydration errors.
 */
export const useAdminProductsStore = create<AdminState>()(
  persist(
    (set) => ({
      items: [],
      add: (p) =>
        set((s) => ({
          items: [...s.items, { ...p, id: `admin_${Date.now()}` }],
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "kifaru-admin-products",
      // This listener runs as soon as local storage data loads into your client browser
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Custom hook wrapper to ensure your Next.js components don't see state until it matches the browser
export function useAdminProducts() {
  const store = useAdminProductsStore();
  
  return {
    items: store._hasHydrated ? store.items : [], // Guard state from rendering on Server
    add: store.add,
    remove: store.remove,
  };
}

export const ADMIN_CATEGORIES: Category[] = ["coffee", "textiles", "decor", "jewelry"];