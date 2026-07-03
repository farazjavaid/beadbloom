'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gem, ArrowLeft } from 'lucide-react';

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center px-5 py-16 sm:py-24">
      <Link
        href="/"
        className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-2 text-xs font-medium text-muted backdrop-blur transition hover:border-accent hover:text-accent sm:left-8 sm:top-8"
      >
        <ArrowLeft size={14} /> Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-rose/40 via-violet/30 to-gold/30 opacity-60 blur-md" aria-hidden />
        <div className="glass-strong relative rounded-[26px] p-7 sm:p-9">
          <Link href="/" className="mb-6 flex items-center justify-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet shadow-glow">
              <Gem size={18} className="text-white" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight">
              Bead<span className="text-gradient">Bloom</span>
            </span>
          </Link>

          <div className="mb-6 text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
          </div>

          {children}

          <div className="mt-6 text-center text-sm text-muted">{footer}</div>
        </div>
      </motion.div>
    </main>
  );
}