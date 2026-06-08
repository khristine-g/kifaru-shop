"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-clay font-semibold mb-3">Get in touch</p>
        <h1 className="font-serif-display text-5xl md:text-6xl text-espresso">Karibu — Welcome.</h1>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Questions about our products, wholesale partnerships, or just want to say jambo? We'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "hello@kifarucoffee.com" },
            { icon: Phone, label: "Phone", value: "+1 (555) 042-7000" },
            { icon: MapPin, label: "Roastery", value: "Nairobi - Connecticut" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 p-5 bg-secondary/60 rounded-2xl">
              <div className="w-11 h-11 rounded-full bg-clay/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-clay" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
                <div className="font-medium text-espresso">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form
          onSubmit={(e) => { 
            e.preventDefault(); 
            setSent(true); 
          }}
          className="lg:col-span-2 bg-card rounded-2xl p-8 shadow-soft space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Name</label>
              <input required className="w-full px-4 py-3 rounded-xl bg-secondary border border-transparent focus:border-clay focus:bg-background outline-none transition-smooth" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Email</label>
              <input required type="email" className="w-full px-4 py-3 rounded-xl bg-secondary border border-transparent focus:border-clay focus:bg-background outline-none transition-smooth" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-espresso mb-2">Subject</label>
            <select className="w-full px-4 py-3 rounded-xl bg-secondary border border-transparent focus:border-clay focus:bg-background outline-none transition-smooth">
              <option>General inquiry</option>
              <option>Wholesale / reseller</option>
              <option>Order question</option>
              <option>Partnership</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-espresso mb-2">Message</label>
            <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-secondary border border-transparent focus:border-clay focus:bg-background outline-none transition-smooth resize-none" placeholder="Tell us how we can help..." />
          </div>
          <button type="submit" disabled={sent} className="inline-flex items-center gap-2 px-8 py-4 bg-clay text-primary-foreground rounded-full font-medium shadow-warm hover:shadow-elegant transition-smooth disabled:opacity-60">
            {sent ? "Message sent — asante!" : <>Send message <Send className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}