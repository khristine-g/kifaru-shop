import { PRODUCTS, getProduct, type Product } from "./products";

// Updated from Vite environment syntax to Next.js standard conventions
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) throw new Error("API_BASE environment variable is not configured");
  
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 
      "Content-Type": "application/json", 
      ...(init?.headers || {}) 
    },
    ...init,
  });
  
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  async listProducts(): Promise<Product[]> {
    if (!API_BASE) return PRODUCTS;
    return apiFetch<Product[]>("/products");
  },

  async getProduct(slug: string): Promise<Product | undefined> {
    if (!API_BASE) return getProduct(slug);
    return apiFetch<Product>(`/products/${slug}`);
  },

  async createOrder(payload: {
    items: { id: string; quantity: number }[];
    email: string;
    shipping: Record<string, string>;
  }): Promise<{ id: string }> {
    if (!API_BASE) {
      // Simulated checkout delay for local mock testing
      await new Promise((r) => setTimeout(r, 600));
      return { id: `mock_${Date.now()}` };
    }
    return apiFetch<{ id: string }>("/orders", { 
      method: "POST", 
      body: JSON.stringify(payload) 
    });
  },
};