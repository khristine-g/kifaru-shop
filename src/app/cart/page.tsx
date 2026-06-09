"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart, cartTotal } from "@/lib/cart";
import { api } from "@/lib/api";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart((s) => s);
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const subtotal = cartTotal(items);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await api.createOrder({
        items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        email: "guest@example.com",
        shipping: {},
      });
      setOrderId(res.id);
      clear();
    } catch (e) {
      console.error(e);
      alert("Checkout failed. Wire your backend in src/lib/api.ts");
    } finally {
      setCheckingOut(false);
    }
  };

  // 1. SUCCESS ORDER PLACED STATE
  if (orderId) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 mx-auto bg-clay/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-clay" />
        </div>
        <h1 className="font-serif-display text-4xl text-espresso mb-4">Asante sana!</h1>
        <p className="text-muted-foreground mb-2">Your order has been placed.</p>
        <p className="text-sm text-muted-foreground mb-8">
          Reference: <code className="bg-secondary px-2 py-1 rounded">{orderId}</code>
        </p>
        <Link href="/shop" className="inline-block px-8 py-4 bg-clay text-primary-foreground rounded-full font-medium">
          Keep shopping
        </Link>
      </div>
    );
  }

  // 2. EMPTY CART STATE
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-9 h-9 text-muted-foreground" />
        </div>
        <h1 className="font-serif-display text-4xl text-espresso mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add a few treasures from Kenya.</p>
        <Link href="/shop" className="inline-block px-8 py-4 bg-clay text-primary-foreground rounded-full font-medium shadow-warm">
          Browse the collection
        </Link>
      </div>
    );
  }

  // 3. MAIN SHOPPING CART VIEW
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="font-serif-display text-4xl md:text-5xl text-espresso mb-10">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            // Safe fallback image extraction layer to fix broken asset paths
            const cartProductImage = item.image || (item as any).imageUrl || (item as any).img || "/placeholder.jpg";

            return (
              <div key={item.id} className="flex gap-5 p-5 bg-card rounded-2xl shadow-soft">
                <Link 
                  href={`/product/${item.slug || item.id}`} 
                  className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0 block relative"
                >
                  <img 
                    src={cartProductImage} 
                    alt={item.name || "Product Image"} 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug || item.id}`} className="font-serif-display text-xl text-espresso block mb-1 truncate">
                    {item.name}
                  </Link>
                  <div className="text-clay font-semibold mb-3">${item.price}</div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="inline-flex items-center bg-secondary rounded-full">
                      <button 
                        onClick={() => setQty(item.id, item.quantity - 1)} 
                        className="w-9 h-9 flex items-center justify-center hover:bg-accent rounded-full" 
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => setQty(item.id, item.quantity + 1)} 
                        className="w-9 h-9 flex items-center justify-center hover:bg-accent rounded-full" 
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => remove(item.id)} className="text-sm text-muted-foreground hover:text-destructive inline-flex items-center gap-1.5">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="bg-secondary/60 rounded-2xl p-6 h-fit lg:sticky lg:top-28">
          <h2 className="font-serif-display text-2xl text-espresso mb-6">Order Summary</h2>
          <div className="space-y-3 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            {subtotal < 75 && subtotal > 0 && (
              <p className="text-xs text-clay">Add ${(75 - subtotal).toFixed(2)} more for free US shipping</p>
            )}
          </div>
          <div className="flex justify-between text-lg mb-6">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-clay">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="w-full px-6 py-4 bg-clay text-primary-foreground rounded-full font-medium shadow-warm hover:shadow-elegant transition-smooth disabled:opacity-60"
          >
            {checkingOut ? "Processing..." : "Checkout"}
          </button>
          <Link href="/shop" className="block text-center text-sm text-muted-foreground hover:text-clay mt-4">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}