import React, { useState } from "react";
import { useApp } from "../state.jsx";
import { Button } from "../components.jsx";

const GOALS = [
  { id: "house",  t: "House down payment", s: "Med-term",   years: 4 },
  { id: "retire", t: "Retirement",         s: "Long-term",  years: 30 },
  { id: "fund",   t: "Emergency fund",     s: "Short-term", years: 2 },
  { id: "major",  t: "Major purchase",     s: "Flexible",   years: 3 },
];

export function Onboarding() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("house");
  const [years, setYears] = useState(4);
  const [contribution, setContribution] = useState(100);

  const months = years * 12;
  const r = 0.07 / 12;
  const projection = Math.round(contribution * ((Math.pow(1 + r, months) - 1) / r));
  const goalObj = GOALS.find((g) => g.id === goal);

  if (step === 1) {
    return (
      <div className="screen-in" style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px 80px" }}>
        <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 4, background: "var(--brand-soft)", color: "var(--brand-deep)", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 18 }}>
          New · Invited
        </div>
        <h1 style={{ fontSize: "clamp(28px, 7vw, 38px)", margin: 0, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.1 }}>
          Learn how to invest.<br />
          Earn while you do.
        </h1>
        <p style={{ fontSize: 15, color: "var(--mute)", lineHeight: 1.5, marginTop: 16 }}>
          A 12-week program built into Scotia iTRADE. Practice with $1,000 fake money. Finish, and we open a real account with $25–$500 inside.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, margin: "24px 0", padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          {[
            { v: "12", l: "Weeks" },
            { v: "$1,000", l: "Practice" },
            { v: "$25+", l: "Min reward" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="num" style={{ fontSize: 20, fontWeight: 700 }}>{s.v}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, color: "var(--mute)", marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>

        <Button kind="primary" onClick={() => setStep(2)}>Start Week 1 · 5 min</Button>
        <div style={{ marginTop: 20, fontSize: 12, color: "var(--mute)", lineHeight: 1.5 }}>
          Educational simulation. No real orders placed during the program. Real account opens at completion.
        </div>
      </div>
    );
  }

  // Step 2 — financial picture
  return (
    <div className="screen-in" style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 80px" }}>
      <div style={{ fontSize: 11, color: "var(--mute)", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
        Week 1 of 12 · Your picture
      </div>
      <h1 style={{ fontSize: "clamp(22px, 5.5vw, 28px)", margin: "8px 0 6px", fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.2 }}>
        Here's where your money actually goes.
      </h1>
      <p style={{ fontSize: 13, color: "var(--mute)", marginBottom: 20 }}>
        Pulled from your last 6 months of banking.
      </p>

      <div style={{ background: "var(--paper-2)", borderRadius: 10, padding: 16, border: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 11, color: "var(--mute)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>
          <span>Average month</span>
          <span className="num" style={{ fontSize: 13, color: "var(--ink)" }}>+3,200.00 CAD</span>
        </div>
        <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", marginBottom: 12, background: "var(--line)" }}>
          <div className="bar-fill" style={{ width: "75%", background: "var(--ink)" }} />
          <div className="bar-fill" style={{ width: "25%", background: "var(--brand)" }} />
        </div>
        {[
          { c: "var(--ink)", l: "Essentials & bills", v: "2,400 CAD" },
          { c: "var(--brand)", l: "Idle in chequing", v: "800 CAD" },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: row.c }} />
            <span style={{ flex: 1, fontSize: 13 }}>{row.l}</span>
            <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>{row.v}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="num" style={{ fontSize: "clamp(40px, 11vw, 56px)", fontWeight: 700, color: "var(--brand)", lineHeight: 1, letterSpacing: -1.2 }}>
          $800<span style={{ fontSize: 18, color: "var(--mute)", fontWeight: 500, marginLeft: 8 }}>/mo</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>
          That's what sits in your chequing at month-end, on average — earning almost nothing. Let's put some of it to work.
        </div>
      </div>

      <div style={{ marginTop: 24, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--mute)" }}>
        What are you saving for?
      </div>
      <div className="grid-2" style={{ marginTop: 10 }}>
        {GOALS.map((g) => {
          const on = goal === g.id;
          return (
            <div key={g.id} className="tap" onClick={() => { setGoal(g.id); setYears(g.years); }} style={{
              padding: 14, borderRadius: 10,
              background: on ? "var(--ink)" : "var(--surface)",
              color: on ? "#fff" : "var(--ink)",
              border: on ? "1px solid var(--ink)" : "1px solid var(--line)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{g.t}</div>
              <div style={{ fontSize: 11, opacity: on ? 0.7 : 0.55, marginTop: 4 }}>{g.s}</div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: 16, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--mute)" }}>Monthly contribution</span>
          <span className="num" style={{ fontSize: 17, fontWeight: 700 }}>${contribution}</span>
        </div>
        <input type="range" min="25" max="400" step="25" value={contribution} onChange={(e) => setContribution(+e.target.value)} />
        <div style={{ height: 1, background: "var(--line)", margin: "14px 0 12px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--mute)" }}>Years to goal</span>
          <span className="num" style={{ fontSize: 17, fontWeight: 700 }}>{years} yrs</span>
        </div>
        <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(+e.target.value)} />
      </div>

      <div style={{ background: "var(--paper-2)", borderRadius: 10, padding: 16, border: "1px solid var(--line)", marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--growth)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
            Projected in {years} years
          </div>
          <div style={{ fontSize: 11, color: "var(--mute)" }}>Assumes 7% avg annual return.</div>
        </div>
        <div className="num" style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
          ${projection.toLocaleString()}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Button kind="primary" onClick={() => completeOnboarding({
          goal: goalObj.id,
          goalLabel: goalObj.t,
          goalYears: years,
          contribution,
        })}>
          Continue
        </Button>
      </div>
    </div>
  );
}
