import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Wholesale — Kifaru Coffee & Co.",
  description: "Get in touch about orders, wholesale, or partnerships.",
  openGraph: {
    title: "Contact — Kifaru Coffee & Co.",
    description: "Get in touch about orders, wholesale, or partnerships.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}