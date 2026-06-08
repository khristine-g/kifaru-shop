import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"; 
import { CartProvider } from "@/context/CartContext"; // Adjust path if needed
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kifaru Coffee & Co.",
  description: "Curated coffee and artisan goods shipped from East Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrapping with CartProvider provides access to all client components */}
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}