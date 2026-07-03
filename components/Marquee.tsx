'use client';

import { Gem, Heart, Sparkles, Truck, Shield, Award } from 'lucide-react';

const items = [
  { icon: Heart, text: 'Handcrafted with love' },
  { icon: Sparkles, text: 'Premium beads & materials' },
  { icon: Truck, text: 'Free shipping over PKR 3,000' },
  { icon: Shield, text: '100% satisfaction guarantee' },
  { icon: Award, text: 'One-of-one designs' },
  { icon: Gem, text: 'Every bead tells a story' },
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-5 mask-fade-r">
      <div className="flex w-max animate-marquee gap-12 px-6">
        {loop.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex shrink-0 items-center gap-3 text-sm font-medium text-muted">
              <Icon size={16} className="text-accent" />
              <span>{item.text}</span>
              <span className="ml-12 h-1 w-1 rounded-full bg-border" />
            </div>
          );
        })}
      </div>
    </div>
  );
}