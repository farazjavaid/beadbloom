'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={cn('transition', i < value ? 'fill-gold text-gold' : 'fill-transparent text-border')}
        />
      ))}
    </div>
  );
}

export function StarPicker({
  value,
  onChange,
  size = 28,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div
      className="inline-flex items-center gap-1"
      onMouseLeave={() => setHover(null)}
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-checked={value === n}
            role="radio"
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <Star
              size={size}
              strokeWidth={1.5}
              className={cn('transition-colors', filled ? 'fill-gold text-gold' : 'fill-transparent text-border')}
            />
          </button>
        );
      })}
    </div>
  );
}