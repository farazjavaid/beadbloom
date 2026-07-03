'use client';

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const dash = useTransform(progress, (v) => `${v * 113} 113`);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          onClick={onClick}
          aria-label="Scroll to top"
          className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden>
            <defs>
              <linearGradient id="stt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(var(--rose))" />
                <stop offset="50%" stopColor="rgb(var(--violet))" />
                <stop offset="100%" stopColor="rgb(var(--gold))" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="18" fill="none" stroke="rgb(var(--border))" strokeWidth="2" />
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="url(#stt-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ strokeDasharray: dash }}
            />
          </svg>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet text-white shadow-glow transition-transform duration-300 group-hover:-translate-y-0.5 group-active:translate-y-0 sm:h-10 sm:w-10">
            <ArrowUp size={18} strokeWidth={2.5} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}