"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Coffee, Hand, Truck, Leaf } from "lucide-react";
import heroImg from "@/assets/hero-coffee.jpg";
import storyArtisan from "@/assets/story-artisan.jpg";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 gradient-mesh" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-60" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 animate-fade-up">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60 mb-8">
                <span className="w-8 h-px bg-foreground" />
                Direct from Kenya — to the US
              </span>
              <h1 className="font-serif-display text-[clamp(3rem,9vw,8.5rem)] text-foreground leading-[0.92] mb-8 tracking-tight">
                Soul of Kenya,<br />
                <em className="font-serif-display">brewed</em> &amp; <em>woven.</em>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
                Single-origin coffee from highland estates and handcrafted artifacts from village artisans — uniquely Kenyan, ethically sourced, shipped to your door.
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Converted TanStack Router Link syntax 'to="/shop"' -> 'href="/shop"' */}
                <Link
                  href="/shop"
                  className="btn-shine group inline-flex items-center gap-3 pl-7 pr-3 py-3 bg-foreground text-background rounded-full font-medium transition-smooth hover:gap-5"
                >
                  Shop the Collection
                  <span className="w-9 h-9 rounded-full bg-background text-foreground flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-spring" />
                  </span>
                </Link>
                <Link
                  href="/story"
                  className="inline-flex items-center gap-2 px-7 py-3 text-foreground rounded-full font-medium border border-border hover:border-foreground transition-smooth"
                >
                  Our Story
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-fade-up delay-200">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant relative">
                {/* Upgraded <img> to Next.js optimized <Image /> */}
                <Image
                  src={heroImg}
                  alt="Premium Kenyan coffee beans"
                  width={1600}
                  height={1200}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1500ms]"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-3xl pointer-events-none" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-2xl p-5 shadow-soft hidden md:flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif-display text-xl text-foreground leading-none">AA Grade</div>
                  <div className="text-xs text-muted-foreground mt-1">Single-origin microlots</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-foreground text-background rounded-full px-5 py-2 text-xs uppercase tracking-widest hidden md:block animate-pulse-ring">
                New season
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TRUST */}
      <section className="border-b border-border bg-background overflow-hidden py-6">
        <div className="flex items-center gap-16 whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 shrink-0">
              {[
                { icon: Leaf, label: "Ethically sourced" },
                { icon: Hand, label: "Hand-crafted" },
                { icon: Truck, label: "Free US shipping over $75" },
                { icon: Coffee, label: "Small-batch roasted" },
                { icon: Leaf, label: "Direct from cooperatives" },
              ].map(({ icon: Icon, label }, j) => (
                <span key={`${i}-${j}`} className="inline-flex items-center gap-3 text-sm text-foreground/70">
                  <Icon className="w-4 h-4" />
                  {label}
                  <span className="w-1 h-1 rounded-full bg-foreground/30 ml-12" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">— Explore</p>
            <h2 className="font-serif-display text-5xl md:text-7xl text-foreground leading-[0.95]">
              Curated <em>categories.</em>
            </h2>
          </div>
          <Link href="/shop" className="link-underline text-sm font-medium text-foreground inline-flex items-center gap-2">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Converted search param tracking objects into clean, unified url strings */}
              <Link
                href={`/shop?category=${cat.id}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary flex flex-col justify-between border border-border block"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={800}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="relative z-10 flex justify-between p-6">
                  <span className="text-xs text-background/80 group-hover:text-background transition-smooth">
                    0{i + 1}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-background group-hover:rotate-45 transition-spring" />
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="font-serif-display text-3xl text-background transition-smooth">
  {cat.label}
</h3>
                  <p className="text-sm text-background/80 mt-2 transition-smooth">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-y border-border bg-secondary/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">— Featured</p>
              <h2 className="font-serif-display text-5xl md:text-7xl text-foreground leading-[0.95]">
                From the <em>collection.</em>
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p, i) => (
              <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
            <Image
              src={storyArtisan}
              alt="Kenyan artisan weaving a sisal basket"
              width={1200}
              height={1200}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1500ms]"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-foreground text-background rounded-2xl p-6 max-w-[220px] hidden md:block animate-float delay-300">
            <div className="font-serif-display text-4xl mb-1">12+</div>
            <div className="text-xs uppercase tracking-widest text-background/60">cooperatives partnered</div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">— Our Promise</p>
          <h2 className="font-serif-display text-4xl md:text-6xl text-foreground mb-8 leading-[0.95]">
            Every piece tells the story of the <em>hands</em> that made it.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            We work directly with cooperatives across Kenya — from the Karatina coffee growers in Nyeri to the Naserian women's beadwork collective in Kajiado. No middlemen. Fair prices. Authentic craft.
          </p>
          <Link
            href="/story"
            className="btn-shine group inline-flex items-center gap-3 pl-7 pr-3 py-3 bg-foreground text-background rounded-full font-medium hover:gap-5 transition-smooth"
          >
            Read our story
            <span className="w-9 h-9 rounded-full bg-background text-foreground flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-spring" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}