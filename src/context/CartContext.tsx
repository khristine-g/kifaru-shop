"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/lib/products";

// Define a unified structural shape for Cart Items
export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Safe Client Hydration: Load cart safely without crashing Next.js SSR
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("kifaru_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart storage data:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Sync cart changes cleanly to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("kifaru_cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (product: Product) => {
    console.log("🛒 Context intercepted addToCart for:", product); // Check browser console for this!

    setCart((prevCart) => {
      // Coerce both IDs to strings to completely bypass string vs number comparison issues
      const existingItem = prevCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        // If it exists, increment the item quantity immutably
        return prevCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // If it's a completely new item, append it cleanly
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => String(item.id) !== String(productId))
    );
  };

  const clearCart = () => setCart([]);

  // Dynamically compute total aggregate item counts
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Prevent flashing or hydration mismatch issues by waiting until initialized
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used inside a clean global CartProvider wrapper");
  }
  return context;
}