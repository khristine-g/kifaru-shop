// src/app/login/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in", // Next.js passes this straight to the root layout template
  description: "Sign in to your Kifaru account.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
