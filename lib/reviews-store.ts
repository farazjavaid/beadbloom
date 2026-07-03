'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Review = {
  id: string;
  userId: string | null;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

const seed: Review[] = [
  {
    id: 'r_seed_1',
    userId: null,
    name: 'Aiman Tariq',
    rating: 5,
    text: 'Got the Designer Beads Necklace as a gift for my sister and she was speechless. The packaging felt so thoughtful and the beads catch the light beautifully.',
    createdAt: '2026-04-22T10:14:00.000Z',
  },
  {
    id: 'r_seed_2',
    userId: null,
    name: 'Sara K.',
    rating: 5,
    text: 'My third order. Bracelets are super comfy on the wrist and the colors stay rich after months of wear. Truly handmade quality.',
    createdAt: '2026-04-15T09:02:00.000Z',
  },
  {
    id: 'r_seed_3',
    userId: null,
    name: 'Hira Rehman',
    rating: 4,
    text: 'Phone charm is adorable, exactly like the photos. Took a few extra days to ship but the seller was responsive and kind.',
    createdAt: '2026-04-08T16:45:00.000Z',
  },
  {
    id: 'r_seed_4',
    userId: null,
    name: 'Mariam Javaid',
    rating: 5,
    text: 'The earrings are featherlight — wore them all day with no fatigue. Will definitely come back for the matching necklace.',
    createdAt: '2026-03-30T12:20:00.000Z',
  },
  {
    id: 'r_seed_5',
    userId: null,
    name: 'Zoya Imran',
    rating: 5,
    text: 'Custom order experience was lovely. They worked with my color palette and delivered something better than I imagined.',
    createdAt: '2026-03-18T14:08:00.000Z',
  },
  {
    id: 'r_seed_6',
    userId: null,
    name: 'Noor F.',
    rating: 4,
    text: 'Lovely pieces and the packaging smells like jasmine — sweet detail. Wish there were more colorways for the bracelets.',
    createdAt: '2026-03-05T11:33:00.000Z',
  },
];

type ReviewsState = {
  reviews: Review[];
  add: (review: Omit<Review, 'id' | 'createdAt'>) => void;
};

export const useReviews = create<ReviewsState>()(
  persist(
    (set) => ({
      reviews: seed,
      add: (review) =>
        set((s) => ({
          reviews: [
            {
              ...review,
              id: `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
              createdAt: new Date().toISOString(),
            },
            ...s.reviews,
          ],
        })),
    }),
    {
      name: 'beadbloom-reviews',
      version: 1,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ReviewsState>;
        const seedIds = new Set(seed.map((r) => r.id));
        const persistedReviews = p.reviews ?? [];
        const persistedSeenSeed = persistedReviews.some((r) => seedIds.has(r.id));
        const merged = persistedSeenSeed
          ? persistedReviews
          : [...persistedReviews.filter((r) => !seedIds.has(r.id)), ...seed];
        return { ...current, ...p, reviews: merged };
      },
    }
  )
);

export function reviewSummary(reviews: Review[]) {
  if (reviews.length === 0) return { count: 0, average: 0 };
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return { count: reviews.length, average: total / reviews.length };
}

export function formatRelativeDate(iso: string) {
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  const day = 86_400_000;
  if (diff < day) return 'today';
  if (diff < 2 * day) return 'yesterday';
  if (diff < 30 * day) return `${Math.floor(diff / day)} days ago`;
  if (diff < 365 * day) return `${Math.floor(diff / (30 * day))} months ago`;
  return `${Math.floor(diff / (365 * day))} years ago`;
}