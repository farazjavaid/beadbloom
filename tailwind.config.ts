import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
        },
        rose: 'rgb(var(--rose) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
      },
      backgroundImage: {
        'mesh-light':
          'radial-gradient(at 20% 20%, rgba(244,114,182,0.35), transparent 50%), radial-gradient(at 80% 0%, rgba(167,139,250,0.30), transparent 50%), radial-gradient(at 70% 80%, rgba(251,191,36,0.25), transparent 60%)',
        'mesh-dark':
          'radial-gradient(at 20% 20%, rgba(236,72,153,0.20), transparent 50%), radial-gradient(at 80% 0%, rgba(139,92,246,0.22), transparent 50%), radial-gradient(at 70% 80%, rgba(245,158,11,0.15), transparent 60%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        shimmer: 'shimmer 1.6s infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgb(var(--accent) / 0.6)',
        'glow-lg': '0 0 80px -10px rgb(var(--accent) / 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;