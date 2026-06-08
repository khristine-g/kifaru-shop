"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // Upgraded from TanStack
import { ShoppingBag, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, cartCount } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const items = useCart((s) => s.items);
  const count = cartCount(items);
  
  
  const user = useAuth((s) => s?.user ?? null);
const logout = useAuth((s) => s?.logout);
  const router = useRouter();
  const pathname = usePathname(); 

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/story", label: "Story" },
    { href: "/contact", label: "Contact" },
  ] as const;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-serif-display text-lg group-hover:rotate-12 transition-all duration-300">
            K
          </span>
          <span className="font-serif-display text-2xl text-foreground leading-none tracking-tight">
            Kifaru
          </span>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-foreground font-semibold" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls Framework */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="inline-flex items-center gap-2 px-4 h-11 rounded-full border border-border hover:bg-foreground hover:text-background transition-colors duration-300 text-sm"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[80px] truncate">{user.name}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-52 bg-background border border-border rounded-2xl p-2 shadow-lg z-50 animate-in fade-in zoom-in-95"
                  >
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-stone-100"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                        router.push("/");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-stone-100 text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-foreground/70 hover:text-foreground link-underline">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium px-4 h-11 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity duration-200 inline-flex items-center"
              >
                Join
              </Link>
            </div>
          )}

          {/* Shopping Cart Indicator Icon */}
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-border hover:bg-foreground hover:text-background transition-colors duration-300 group"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile Navigation Drawer Trigger */}
          <button
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-border"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Navigation Panel Overlay */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-base font-medium" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="text-base font-medium" onClick={() => setOpen(false)}>
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    router.push("/");
                  }}
                  className="text-base font-medium text-left"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-base font-medium" onClick={() => setOpen(false)}>Sign in</Link>
                <Link href="/signup" className="text-base font-medium" onClick={() => setOpen(false)}>Create account</Link>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}