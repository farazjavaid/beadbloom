'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, ShieldCheck, Leaf } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const stats = [
  { value: 2400, suffix: '+', label: 'Happy customers' },
  { value: 19, suffix: '', label: 'Unique designs' },
  { value: 100, suffix: '%', label: 'Handcrafted' },
  { value: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
];

const values = [
  { icon: Heart, title: 'Made with love', body: 'Every knot, every bead, threaded by hand.' },
  { icon: Sparkles, title: 'One of a kind', body: 'No two pieces are exactly alike.' },
  { icon: ShieldCheck, title: 'Premium materials', body: 'Quality beads that last beyond seasons.' },
  { icon: Leaf, title: 'Slow craft', body: 'We take our time so you wear it for years.' },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-glow-lg">
              <Image
                src="/images/Image_bern.png"
                alt="BeadBloom craftsmanship"
                fill
                sizes="(max-width: 1024px) 90vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-strong absolute -bottom-6 right-3 rounded-2xl p-4 sm:-right-10"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Crafted in</p>
              <p className="font-display text-xl font-bold">Pakistan</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="glass-strong absolute left-3 top-8 rounded-2xl p-4 sm:-left-10"
            >
              <div className="flex items-center gap-2">
                <Heart size={16} className="fill-rose text-rose" />
                <p className="text-sm font-semibold">Made by hand</p>
              </div>
            </motion.div>
          </motion.div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title={
                <>
                  Jewelry as <span className="text-gradient">self-expression</span>
                </>
              }
              subtitle="At BeadBloom, jewelry is more than an accessory — it's the smallest thing you can wear that says the most about you. Each bead is selected and threaded by hand to create pieces that are beautiful and meaningful."
            />

            <div className="mt-8 grid grid-cols-2 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="glass rounded-2xl p-4"
                  >
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose to-violet text-white shadow-glow">
                      <Icon size={16} />
                    </div>
                    <p className="font-semibold text-ink">{v.title}</p>
                    <p className="mt-1 text-sm text-muted">{v.body}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
        {n.toFixed(decimals)}
        {suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}