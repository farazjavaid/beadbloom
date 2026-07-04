'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

function OrderSuccessContent() {
  const router = useRouter();
  const params = useSearchParams();
  const orderNumber = params.get('order');

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="glass-strong max-w-lg rounded-3xl p-8 text-center">
        <CheckCircle2 className="mx-auto text-emerald-500" size={54} />

        <h1 className="mt-5 font-display text-4xl font-bold">
          Order placed successfully!
        </h1>

        {orderNumber && (
          <p className="mt-3 text-sm text-muted">
            Your order number is <span className="font-semibold text-ink">{orderNumber}</span>
          </p>
        )}

        <p className="mt-4 text-muted">
          Thank you for shopping with BeadBloom. We’ll prepare your order soon.
        </p>

        <button onClick={() => router.push('/#products')} className="btn-primary mt-7 w-full">
          <ShoppingBag size={18} />
          Continue shopping
        </button>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}