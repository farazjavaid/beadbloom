'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

const words = ['Every', 'bead', 'tells', 'a', 'story.'];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center pt-28 sm:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
      >
        <Image
          src="/images/Hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.14] mix-blend-luminosity dark:opacity-25 dark:mix-blend-screen"
          style={{
            maskImage:
              'radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 90%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container relative z-10 mx-auto max-w-7xl px-5 sm:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <Sparkles size={14} className="text-accent" />
            <span>Handcrafted in small batches · Pakistan</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight">
            <span className="block text-ink">
              {words.slice(0, 4).map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-3 inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="block text-gradient"
            >
              story.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted"
          >
            Discover an exquisite collection of handcrafted bead jewelry. Each piece is uniquely designed to celebrate your individual style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#products" className="btn-primary group">
              Explore the collection
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a href="#about" className="btn-outline">
              Our story
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted"
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
              <span className="ml-1.5 font-medium text-ink">4.9</span>
            </div>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span><span className="font-semibold text-ink">2,400+</span> happy customers</span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span><span className="font-semibold text-ink">19</span> unique pieces</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <a
          href="#products"
          className="flex flex-col items-center gap-2 text-xs font-medium text-muted transition hover:text-ink"
        >
          <span>Scroll to explore</span>
          <span className="relative flex h-8 w-5 justify-center rounded-full border border-border">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1 h-1.5 w-1.5 rounded-full bg-accent"
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}