'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth-store';

type Mode = 'login' | 'signup';

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const signup = useAuth((s) => s.signup);
  const login = useAuth((s) => s.login);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = mode === 'signup'
  ? await signup({ name, email, password })
  : await login({ email, password });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push('/'), 700);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
            Full name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
            placeholder="Hadisa Irfan"
            autoComplete="name"
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
          placeholder="you@example.com"
          autoComplete={mode === 'signup' ? 'email' : 'username'}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="input-field pr-12"
            placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-accent"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2 rounded-xl border border-rose/40 bg-rose/10 px-3 py-2 text-sm text-rose"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <button type="submit" disabled={submitting || success} className="btn-primary w-full disabled:opacity-70">
        {success ? (
          <>
            <CheckCircle2 size={18} /> {mode === 'signup' ? 'Account created!' : 'Signed in!'}
          </>
        ) : submitting ? (
          'Please wait…'
        ) : (
          <>
            {mode === 'signup' ? 'Create account' : 'Sign in'}
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}