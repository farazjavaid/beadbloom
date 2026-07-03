'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const channels = [
  { icon: Mail, label: 'Email', value: 'hadisairfan1@gmail.com', href: 'mailto:hadisairfan1@gmail.com' },
  { icon: Phone, label: 'Phone', value: '03123456789', href: 'tel:+923123456789' },
  { icon: MapPin, label: 'Studio', value: 'Pakistan', href: '#' },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Say hello"
          title={
            <>
              Let's start a <span className="text-gradient">conversation</span>
            </>
          }
          subtitle="Custom orders, gifting, or just to say hi — we'd love to hear from you."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 lg:col-span-2"
          >
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:border-accent/60 hover:shadow-glow"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose to-violet text-white shadow-glow transition-transform group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">{c.label}</p>
                    <p className="font-semibold text-ink">{c.value}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="glass space-y-4 rounded-3xl p-6 sm:p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                  Your name
                </label>
                <input id="name" required className="input-field" placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                  Email
                </label>
                <input id="email" type="email" required className="input-field" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Subject
              </label>
              <input id="subject" required className="input-field" placeholder="Custom necklace inquiry" />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="input-field resize-none"
                placeholder="Tell us what you have in mind…"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || sent}
              className="btn-primary w-full disabled:opacity-70"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={18} /> Message sent!
                </>
              ) : submitting ? (
                <>Sending…</>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}