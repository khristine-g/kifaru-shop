"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Upgraded from TanStack Router
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus, Trash2, Package, ImageIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useAdminProducts, ADMIN_CATEGORIES } from "@/lib/adminProducts";
import { PRODUCTS, type Category } from "@/lib/products";

export default function AdminPage() {
  const user = useAuth((s) => s.user);
  const router = useRouter(); // Upgraded from TanStack useNavigate()
  const { items, add, remove } = useAdminProducts();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "coffee" as Category,
    price: "",
    image: "",
    tagline: "",
    description: "",
    origin: "",
    artisan: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");
    add({
      name: form.name,
      slug,
      category: form.category,
      price: Number(form.price) || 0,
      image: form.image || "https://placehold.co/800x1000/eee/333?text=Kifaru",
      tagline: form.tagline,
      description: form.description,
      origin: form.origin,
      artisan: form.artisan,
    });
    setForm({ ...form, name: "", slug: "", price: "", tagline: "", description: "", origin: "", artisan: "", image: "" });
  };

  if (!user || user.role !== "admin") return null;

  const totalCatalog = PRODUCTS.length + items.length;

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-end justify-between gap-6 mb-12"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">— Admin</p>
          <h1 className="font-serif-display text-5xl md:text-7xl">Catalog studio.</h1>
          <p className="text-muted-foreground mt-3">Welcome, {user.name}. Add or remove items from the catalog.</p>
        </div>
        <div className="flex gap-3">
          <Stat label="Catalog items" value={totalCatalog} />
          <Stat label="Your additions" value={items.length} />
        </div>
      </motion.header>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={onSubmit}
          className="lg:col-span-5 border border-border rounded-3xl p-8 bg-secondary/30 space-y-5 h-fit sticky top-24"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center"><Plus className="w-4 h-4" /></span>
            <h2 className="font-serif-display text-3xl">Add new item</h2>
          </div>

          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Field label="Slug (optional)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="auto-generated" />

          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Category</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {ADMIN_CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setForm({ ...form, category: c })}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-smooth ${
                    form.category === c
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <Field label="Price (USD)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
          <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://..." />
          <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
          <Field label="Origin" value={form.origin} onChange={(v) => setForm({ ...form, origin: v })} />
          <Field label="Artisan" value={form.artisan} onChange={(v) => setForm({ ...form, artisan: v })} />

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="mt-2 w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground resize-none"
            />
          </label>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-shine w-full inline-flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-full font-medium"
          >
            <Plus className="w-4 h-4" /> Add to catalog
          </motion.button>
        </motion.form>

        {/* List */}
        <div className="lg:col-span-7">
          <h2 className="font-serif-display text-3xl mb-6 flex items-center gap-3">
            <Package className="w-5 h-5" /> Your additions
          </h2>

          {items.length === 0 ? (
            <div className="border border-dashed border-border rounded-3xl p-16 text-center text-muted-foreground">
              <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-50" />
              No items added yet. Fill the form to add your first.
            </div>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((p) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ type: "spring", stiffness: 240, damping: 26 }}
                    className="flex items-center gap-4 border border-border rounded-2xl p-4 bg-background hover-lift"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary shrink-0 relative">
                      {/* Using Next.js Image component for web URLs requires remote patterns in next.config or unoptimized fallback */}
                   <Image 
    src={p.image} 
    alt={p.name} 
    fill
    sizes="64px"
    className="object-cover" 
  />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{p.category} · ${p.price}</div>
                    </div>
                    <Link href="/shop" className="text-xs link-underline text-muted-foreground">View</Link>
                    <button
                      onClick={() => remove(p.id)}
                      className="w-9 h-9 rounded-full border border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive flex items-center justify-center transition-smooth"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border rounded-2xl px-5 py-3">
      <div className="font-serif-display text-3xl leading-none">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Field({
  label, type = "text", value, onChange, required, placeholder,
}: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground transition-colors"
      />
    </label>
  );
}