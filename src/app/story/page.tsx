// src/app/story/page.tsx
import { Metadata } from "next";
import Image from "next/image";

// Local image asset imports
import storyFarm from "@/assets/story-farm.jpg";
import storyArtisan from "@/assets/story-artisan.jpg";

// 1. CLEAN SERVER SEO HEADER MANAGEMENT
export const metadata: Metadata = {
  title: "Our Story", // Resolves to "Our Story | Kifaru" via your root layout template
  description: "How Kifaru connects Kenyan coffee growers and master artisans directly with global homes.",
  openGraph: {
    title: "Our Story | Kifaru",
    description: "Direct from Kenyan growers and artisans to your doorstep.",
    images: [{ url: storyFarm.src }],
  },
};

// 2. STATIC ULTRA-FAST SERVER COMPONENT
export default function StoryPage() {
  return (
    <article className="-mt-10"> {/* Pulls up past global layout padding for a true hero bleed */}
      {/* Hero Header Section */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={storyFarm}
          alt="Coffee farm at sunrise on Mount Kenya"
          fill
          priority
          placeholder="blur" // Uses Next.js native static blur handling smoothly
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent" />
        <div className="relative z-10 h-full flex items-end max-w-7xl mx-auto px-6 lg:px-10 pb-16">
          <div className="max-w-2xl text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-4">Our Story</p>
            <h1 className="font-serif-display text-5xl md:text-6xl leading-tight">
              From the highlands of Kenya, with intention.
            </h1>
          </div>
        </div>
      </section>

      {/* Copy/Prose Section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xl text-stone-800 leading-relaxed mb-8 font-light">
          Kifaru — Swahili for <em>rhino</em> — was born from a simple frustration: the world's best coffee and most beautiful handmade goods were leaving Kenya, but the people who grew and crafted them rarely saw the value.
        </p>
        <p className="text-stone-700 leading-relaxed mb-8">
          We work directly with cooperatives and artisan collectives across Kenya. The coffee in your bag was picked by hand in Nyeri or on the slopes of Mount Kenya. The basket on your floor was woven over weeks by a master in Machakos. The beadwork around your wrist carries colors that mean something to the woman who strung it.
        </p>
      </section>

      {/* Narrative & Stats Grid Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl relative">
          <Image
            src={storyArtisan}
            alt="Artisan hands at work"
            fill
            sizes="(max-w-lg) 100vw, 50vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif-display text-4xl text-stone-900 mb-6 leading-tight">
            No middlemen. No mystery.
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Every product page tells you exactly who made it and where. We pay above-market rates and reinvest into the cooperatives we partner with — so the next generation of growers and weavers has reason to keep going.
          </p>
          
          {/* Brand Stats Badge Elements */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { stat: "12+", label: "Co-ops & collectives" },
              { stat: "100%", label: "Traceable origin" },
              { stat: "0", label: "Middlemen" },
            ].map((s) => (
              <div key={s.label} className="text-center p-5 bg-stone-100/80 rounded-2xl">
                <div className="font-serif-display text-3xl text-amber-800">{s.stat}</div>
                <div className="text-xs text-stone-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}