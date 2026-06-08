import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  email: string;
  name: string;
  role: "admin" | "customer";
}

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (name: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

/**
 * Frontend-only stub auth protected against Next.js SSR Hydration errors.
 */
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email, _password) => {
        await new Promise((r) => setTimeout(r, 500));
        const user: AuthUser = {
          email,
          name: email.split("@")[0],
          role: email.toLowerCase().includes("admin") ? "admin" : "customer",
        };
        set({ user });
        return user;
      },
      signup: async (name, email, _password) => {
        await new Promise((r) => setTimeout(r, 500));
        const user: AuthUser = {
          email,
          name,
          role: email.toLowerCase().includes("admin") ? "admin" : "customer",
        };
        set({ user });
        return user;
      },
      logout: () => set({ user: null }),
      
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "kifaru-auth",
      // Triggers as soon as the store hydrates from localStorage on the client browser
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * Custom hook wrapper to select auth state safely in Next.js components.
 * Prevents hydration errors by returning null until localStorage has been read.
 */
export function useAuth<T>(selector: (state: AuthState) => T): T {
  const store = useAuthStore();
  const result = selector(store);
  
  // If we haven't rehydrated from localStorage yet, force-intercept properties safely
  if (!store._hasHydrated) {
    if (selector.toString().includes(".user")) {
      return null as unknown as T;
    }
  }
  
  return result;
}