'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = 'center',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mx-auto max-w-2xl',
        align === 'center' ? 'text-center' : 'text-left mx-0',
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5 }}
          className={cn(
            'mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-base text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}