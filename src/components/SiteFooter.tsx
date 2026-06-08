import Link from "next/link"; // Upgraded from TanStack Router
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-32 relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-background/5 animate-blob" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-background/5 animate-blob delay-300" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-24 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-background/10">
          <div className="lg:col-span-5">
            <h3 className="font-serif-display text-5xl md:text-6xl text-background mb-6 leading-[0.95]">
              From Kenya,<br /><em>with care.</em>
            </h3>
            <p className="text-background/60 max-w-md leading-relaxed">
              Curated coffee and artisan goods, shipped from East Africa to doorsteps across the United States.
            </p>
          </div>
          
          {/* Shop Collection Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-xs uppercase tracking-[0.2em] text-background/40 mb-5">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="link-underline text-background/90">
                  All Products
                </Link>
              </li>
              <li>
                {/* Next.js maps search objects cleanly using inline string parameters */}
                <Link href="/shop?category=coffee" className="link-underline text-background/90">
                  Coffee
                </Link>
              </li>
              <li>
                <Link href="/shop?category=decor" className="link-underline text-background/90">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jewelry" className="link-underline text-background/90">
                  Jewelry
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Routing Info Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-background/40 mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/story" className="link-underline text-background/90">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline text-background/90">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline text-background/90">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Core Values Marquee Banner ticker */}
        <div className="overflow-hidden py-12">
          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-12 shrink-0">
                {["Single Origin", "Hand Woven", "Direct Trade", "Made in Kenya", "Small Batch", "Shipped to USA"].map((t) => (
                  <span key={t} className="font-serif-display text-5xl md:text-7xl italic text-background/10 flex items-center gap-12">
                    {t} <ArrowUpRight className="w-8 h-8 text-background/20" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Lower Legal Frame Metas */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-background/10 text-sm text-background/40">
          <span>© {new Date().getFullYear()} Kifaru Coffee &amp; Co.</span>
          <span>Nairobi · Connecticut</span>
        </div>
      </div>
    </footer>
  );
}