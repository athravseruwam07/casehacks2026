import React, { useState } from "react";
import { useApp } from "../state.jsx";
import { PageHeader, Button, Triangle } from "../components.jsx";

export function Graduation() {
  const { navigate, score, user } = useApp();
  const [opened, setOpened] = useState(false);
  const tier = score.total >= 280 ? { name: "Elite", prize: 500 } : score.total >= 200 ? { name: "Advanced", prize: 200 } : score.total >= 130 ? { name: "Graduate", prize: 50 } : { name: "Completer", prize: 25 };

  if (opened) {
    return (
      <div className="screen-in" style={{ textAlign: "center", padding: "40px 16px" }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: "var(--brand)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="32" height="32" viewBox="0 0 30 30">
            <path d="M7 15l5 5L23 9" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 700, margin: 0 }}>
          You're a real investor now.
        </h1>
        <p style={{ fontSize: 14, color: "var(--mute)", marginTop: 12, lineHeight: 1.6 }}>
          Your {user.accountChoice.toUpperCase()} is open. ${tier.prize} is sitting in it. Next $150 contribution lands the 1st.
        </p>
        <div className="card" style={{ marginTop: 28, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--mute)" }}>Balance</div>
          <div className="num" style={{ fontSize: "clamp(28px, 7vw, 36px)", fontWeight: 700, marginTop: 4, letterSpacing: -0.6 }}>
            {tier.prize}.00 <span style={{ fontSize: 14, color: "var(--mute)", fontWeight: 500 }}>CAD</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 8 }}>
            Account ****8412 · Opened today
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <Button kind="primary" onClick={() => navigate("home")}>Back to my accounts</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-in">
      <PageHeader title="Graduation" sub="Week 12 of 12" onBack={() => navigate("learn")} />

      <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 4, background: "var(--brand)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
        You did it
      </div>
      <h2 style={{ fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 700, margin: 0, letterSpacing: -0.6, lineHeight: 1.1 }}>
        90 days learning.<br />Now make it real.
      </h2>

      <div className="section-title">Your 90 days</div>
      <div className="card" style={{ padding: 0 }}>
        {[
          { t: "Practice portfolio", v: "1,243.00", sub: "CAD", r: "+24.3% over 90 days", up: true },
          { t: "Final Investor Score", v: `${score.total} / 300`, sub: "", r: `Top ${score.percentile}% nationally`, up: true },
          { t: "Scene+ earned", v: "1,950", sub: "pts", r: "≈ $19.50 value", up: true },
          { t: "Prize tier", v: tier.name, sub: "", r: `$${tier.prize} to your account`, brand: true },
        ].map((r, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--mute)", textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600 }}>{r.t}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 3 }}>
                <span className="num" style={{ fontSize: 18, fontWeight: 700, color: r.brand ? "var(--brand)" : "var(--ink)" }}>{r.v}</span>
                {r.sub && <span className="num" style={{ fontSize: 11, color: "var(--mute)" }}>{r.sub}</span>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: r.brand ? "var(--brand)" : "var(--growth)", fontWeight: 500, textAlign: "right", flexShrink: 0 }}>
              {r.up && !r.brand && <Triangle dir="up" />}
              {r.r}
            </div>
          </div>
        ))}
      </div>

      <div className="section-title">Ready to open</div>
      <div className="card" style={{ overflow: "hidden", padding: 0 }}>
        <div style={{ padding: 16, borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--brand-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M2 7l7-4 7 4v8H2V7z" stroke="var(--brand)" strokeWidth="1.6" fill="none" />
                <path d="M6 11h6" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>FHSA · First Home Savings Account</div>
              <div style={{ fontSize: 11, color: "var(--mute)" }}>Chosen in Week 8 · pre-filled from your profile</div>
            </div>
          </div>
        </div>
        <div>
          {[
            { t: "Account holder", v: "Sara Kim" },
            { t: "Pre-funded prize", v: `${tier.prize}.00 CAD`, mono: true },
            { t: "Suggested monthly", v: "150.00 CAD / mo", mono: true },
            { t: "Allocation", v: "Balanced · Essentials" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", padding: "10px 16px", alignItems: "center", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
              <span style={{ flex: 1, fontSize: 12, color: "var(--mute)" }}>{r.t}</span>
              <span className={r.mono ? "num" : ""} style={{ fontSize: 13, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
        <Button kind="primary" onClick={() => setOpened(true)}>Open my FHSA</Button>
        <Button kind="ghost" onClick={() => navigate("learn")}>Review my decisions first</Button>
      </div>
      <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 14, lineHeight: 1.5 }}>
        By tapping Open, you authorize creation of a real FHSA. CDIC-protected. Funds deposited within 24 hours.
      </div>
    </div>
  );
}
