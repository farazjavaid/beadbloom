'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export type PublicUser = {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

type AuthState = {
  access: string | null;
  refresh: string | null;
  user: PublicUser | null;
  signup: (data: { name: string; email: string; password: string }) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (data: { email: string; password: string }) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      access: null,
      refresh: null,
      user: null,

      signup: async ({ email, password }) => {
        try {
          const username = email.trim().toLowerCase();

          const res = await fetch(`${API_BASE_URL}/api/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username,
              email: username,
              password,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            return {
              ok: false,
              error:
                data.username?.[0] ||
                data.email?.[0] ||
                data.password?.[0] ||
                'Signup failed',
            };
          }

          const loginRes = await fetch(`${API_BASE_URL}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
          });

          if (!loginRes.ok) {
            return { ok: false, error: 'Account created, but login failed' };
          }

          const loginData = await loginRes.json();

          set({
            access: loginData.access,
            refresh: loginData.refresh,
            user: loginData.user,
          });

          return { ok: true };
        } catch {
          return { ok: false, error: 'Could not connect to server' };
        }
      },

      login: async ({ email, password }) => {
        try {
          const username = email.trim().toLowerCase();

          const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
          });

          if (!res.ok) {
            return { ok: false, error: 'Invalid email or password' };
          }

          const data = await res.json();

          set({
            access: data.access,
            refresh: data.refresh,
            user: data.user,
          });

          return { ok: true };
        } catch {
          return { ok: false, error: 'Could not connect to server' };
        }
      },

      logout: () =>
        set({
          access: null,
          refresh: null,
          user: null,
        }),
    }),
    { name: 'beadbloom-auth' }
  )
);

export function useCurrentUser(): PublicUser | null {
  return useAuth((s: AuthState) => s.user);
}

export function getAccessToken() {
  return useAuth.getState().access;
}