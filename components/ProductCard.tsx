'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { useRef, useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-store';
import { useCurrentUser } from '@/lib/auth-store';
import { addToWishlist, removeFromWishlist } from '@/lib/wishlist-api';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/products';

const badgeStyles: Record<NonNullable<Product['badge']>, string> = {
  new: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
  bestseller: 'bg-gold/20 text-gold border-gold/30',
  limited: 'bg-rose/20 text-rose border-rose/30',
};

const badgeLabels: Record<NonNullable<Product['badge']>, string> = {
  new: 'New',
  bestseller: 'Bestseller',
  limited: 'Limited',
};

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const router = useRouter();
  const user = useCurrentUser();
  const ref = useRef<HTMLDivElement>(null);
  const add = useCart((s) => s.add);

  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-8, 8]), { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const toggleWishlist = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setWishlistLoading(true);

      if (wishlisted) {
        await removeFromWishlist(product.id);
        setWishlisted(false);
      } else {
        await addToWishlist(product.id);
        setWishlisted(true);
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="card-shine group relative h-full overflow-hidden rounded-3xl border border-border bg-elevated/70 backdrop-blur-sm transition-shadow hover:shadow-glow-lg"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />

          <button
            type="button"
            disabled={wishlistLoading}
            onClick={toggleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition hover:scale-110 disabled:opacity-60"
          >
            <Heart
              size={18}
              className={wishlisted ? 'fill-rose text-rose' : ''}
            />
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-br from-rose/20 via-transparent to-violet/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {product.badge && (
            <div
              className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur ${badgeStyles[product.badge]}`}
            >
              {product.badge === 'limited' && <Sparkles size={10} />}
              {badgeLabels[product.badge]}
            </div>
          )}

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-black backdrop-blur">
              Quick view
            </span>
          </div>
        </div>

        <div className="relative space-y-3 p-5" style={{ transform: 'translateZ(20px)' }}>
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">
              {product.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-muted">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gradient">{formatPrice(product.price)}</span>
            <button
              onClick={() => add(product)}
              aria-label={`Add ${product.name} to cart`}
              className="group/btn relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-rose to-violet text-white shadow-glow transition-transform hover:scale-110 active:scale-95"
            >
              <Plus
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover/btn:rotate-90"
              />
              <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover/btn:opacity-100" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}