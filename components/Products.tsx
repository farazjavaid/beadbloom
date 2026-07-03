'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categories, type Category, type Product } from '@/lib/products';
import { getProducts } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { SectionHeading } from './SectionHeading';
import { cn } from '@/lib/utils';

type Filter = Category | 'all';

export function Products() {
  const [filter, setFilter] = useState<Filter>('all');
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setApiProducts)
      .catch((error) => console.error(error));
  }, []);

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? apiProducts
        : apiProducts.filter((p) => p.category === filter),
    [filter, apiProducts]
  );

  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Collection"
          title={
            <>
              Pieces that <span className="text-gradient">bloom</span> with you
            </>
          }
          subtitle="Hand-strung beads, considered design, and a story behind every piece."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={cn('chip', filter === c.id && 'active')}
            >
              {c.label}
              <span className="opacity-70">
                {c.id === 'all'
                  ? apiProducts.length
                  : apiProducts.filter((p) => p.category === c.id).length}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}