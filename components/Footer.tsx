'use client';

import { Gem, Instagram, Facebook, Twitter } from 'lucide-react';

const links = {
  Shop: ['Necklaces', 'Bracelets', 'Earrings', 'Phone Charms'],
  Studio: ['Our Story', 'Craftsmanship', 'Custom Orders', 'Gift Cards'],
  Help: ['Contact', 'Shipping', 'Returns', 'FAQs'],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/40 py-14">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet shadow-glow">
                <Gem size={18} className="text-white" />
              </span>
              <span className="font-display text-2xl font-bold tracking-tight">
                Bead<span className="text-gradient">Bloom</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Handcrafted bead jewelry with a story behind every piece. Made in Rahim Yar Khan, worn around the world.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/bead__bloom', label: 'Instagram' },
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink transition hover:border-accent hover:bg-accent/10 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted transition hover:text-accent">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} BeadBloom. Every bead tells a story.</p>
          <p>
            Crafted with <span className="text-rose">♥</span> in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}