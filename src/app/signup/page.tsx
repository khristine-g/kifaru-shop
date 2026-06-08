"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Upgraded from TanStack Router
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  // Accessing the state hydration wrapper directly without a nested selector
  const signup = useAuth((s) => s.signup);
  const router = useRouter(); // Upgraded from TanStack useNavigate()
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await signup(name, email, password);
      // Next.js routing push behavior
      router.push(u.role === "admin" ? "/admin" : "/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] grid lg:grid-cols-2">
      {/* Form Entry Panel */}
      <div className="flex items-center justify-center px-6 py-16 order-2 lg:order-1">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmit}
          className="w-full max-w-md space-y-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">— Create account</p>
            <h1 className="font-serif-display text-5xl text-foreground">Join the journey.</h1>
          </div>

          <div className="space-y-4">
            <Field label="Full name" value={name} onChange={setName} required />
            <Field label="Email" type="email" value={email} onChange={setEmail} required />
            <Field label="Password" type="password" value={password} onChange={setPassword} required />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-shine w-full inline-flex items-center justify-center gap-3 py-4 bg-foreground text-background rounded-full font-medium disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create account <ArrowRight className="w-4 h-4" /></>}
          </motion.button>

          <p className="text-sm text-muted-foreground text-center">
            Already have one?{" "}
            <Link href="/login" className="link-underline text-foreground font-medium">
              Sign in
            </Link>
          </p>
        </motion.form>
      </div>

      {/* Aesthetic Side Cover Banner */}
      <div className="hidden lg:block relative overflow-hidden bg-foreground order-1 lg:order-2">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full flex flex-col justify-end p-12 text-background"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-6">— New here</p>
          <h2 className="font-serif-display text-6xl leading-[0.95]">
            Belong to a <em>craft</em> that crosses continents.
          </h2>
        </motion.div>
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