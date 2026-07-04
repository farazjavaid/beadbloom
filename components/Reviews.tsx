'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, PenLine, Quote, Sparkles } from 'lucide-react';
import { useCurrentUser } from '@/lib/auth-store';
import { formatRelativeDate, reviewSummary, useReviews } from '@/lib/reviews-store';
import { SectionHeading } from './SectionHeading';
import { StarPicker, StarRating } from './StarRating';

const colors = [
  'from-rose to-violet',
  'from-violet to-gold',
  'from-gold to-rose',
  'from-emerald-400 to-violet',
  'from-rose to-amber-400',
  'from-cyan-400 to-violet',
];

function avatarFromName(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
  const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return { initials: initials || '?', gradient: colors[idx] };
}

export function Reviews() {
  const reviews = useReviews((s) => s.reviews);
  const add = useReviews((s) => s.add);
  const user = useCurrentUser();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { count, average } = reviewSummary(reviews);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || text.trim().length < 8) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    add({
userId: String(user.id),
name: user.username || user.email || 'User',
rating,
text: text.trim(),
});
    setSubmitting(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setText('');
      setRating(5);
    }, 1300);
  };

  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title={
            <>
              Loved by <span className="text-gradient">people who wear stories</span>
            </>
          }
          subtitle="Real reviews from real customers. Sign in to share yours."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 rounded-3xl border border-border bg-surface/50 p-5 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <span className="font-display text-4xl font-bold text-gradient">
                {average.toFixed(1)}
              </span>
              <div>
                <StarRating value={Math.round(average)} size={18} />
                <p className="text-xs text-muted">{count} reviews</p>
              </div>
            </div>
          </div>
          {mounted && user ? (
            <button onClick={() => setOpen(true)} className="btn-primary text-sm">
              <PenLine size={16} /> Write a review
            </button>
          ) : mounted ? (
            <Link href="/login" className="btn-outline text-sm">
              <PenLine size={16} /> Sign in to review
            </Link>
          ) : (
            <span className="btn-outline text-sm opacity-0">placeholder</span>
          )}
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 9).map((r, i) => {
            const a = avatarFromName(r.name);
            return (
              <motion.article
                key={r.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
                className="card-shine group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-elevated/70 p-6 backdrop-blur-sm transition-shadow hover:shadow-glow"
              >
                <Quote className="absolute right-5 top-5 text-accent/15" size={48} aria-hidden />
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${a.gradient} text-sm font-bold text-white shadow-glow`}
                  >
                    {a.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.name}</p>
                    <p className="text-xs text-muted">{formatRelativeDate(r.createdAt)}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <StarRating value={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/90">{r.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="r-back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => !submitting && setOpen(false)}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              key="r-modal"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed left-1/2 top-1/2 z-[81] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="glass-strong rounded-3xl p-6 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet text-white shadow-glow">
                    <MessageCircle size={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold">Share your experience</h3>
                    <p className="text-xs text-muted">Posting as {user?.name}</p>
                  </div>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
                      Your rating
                    </label>
                    <StarPicker value={rating} onChange={setRating} />
                  </div>
                  <div>
                    <label htmlFor="review-text" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                      Your review
                    </label>
                    <textarea
                      id="review-text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                      rows={4}
                      maxLength={500}
                      minLength={8}
                      className="input-field resize-none"
                      placeholder="Tell others what you loved…"
                    />
                    <p className="mt-1 text-right text-[10px] text-muted">{text.length}/500</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => !submitting && setOpen(false)}
                      className="btn-outline flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || sent || text.trim().length < 8}
                      className="btn-primary flex-1 disabled:opacity-70"
                    >
                      {sent ? (
                        <>
                          <CheckCircle2 size={16} /> Posted!
                        </>
                      ) : submitting ? (
                        'Posting…'
                      ) : (
                        <>
                          <Sparkles size={16} /> Post review
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}