'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cartTotals, useCart } from '@/lib/cart-store';
import { getAccessToken, useCurrentUser } from '@/lib/auth-store';
import { API_BASE_URL } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const user = useCurrentUser();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const { subtotal } = cartTotals(items);

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    country: 'Finland',
    city: '',
    postal_code: '',
    street_address: '',
    apartment: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [placing, setPlacing] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  const shipping = 5;
  const total = subtotal + shipping;

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setPlacing(true);

    try {
      const token = getAccessToken();

      const addressRes = await fetch(`${API_BASE_URL}/api/orders/addresses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!addressRes.ok) {
  const data = await addressRes.json();
  throw new Error(data.error || 'Could not save address');
}

      const address = await addressRes.json();

      for (const item of items) {
        await fetch(`${API_BASE_URL}/api/cart/add/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: item.id,
            quantity: item.quantity,
          }),
        });
      }

      const orderRes = await fetch(`${API_BASE_URL}/api/orders/place/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipping_address_id: address.id,
        }),
      });

      if (!orderRes.ok) {
  const data = await orderRes.json();
  throw new Error(data.error || 'Could not place order');
}

      const order = await orderRes.json();

      clear();
      router.push(`/order-success?order=${order.order_number}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while placing your order.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="min-h-screen px-5 py-10">
      <button onClick={() => router.push('/')} className="btn-outline mb-8">
        <ArrowLeft size={16} /> Back to shop
      </button>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={placeOrder} className="glass-strong rounded-3xl p-6">
          <h1 className="font-display text-3xl font-bold">Checkout</h1>
          <p className="mt-2 text-sm text-muted">Enter your shipping details.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ['full_name', 'Full name'],
              ['phone', 'Phone'],
              ['country', 'Country'],
              ['city', 'City'],
              ['postal_code', 'Postal code'],
              ['street_address', 'Street address'],
              ['apartment', 'Apartment'],
            ].map(([key, label]) => (
              <div key={key} className={key === 'street_address' ? 'sm:col-span-2' : ''}>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                  {label}
                </label>
                <input
                  required={key !== 'apartment'}
                  className="input-field"
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-rose">{error}</p>}
          {success && (
            <p className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
              <CheckCircle2 size={16} /> {success}
            </p>
          )}

          <button
            disabled={placing || success || items.length === 0}
            className="btn-primary mt-6 w-full"
          >
            {placing ? 'Placing order…' : 'Place order'}
          </button>
        </form>

        <aside className="glass-strong rounded-3xl p-6">
          <h2 className="font-display text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="line-clamp-1 font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between pt-2 text-lg font-bold">
              <span>Total</span>
              <span className="text-gradient">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}