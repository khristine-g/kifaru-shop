"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext"; 
import { ArrowUpRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-secondary block rounded-2xl"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {product.badge && (
          <span className="absolute top-4 left-4 bg-background text-foreground text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            {product.badge}
          </span>
        )}
        
        <button
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            addToCart(product);
          }}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-spring hover:bg-foreground hover:text-background z-10"
        >
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </Link>
      
      <div className="pt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif-display text-xl text-foreground leading-tight truncate">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1 truncate">{product.tagline}</p>
        </div>
        <span className="text-base font-medium text-foreground whitespace-nowrap">${product.price}</span>
      </div>
    </div>
  );
}