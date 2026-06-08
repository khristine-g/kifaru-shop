// src/app/product/[slug]/ProductClientPage.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { PRODUCTS, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import Image from "next/image";

interface ProductClientPageProps {
  product: Product;
}

export default function ProductClientPage({ product }: ProductClientPageProps) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-clay mb-8 transition-smooth">
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <div className="aspect-square rounded-[2rem] overflow-hidden bg-secondary shadow-elegant relative">
         <Image 
  src={product.image} 
  alt={product.name} 
  fill
  sizes="(max-w-lg) 100vw, 50vw"
  priority
  className="w-full h-full object-cover" 
/>
        </div>

        {/* Product Info details */}
        <div className="flex flex-col">
          {product.badge && (
            <span className="inline-flex self-start mb-4 bg-clay/10 text-clay text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          <h1 className="font-serif-display text-4xl md:text-5xl text-espresso mb-3 leading-tight">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-6">{product.tagline}</p>
          <div className="text-3xl font-semibold text-clay mb-8">${product.price}</div>

          <p className="text-foreground/80 leading-relaxed mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8 p-5 bg-secondary/60 rounded-2xl">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Origin</div>
              <div className="text-sm font-medium text-espresso">{product.origin}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Crafted by</div>
              <div className="text-sm font-medium text-espresso">{product.artisan}</div>
            </div>
          </div>

          {/* Cart Quantity Adjusters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center bg-secondary rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-accent rounded-full transition-smooth" aria-label="Decrease">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-accent rounded-full transition-smooth" aria-label="Increase">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-4 bg-clay text-primary-foreground rounded-full font-medium shadow-warm hover:shadow-elegant transition-smooth"
            >
              {added ? <><Check className="w-5 h-5" /> Added to cart</> : <><ShoppingBag className="w-5 h-5" /> Add to cart</>}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-serif-display text-3xl text-espresso mb-8">You might also love</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}