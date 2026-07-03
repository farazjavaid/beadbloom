const beads = Array.from({ length: 8 }, (_, i) => ({
  rot: (i * 360) / 8,
  delay: -(i * 0.18),
}));

export function InitialLoader() {
  return (
    <div id="initial-loader" aria-label="Loading BeadBloom" role="status">
      <div className="loader-bead-ring">
        {beads.map((b, i) => (
          <span
            key={i}
            className="loader-bead"
            style={{
              ['--rot' as string]: `${b.rot}deg`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
        <span className="loader-core">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 3h12l4 6-10 13L2 9z" />
            <path d="M11 3 8 9l4 13 4-13-3-6" />
            <path d="M2 9h20" />
          </svg>
        </span>
      </div>

      <div>
        <h1 className="loader-brand">
          Bead<span className="accent">Bloom</span>
        </h1>
        <p className="loader-tagline">Every bead tells a story</p>
      </div>

      <div className="loader-bar" />
    </div>
  );
}