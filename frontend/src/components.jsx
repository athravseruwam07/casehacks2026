import React from "react";

// ─── Branding wordmarks ─────────────────────────────────────────────
export function ITradeWordmark() {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", lineHeight: 1 }}>
      <span style={{ fontWeight: 700, fontSize: "inherit" }}>Scotia</span>
      <span style={{ fontWeight: 700, fontSize: "inherit", marginLeft: 5 }}>
        i<span style={{ fontWeight: 800 }}>TRADE</span>
      </span>
    </span>
  );
}

export function ILearnWordmark() {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", lineHeight: 1 }}>
      <span style={{ fontWeight: 700 }}>i</span>
      <span style={{ fontWeight: 800 }}>LEARN</span>
    </span>
  );
}

// ─── Buttons ────────────────────────────────────────────────────────
export function Button({ children, onClick, kind = "primary", full = true, sub, disabled, size = "md", type = "button" }) {
  const styles = {
    primary: { background: "var(--cta)", color: "#fff", border: "1px solid var(--cta)" },
    brand: { background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)" },
    ghost: { background: "transparent", color: "var(--ink)", border: "1px solid var(--line-2)" },
    danger: { background: "var(--danger)", color: "#fff", border: "1px solid var(--danger)" },
    light: { background: "#fff", color: "var(--ink)", border: "1px solid var(--line-2)" },
  };
  const pad = size === "sm" ? "8px 14px" : sub ? "10px 18px" : "12px 18px";
  return (
    <button
      type={type}
      className="tap"
      onClick={disabled ? undefined : onClick}
      style={{
        width: full ? "100%" : "auto",
        padding: pad,
        borderRadius: 8,
        fontSize: size === "sm" ? 13 : 15,
        fontWeight: 600,
        letterSpacing: 0.1,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...styles[kind],
      }}
    >
      <span>{children}</span>
      {sub && <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.75 }}>{sub}</span>}
    </button>
  );
}

// ─── Money + indicators ─────────────────────────────────────────────
export function fmtMoney(n, opts = {}) {
  const { sign = false, decimals = 2 } = opts;
  if (n == null || isNaN(n)) return "—";
  const abs = Math.abs(n);
  const s = abs.toLocaleString("en-CA", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = n < 0 ? "−$" : sign ? "+$" : "$";
  return prefix + s;
}

export function Triangle({ dir = "up", size = 8 }) {
  const color = dir === "up" ? "var(--growth-tri)" : "var(--danger)";
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" style={{ display: "inline-block", verticalAlign: "middle" }}>
      {dir === "up" ? <path d="M4 1l3 5H1l3-5z" fill={color} /> : <path d="M4 7L1 2h6L4 7z" fill={color} />}
    </svg>
  );
}

// ─── Sparkline ──────────────────────────────────────────────────────
export function Sparkline({ data, color = "var(--growth)", width = 120, height = 36, fill = true, fluid = false }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const fillPath = `${path} L${width},${height} L0,${height} Z`;
  const gid = `spark-${Math.abs(color.split("").reduce((a, c) => a + c.charCodeAt(0), 0))}-${Math.floor(width)}-${Math.floor(height)}`;
  const svg = (
    <svg
      width={fluid ? "100%" : width}
      height={fluid ? undefined : height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={fluid ? "none" : "xMidYMid meet"}
      style={{ display: "block" }}
    >
      {fill && (
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {fill && <path d={fillPath} fill={`url(#${gid})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (fluid) return <div className="sparkline-fluid" style={{ height }}>{svg}</div>;
  return svg;
}

// ─── Ring ───────────────────────────────────────────────────────────
export function Ring({ pct, size = 36, stroke = 3, color = "var(--brand)", bg = "var(--line)", children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size > 60 ? 14 : 11, fontWeight: 600, color: "var(--ink)",
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── ScoreBar ──────────────────────────────────────────────────────
export function ScoreBar({ label, value, max = 100, color = "var(--brand)", weight, sub }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
          {weight && <span style={{ fontSize: 11, color: "var(--mute)", marginLeft: 6 }}>{weight}</span>}
        </div>
        <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>
          {value}<span style={{ color: "var(--mute-2)" }}> / {max}</span>
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "var(--line)", overflow: "hidden" }}>
        <div className="bar-fill" style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      {sub && <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// ─── AI sigil ───────────────────────────────────────────────────────
export function AISigil({ size = 16, color = "var(--brand)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <path d="M8 1.5l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4L2.5 7l4-1.5L8 1.5z" fill={color} />
      <circle cx="12.5" cy="3.5" r="1.2" fill={color} />
    </svg>
  );
}

// ─── Page header with back ─────────────────────────────────────────
export function PageHeader({ title, sub, onBack, right }) {
  return (
    <div className="page-header">
      {onBack && (
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <svg width="9" height="16" viewBox="0 0 9 16">
            <path d="M8 1L1 8l7 7" stroke="var(--ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {sub && <div className="sub">{sub}</div>}
        <h1>{title}</h1>
      </div>
      {right}
    </div>
  );
}

// ─── Tab icons ──────────────────────────────────────────────────────
export const TabIcons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 10L11 3l8 7v9H3v-9z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M9 19v-6h4v6" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  ),
  practice: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="11" cy="11" r="1.5" fill="currentColor" />
    </svg>
  ),
  learn: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 5h6a2 2 0 012 2v10a2 2 0 00-2-2H3V5z" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M19 5h-6a2 2 0 00-2 2v10a2 2 0 012-2h6V5z" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  ),
  score: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 18v-6M10 18V8M16 18v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

// ─── Coach insight card ─────────────────────────────────────────────
export function CoachInsight({ children }) {
  return (
    <div style={{
      padding: "14px 16px", borderRadius: 10,
      background: "var(--paper-2)", border: "1px solid var(--line)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <AISigil />
        <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, color: "var(--mute)" }}>
          Coach insight
        </span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink)" }}>
        {children}
      </div>
    </div>
  );
}
