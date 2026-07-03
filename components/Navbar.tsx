'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Gem, Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { useCart, cartTotals } from '@/lib/cart-store';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/lib/auth-store';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#products', label: 'Shop' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#about', label: 'Story' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollY } = useScroll();
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const { count } = cartTotals(items);
  const router = useRouter();
  const user = useCurrentUser();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-all sm:top-5 sm:px-6',
        scrolled ? 'glass-strong shadow-glow' : 'glass'
      )}
    >
      <a href="#home" className="group flex items-center gap-2.5">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet shadow-glow">
          <Gem size={18} className="text-white" />
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition group-hover:opacity-100" />
        </span>
        <span className="font-display text-xl font-bold tracking-tight">
          Bead<span className="text-gradient">Bloom</span>
        </span>
      </a>

      <nav className="hidden items-center gap-1 md:flex">
        {links.map((link) => {
          const id = link.href.slice(1);
          const isActive = active === id;
          return (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-ink"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-accent/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={cn('relative', isActive && 'text-ink')}>{link.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <UserMenu />
        <button
  onClick={() => router.push(user ? '/wishlist' : '/login')}
  aria-label="Wishlist"
  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink transition-all hover:border-accent hover:text-accent"
>
  <Heart size={18} />
</button>
        <button
          onClick={openCart}
          aria-label="Open cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink transition-all hover:border-accent hover:text-accent"
        >
          <ShoppingBag size={18} />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet px-1 text-[10px] font-bold text-white shadow-glow"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass-strong absolute left-0 right-0 top-full mt-2 rounded-3xl p-3 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-accent/10 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}