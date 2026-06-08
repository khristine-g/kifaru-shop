"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Upgraded from TanStack Router
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const login = useAuth((s) => s.login);
  const router = useRouter(); // Upgraded from TanStack useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const u = await login(email, password);
      // Next.js standard string location pushes
      router.push(u.role === "admin" ? "/admin" : "/");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] grid lg:grid-cols-2">
      {/* Visual Accent Panel */}
      <div className="hidden lg:block relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full flex flex-col justify-end p-12 text-background"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-6">— Welcome back</p>
          <h2 className="font-serif-display text-6xl leading-[0.95]">
            Sip the <em>highlands.</em><br />Wear the <em>land.</em>
          </h2>
        </motion.div>
      </div>

      {/* Form Context Entry Panel */}
      <div className="flex items-center justify-center px-6 py-16">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmit}
          className="w-full max-w-md space-y-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">— Sign in</p>
            <h1 className="font-serif-display text-5xl text-foreground">Welcome back.</h1>
          </div>

          <div className="space-y-4">
            <Field label="Email" type="email" value={email} onChange={setEmail} required />
            <Field label="Password" type="password" value={password} onChange={setPassword} required />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-shine w-full inline-flex items-center justify-center gap-3 py-4 bg-foreground text-background rounded-full font-medium disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign in <ArrowRight className="w-4 h-4" /></>}
          </motion.button>

          <p className="text-sm text-muted-foreground text-center">
            New here?{" "}
            <Link href="/signup" className="link-underline text-foreground font-medium">
              Create an account
            </Link>
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Tip: use any email with "admin" in it to access the admin panel.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label, type = "text", value, onChange, required,
}: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground transition-colors"
      />
    </label>
  );
}