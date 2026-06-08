"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORIES, getByCategory, type Category } from "@/lib/products";
import { useAdminProducts } from "@/lib/adminProducts";
import { ProductCard } from "@/components/ProductCard";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read current category parameter from URL string fallback to 'all'
  const rawCategory = searchParams.get("category") || "all";
  const validCategories = ["all", "coffee", "textiles", "decor", "jewelry"];
  const category = validCategories.includes(rawCategory) ? rawCategory : "all";

  // Invoked directly without a nested selector to match your hydration wrapper
  const { items: adminItems } = useAdminProducts();
  
  // Fetch matching products from local static array data
  const base = getByCategory(category as Category | "all");
  
  // Safely filtered using explicit type definitions to prevent array typing mismatch
  const extra = category === "all" 
    ? adminItems 
    : adminItems.filter((p: any) => p.category === category);
    
  const products = [...extra, ...base];

  const tabs: { id: Category | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  // Updates parameters seamlessly into the location address bar
  const handleTabClick = (tabId: string) => {
    if (tabId === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${tabId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-clay font-semibold mb-3">Shop</p>
        <h1 className="font-serif-display text-5xl md:text-6xl text-espresso">The Collection</h1>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Hand-selected goods from Kenyan coffee growers and master artisans.
        </p>
      </div>

      {/* Navigation Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabClick(t.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              category === t.id
                ? "bg-clay text-white shadow-warm"
                : "bg-stone-100 text-stone-900 hover:bg-stone-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Animated Product Grid Showcase */}
      {products.length === 0 ? (
        <div className="text-center py-12 text-stone-500">
          No products found in this category yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}