'use client';

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let mx = 0.5;
    let my = 0.5;
    let cx = 0.5;
    let cy = 0.5;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };

    const tick = () => {
      cx += (mx - cx) * 0.04;
      cy += (my - cy) * 0.04;
      if (ref.current) {
        ref.current.style.setProperty('--mx', `${cx * 100}%`);
        ref.current.style.setProperty('--my', `${cy * 100}%`);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ ['--mx' as string]: '50%', ['--my' as string]: '50%' }}
    >
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(60% 50% at var(--mx) var(--my), rgb(var(--rose) / 0.18), transparent 70%), radial-gradient(50% 60% at calc(100% - var(--mx)) calc(100% - var(--my)), rgb(var(--violet) / 0.18), transparent 70%)',
        }}
      />
      <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-rose/20 blur-[120px] animate-float" />
      <div
        className="absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-violet/20 blur-[120px] animate-float"
        style={{ animationDelay: '-3.5s' }}
      />
      <div
        className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-gold/15 blur-[90px] animate-float"
        style={{ animationDelay: '-1.5s' }}
      />
    </div>
  );
}