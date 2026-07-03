'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { getWishlist, removeFromWishlist } from '@/lib/wishlist-api';
import { useCurrentUser } from '@/lib/auth-store';
import { useCart } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const router = useRouter();
  const user = useCurrentUser();
  const add = useCart((s) => s.add);

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    getWishlist()
      .then(setItems)
      .finally(() => setLoading(false));
  }, [user, router]);

  const remove = async (productId: number) => {
    await removeFromWishlist(productId);
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
    <main className="min-h-screen px-5 py-10">
      <button onClick={() => router.push('/')} className="btn-outline mb-8">
        <ArrowLeft size={16} /> Back to shop
      </button>

      <section className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet text-white shadow-glow">
            <Heart size={22} />
          </div>
          <h1 className="font-display text-4xl font-bold">
            Your <span className="text-gradient">Wishlist</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Save your favourite BeadBloom pieces for later.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted">Loading wishlist…</p>
        ) : items.length === 0 ? (
          <div className="glass-strong mx-auto max-w-md rounded-3xl p-8 text-center">
            <Heart className="mx-auto mb-4 text-rose" size={32} />
            <h2 className="font-display text-2xl font-bold">No favourites yet</h2>
            <p className="mt-2 text-sm text-muted">
              Tap the heart on any product to save it here.
            </p>
            <button onClick={() => router.push('/#products')} className="btn-primary mt-6">
              Browse pieces
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const product = item.product;

              return (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-border bg-elevated/70 backdrop-blur-sm transition hover:shadow-glow-lg"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.main_image || product.image || '/images/cover1.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="space-y-3 p-5">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{product.name}</h3>
                      <p className="mt-1 line-clamp-1 text-sm text-muted">
                        {product.short_description || product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gradient">
                        {formatPrice(Number(product.final_price || product.price))}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            add({
                              id: product.id,
                              name: product.name,
                              description: product.short_description || product.description,
                              price: Number(product.final_price || product.price),
                              category: product.category?.slug,
                              image: product.main_image || '/images/cover1.jpg',
                              badge: product.badge || undefined,
                            })
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet text-white shadow-glow"
                          aria-label="Add to cart"
                        >
                          <ShoppingBag size={17} />
                        </button>

                        <button
                          onClick={() => remove(product.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:text-rose"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}