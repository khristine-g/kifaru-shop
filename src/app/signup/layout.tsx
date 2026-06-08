// src/app/signup/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account", // Evaluates dynamically to "Create account | Kifaru"
  description: "Create your Kifaru account to check out artisan goods and premium single-origin coffees.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}