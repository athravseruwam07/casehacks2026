import React from "react";
import { useApp } from "../state.jsx";
import { PageHeader, ScoreBar, Triangle, Ring } from "../components.jsx";

export function Score() {
  const { score, progress } = useApp();

  const bars = [
    { label: "Consistency",     weight: "30%", value: score.consistency,     max: 90, sub: "Contributions held through Week 4 volatility." },
    { label: "Diversification", weight: "25%", value: score.diversification, max: 75, sub: "One rebalance complete. No sector over-concentration." },
    { label: "Goal alignment",  weight: "25%", value: score.goalAlignment,   max: 75, sub: "Balanced portfolio matches 4-year house timeline." },
    { label: "Behaviour",       weight: "20%", value: score.behaviour,       max: 60, sub: `Held during Week 4 drop. ${progress.currentWeek < 7 ? "Week 7 rally still ahead." : "Reviewed against rallies + noise."}` },
  ];

  return (
    <div className="screen-in">
      <PageHeader title="Investor Score" sub="Behaviour, not luck" />

      <div className="two-col">
        {/* Hero score */}
        <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Ring pct={(score.total / 300) * 100} size={160} stroke={10}>
            <div style={{ textAlign: "center" }}>
              <div className="num" style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>{score.total}</div>
              <div className="num" style={{ fontSize: 12, color: "var(--mute)" }}>/ 300</div>
            </div>
          </Ring>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: 13, color: "var(--growth)" }}>
            <Triangle dir="up" />
            <span className="num" style={{ fontWeight: 600 }}>Top {score.percentile}% nationally · week {progress.currentWeek}</span>
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--mute)", textAlign: "center", maxWidth: 280 }}>
            Built across 5 dimensions. Updated after every mission decision.
          </div>
        </div>

        {/* Breakdown */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--mute)", marginBottom: 14 }}>
            Breakdown
          </div>
          {bars.map((b) => <ScoreBar key={b.label} {...b} />)}
        </div>
      </div>

      <div className="section-title">Bonuses available</div>
      <div className="card" style={{ padding: 0 }}>
        {[
          { t: "Complete all 12 weeks", pts: "+50" },
          { t: "Refer a friend (who completes)", pts: "+25" },
          { t: "Book a First Investor call", pts: "+20" },
        ].map((r, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
            <div style={{ flex: 1, fontSize: 14 }}>{r.t}</div>
            <span className="num" style={{ fontSize: 13, color: "var(--mute)", fontWeight: 600 }}>{r.pts} pts</span>
          </div>
        ))}
      </div>

      <div className="section-title">If you finish at this pace</div>
      <div style={{ background: "var(--ink)", color: "#fff", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>
          Projected prize tier
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>
            {score.total >= 280 ? "Elite" : score.total >= 200 ? "Advanced" : score.total >= 130 ? "Graduate" : "Completer"} tier
          </span>
          <span className="num" style={{ fontSize: 14, color: "var(--brand)", fontWeight: 700 }}>
            {score.total >= 280 ? "$500" : score.total >= 200 ? "$200" : score.total >= 130 ? "$50" : "$25"}
          </span>
        </div>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 10, lineHeight: 1.5 }}>
          Deposited to your real account at week 12. Every completer gets at least $25.
        </div>
      </div>
    </div>
  );
}
