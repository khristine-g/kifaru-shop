// app/product/[slug]/AddToCartButton.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-stone-900 hover:bg-amber-800 text-white font-medium py-3 rounded-xl transition"
    >
      Add to Shopping Bag
    </button>
  );
}