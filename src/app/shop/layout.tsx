// src/app/shop/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Our Collection", // Becomes "Shop Our Collection | Kifaru"
  description: "Browse curated premium Kenyan coffee, artisanal textiles, hand-crafted decor, and beadwork jewelry.",
  openGraph: {
    title: "Shop Our Collection | Kifaru",
    description: "Browse curated premium Kenyan coffee, artisanal textiles, hand-crafted decor, and beadwork jewelry.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}