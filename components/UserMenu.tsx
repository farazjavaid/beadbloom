'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogIn, LogOut, MessageCircle, User } from 'lucide-react';
import { useAuth, useCurrentUser } from '@/lib/auth-store';

const colors = [
  'from-rose to-violet',
  'from-violet to-gold',
  'from-gold to-rose',
  'from-emerald-400 to-violet',
];

function pickGradient(name?: string) {
  const safeName = name || 'User';
  const idx = safeName.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}

export function UserMenu() {
  const user = useCurrentUser();
  const logout = useAuth((s: any) => s.logout);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  if (!mounted) {
    return <span className="h-10 w-10" aria-hidden />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        aria-label="Sign in"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink transition hover:border-accent hover:text-accent"
      >
        <LogIn size={18} />
      </Link>
    );
  }

const displayName =
  user.first_name || user.username || user.email || 'User';

const initials = displayName
  .trim()
  .split(/\s+/)
  .slice(0, 2)
  .map((p) => p[0]?.toUpperCase() ?? '')
  .join('');

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${pickGradient(displayName)} text-sm font-bold text-white shadow-glow transition-transform hover:scale-105`}
      >
        {initials || <User size={16} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="glass-strong absolute right-0 top-full mt-2 w-60 origin-top-right overflow-hidden rounded-2xl p-2 shadow-glow"
          >
            <div className="px-3 py-2.5">
              <p className="truncate font-semibold">{displayName}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="my-1 h-px bg-border" />
            <a
              href="#reviews"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink transition hover:bg-accent/10"
            >
              <MessageCircle size={15} className="text-muted" />
              Write a review
            </a>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink transition hover:bg-rose/10 hover:text-rose"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}