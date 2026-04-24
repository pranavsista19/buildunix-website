/**
 * BuildUNIX brand logo — the construction building icon.
 * Renders as an SVG that adapts to the current theme via CSS custom properties.
 *
 * Props:
 *   size  — number or string, defaults to 32
 *   className — optional extra class name
 */
export default function BrandLogo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* ── Main tower (centre-left, tallest) ──────────── */}
      <rect x="30" y="12" width="22" height="80" rx="1" fill="currentColor" />
      {/* Window details on main tower */}
      <rect x="35" y="22" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="42" y="22" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="35" y="32" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="42" y="32" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="35" y="42" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="42" y="42" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="35" y="52" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="42" y="52" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="35" y="62" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="42" y="62" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="35" y="72" width="5" height="6" rx="0.5" fill="var(--bg)" />
      <rect x="42" y="72" width="5" height="6" rx="0.5" fill="var(--bg)" />

      {/* ── Right tower (shorter) ──────────────────────── */}
      <rect x="56" y="28" width="18" height="64" rx="1" fill="currentColor" />
      {/* Window details on right tower */}
      <rect x="60" y="36" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="66" y="36" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="60" y="45" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="66" y="45" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="60" y="54" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="66" y="54" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="60" y="63" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="66" y="63" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="60" y="72" width="4" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="66" y="72" width="4" height="5" rx="0.5" fill="var(--bg)" />

      {/* ── Left wing (smaller block) ─────────────────── */}
      <rect x="14" y="42" width="14" height="50" rx="1" fill="currentColor" />
      <rect x="17" y="48" width="3.5" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="22" y="48" width="3.5" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="17" y="57" width="3.5" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="22" y="57" width="3.5" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="17" y="66" width="3.5" height="5" rx="0.5" fill="var(--bg)" />
      <rect x="22" y="66" width="3.5" height="5" rx="0.5" fill="var(--bg)" />

      {/* ── Far-right accent slice ─────────────────────── */}
      <rect x="78" y="44" width="10" height="48" rx="1" fill="currentColor" opacity="0.7" />

      {/* ── Foundation / base platform ─────────────────── */}
      <rect x="8" y="92" width="84" height="5" rx="1.5" fill="currentColor" />
      <rect x="16" y="99" width="68" height="4" rx="1" fill="currentColor" opacity="0.5" />

      {/* ── Crane / construction accent at top ─────────── */}
      <rect x="38" y="4" width="3" height="10" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="30" y="4" width="20" height="2.5" rx="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
