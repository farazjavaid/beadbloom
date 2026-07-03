'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { cartTotals, useCart } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/lib/auth-store';

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const { subtotal, count } = cartTotals(items);
  const router = useRouter();
  const user = useCurrentUser();


  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col border-l border-border bg-bg/95 backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet text-white shadow-glow">
                  <ShoppingBag size={18} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">Your bag</h3>
                  <p className="text-xs text-muted">
                    {count === 0 ? 'Empty' : `${count} ${count === 1 ? 'item' : 'items'}`}
                  </p>
                </div>
              </div>
              <button
                  className="btn-primary mt-5 w-full"
                  onClick={() => {
                    if (!user) {
                      router.push('/login');
                      return;
                    }

                    router.push('/checkout');
                  }}
                >
                  Checkout
                  <ArrowRight size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose/20 to-violet/20">
                    <ShoppingBag size={32} className="text-accent" />
                  </div>
                  <p className="font-display text-xl font-semibold">Your bag is empty</p>
                  <p className="mt-2 text-sm text-muted">Add a few favorites to get started.</p>
                  <button onClick={close} className="btn-outline mt-6">
                    Browse pieces
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 rounded-2xl border border-border bg-elevated/60 p-3"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="line-clamp-1 font-semibold">{item.name}</p>
                            <p className="text-sm text-gradient font-bold">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-border">
                              <button
                                onClick={() => setQuantity(item.id, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-l-full text-muted hover:text-accent"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => setQuantity(item.id, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-r-full text-muted hover:text-accent"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => remove(item.id)}
                              aria-label="Remove from cart"
                              className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:text-rose"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-border p-5">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span className="font-medium text-ink">Calculated at checkout</span>
                  </div>
                  <div className="flex items-end justify-between border-t border-border pt-3">
                    <span className="text-sm uppercase tracking-wider text-muted">Total</span>
                    <span className="font-display text-2xl font-bold text-gradient">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
            <button
              className="btn-primary mt-5 w-full"
              onClick={() => {
                close();

                if (!user) {
                  router.push('/login');
                  return;
                }

                router.push('/checkout');
              }}
            >
              Checkout
              <ArrowRight size={16} />
            </button>
                <button
                  onClick={clear}
                  className="mt-2 w-full rounded-full py-2 text-xs font-medium text-muted transition hover:text-rose"
                >
                  Clear bag
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}