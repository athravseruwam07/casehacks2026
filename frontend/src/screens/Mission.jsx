import React, { useState } from "react";
import { useApp } from "../state.jsx";
import { PageHeader, Button, Sparkline, Triangle, CoachInsight } from "../components.jsx";
import { MISSIONS, HERO_WEEKS } from "../data/missions.js";

// Shared shell for any mission
export function MissionScreen({ week }) {
  const m = MISSIONS[week - 1];
  if (!m) return null;
  if (week === 1) return <Week1Mission m={m} />;
  if (week === 2) return <Week2Mission m={m} />;
  if (week === 4) return <Week4Mission m={m} />;
  if (week === 7) return <Week7Mission m={m} />;
  if (week === 10) return <Week10Mission m={m} />;
  if (week === 12) return null; // Graduation is its own route
  return <MissionStub m={m} />;
}

function MissionHeader({ m }) {
  const { navigate } = useApp();
  return (
    <PageHeader
      title={m.title}
      sub={`Week ${m.week} of 12${m.hero ? " · Key lesson" : ""}`}
      onBack={() => navigate("learn")}
    />
  );
}

// ─── Stub mission (3, 5, 6, 8, 9, 11) ──────────────────────────────
function MissionStub({ m }) {
  const { completeMission, progress, navigate } = useApp();
  const [choice, setChoice] = useState(null);
  const [submitted, setSubmitted] = useState(progress.missionDecisions[m.week] || null);

  if (!m.decision) {
    return (
      <div className="screen-in">
        <MissionHeader m={m} />
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>{m.lesson}</p>
      </div>
    );
  }

  const onSubmit = () => {
    if (!choice) return;
    completeMission(m.week, choice, scoreDeltaFor(m.week, choice));
    setSubmitted(choice);
  };

  return (
    <div className="screen-in">
      <MissionHeader m={m} />

      <div className="card" style={{ padding: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--mute)", marginBottom: 8 }}>
          The lesson
        </div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>{m.lesson}</p>
      </div>

      <div className="section-title">{m.decision.prompt}</div>
      <div className="card" style={{ padding: 0 }}>
        {m.decision.options.map((opt, i, arr) => {
          const on = (submitted || choice) === opt.id;
          return (
            <div
              key={opt.id}
              className={!submitted ? "tap" : ""}
              onClick={!submitted ? () => setChoice(opt.id) : undefined}
              style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "16px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                background: on ? "var(--brand-tint)" : "transparent",
                cursor: submitted ? "default" : "pointer",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                border: `2px solid ${on ? "var(--brand)" : "var(--line-2)"}`,
                background: on ? "var(--brand)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 2,
              }}>
                {on && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#fff" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {opt.label}
                  {opt.recommended && (
                    <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "var(--growth-soft)", color: "var(--growth)", fontWeight: 700, letterSpacing: 0.4 }}>
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 3, lineHeight: 1.5 }}>{opt.body}</div>
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div style={{ marginTop: 16 }}>
          <Button kind="primary" onClick={onSubmit} disabled={!choice}>
            {choice ? "Lock in choice" : "Pick an option"}
          </Button>
        </div>
      )}

      {submitted && (
        <div className="screen-in" style={{ marginTop: 16 }}>
          <CoachInsight>{m.decision.consequence[submitted]}</CoachInsight>
          <div style={{ marginTop: 16, display: "flex", gap: 10, flexDirection: "column" }}>
            {m.week < 12 && MISSIONS[m.week] && (
              <Button kind="primary" onClick={() => navigate(`learn/week-${m.week + 1}`)}>
                Next: Week {m.week + 1} →
              </Button>
            )}
            <Button kind="ghost" onClick={() => navigate("learn")}>Back to timeline</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Week 1: Financial picture (recap from Onboarding) ─────────────
function Week1Mission({ m }) {
  const { navigate, completeMission, progress, user } = useApp();
  const submitted = progress.completedMissions.includes(1);
  return (
    <div className="screen-in">
      <MissionHeader m={m} />
      <div className="card" style={{ padding: 18 }}>
        <div style={{ fontSize: 11, color: "var(--mute)" }}>Pulled from your last 6 months of banking.</div>
        <h3 style={{ margin: "8px 0 12px", fontSize: 18 }}>Where your money actually goes.</h3>
        <div style={{ background: "var(--paper-2)", borderRadius: 10, padding: 14, border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", marginBottom: 12, background: "var(--line)" }}>
            <div className="bar-fill" style={{ width: "75%", background: "var(--ink)" }} />
            <div className="bar-fill" style={{ width: "25%", background: "var(--brand)" }} />
          </div>
          {[
            { c: "var(--ink)", l: "Essentials & bills", v: "2,400 CAD" },
            { c: "var(--brand)", l: "Idle in chequing", v: "800 CAD" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: row.c }} />
              <span style={{ flex: 1, fontSize: 13 }}>{row.l}</span>
              <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: 18, marginTop: 16 }}>
        <div className="num" style={{ fontSize: "clamp(36px, 10vw, 48px)", color: "var(--brand)", fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>
          $800<span style={{ fontSize: 16, color: "var(--mute)", marginLeft: 8, fontWeight: 500 }}>/mo</span>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 14 }}>{m.lesson}</p>
        <div style={{ fontSize: 13, color: "var(--mute)", marginTop: 12 }}>
          Goal: <span style={{ color: "var(--ink)", fontWeight: 600 }}>{user.goalLabel}</span> in {user.goalYears} years
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        {!submitted ? (
          <Button kind="primary" onClick={() => { completeMission(1, "acknowledged", { goalAlignment: 4 }); navigate("learn/week-2"); }}>
            Continue to Week 2 →
          </Button>
        ) : (
          <Button kind="primary" onClick={() => navigate("learn/week-2")}>Next: Week 2 →</Button>
        )}
      </div>
    </div>
  );
}

// ─── Week 2: Portfolio picker ──────────────────────────────────────
function Week2Mission({ m }) {
  const { navigate, completeMission, progress, user } = useApp();
  const submitted = progress.missionDecisions[2];
  const [choice, setChoice] = useState(submitted || null);

  const portfolios = [
    { id: "conservative", t: "Conservative", mix: "30% stocks / 70% bonds", best: "Goals under 3 years", color: "var(--growth)" },
    { id: "balanced", t: "Balanced", mix: "60% stocks / 40% bonds", best: `Goals 3–7 years (matches your ${user.goalYears}-year ${user.goalLabel.toLowerCase()})`, color: "var(--brand)", recommended: true },
    { id: "growth", t: "Growth", mix: "85% stocks / 15% bonds", best: "Goals 7+ years", color: "var(--warn)" },
  ];

  return (
    <div className="screen-in">
      <MissionHeader m={m} />
      <p style={{ fontSize: 15, lineHeight: 1.65 }}>{m.lesson}</p>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {portfolios.map((p) => {
          const on = choice === p.id;
          return (
            <div
              key={p.id}
              className={!submitted ? "tap" : ""}
              onClick={!submitted ? () => setChoice(p.id) : undefined}
              style={{
                padding: 18, borderRadius: 12,
                border: `2px solid ${on ? "var(--brand)" : "var(--line)"}`,
                background: on ? "var(--brand-tint)" : "var(--surface)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
                  {p.t}
                  {p.recommended && (
                    <span style={{ marginLeft: 10, fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "var(--growth-soft)", color: "var(--growth)", fontWeight: 700, letterSpacing: 0.4 }}>
                      RECOMMENDED FOR YOU
                    </span>
                  )}
                </h3>
              </div>
              <div className="num" style={{ fontSize: 13, color: "var(--mute)", marginBottom: 8 }}>{p.mix}</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{p.best}</div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <div style={{ marginTop: 20 }}>
          <Button kind="primary" onClick={() => choice && completeMission(2, choice, { goalAlignment: choice === "balanced" ? 6 : 2, diversification: 4 })} disabled={!choice}>
            {choice ? "Lock in portfolio" : "Pick a portfolio"}
          </Button>
        </div>
      ) : (
        <div className="screen-in" style={{ marginTop: 20 }}>
          <CoachInsight>
            {submitted === "balanced"
              ? `Strong fit. Balanced matches your ${user.goalYears}-year timeline almost exactly. Your $1,000 simulated portfolio is now invested across Canadian + US equities and government bonds.`
              : submitted === "growth"
              ? `You chose Growth for a ${user.goalYears}-year goal. That's aggressive — possible upside is higher, but so is the chance of being down when you need the money. We've noted this and you can revisit it in Week 11.`
              : `You chose Conservative — safer than your timeline strictly requires, but valid if volatility would push you to sell at the wrong moment. Comfort matters.`}
          </CoachInsight>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <Button kind="primary" onClick={() => navigate("learn/week-3")}>Next: Week 3 →</Button>
            <Button kind="ghost" onClick={() => navigate("learn")}>Back to timeline</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Week 4: Market crash ──────────────────────────────────────────
function Week4Mission({ m }) {
  const { navigate, completeMission, progress } = useApp();
  const submitted = progress.missionDecisions[4];
  const [choice, setChoice] = useState(submitted || null);
  const [revealed, setRevealed] = useState(!!submitted);
  const drop = [1150, 1142, 1125, 1098, 1062, 1041, 1013];

  const options = [
    { id: "sell", t: "Sell everything",  d: "Move to cash. Protect what's left.", tag: "Common reaction" },
    { id: "hold", t: "Do nothing",       d: "Stay the course. Wait it out.",       tag: "Boring but proven", recommended: true },
    { id: "buy",  t: "Buy more",         d: "Add to your position at lower prices.", tag: "Contrarian" },
  ];

  const onSubmit = () => {
    if (!choice) return;
    setRevealed(true);
    if (!submitted) {
      const delta = choice === "hold" ? { behaviour: 10 } : choice === "buy" ? { behaviour: 15 } : { behaviour: -20 };
      completeMission(4, choice, delta);
    }
  };

  return (
    <div className="screen-in">
      <MissionHeader m={m} />
      <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 4, background: "var(--brand)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
        Market event
      </div>

      <div className="card" style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "var(--mute)" }}>Practice portfolio (TFSA sim · 1234)</div>
        <div className="num" style={{ fontSize: "clamp(30px, 8vw, 38px)", fontWeight: 700, letterSpacing: -0.5, lineHeight: 1, marginTop: 6 }}>
          1,013.00 <span style={{ fontSize: 14, fontWeight: 500, color: "var(--mute)" }}>CAD</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <Triangle dir="down" />
            <span className="num" style={{ fontSize: 13, color: "var(--danger)", fontWeight: 600 }}>−137.00 CAD</span>
          </span>
          <span className="num" style={{ fontSize: 13, color: "var(--danger)", fontWeight: 600 }}>(−12.00%)</span>
          <span style={{ fontSize: 11, color: "var(--mute)" }}>3 days</span>
        </div>
        <div style={{ marginTop: 16 }}>
          <Sparkline data={drop} color="var(--danger)" width={400} height={80} fluid />
        </div>
      </div>

      <div className="section-title">Your decision</div>
      <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.5, marginTop: -8 }}>{m.lesson}</p>

      <div className="card" style={{ padding: 0, marginTop: 12 }}>
        {options.map((opt, i) => {
          const on = choice === opt.id;
          return (
            <div
              key={opt.id}
              className={!submitted ? "tap" : ""}
              onClick={!submitted ? () => setChoice(opt.id) : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                borderBottom: i < options.length - 1 ? "1px solid var(--line)" : "none",
                background: on ? "var(--brand-tint)" : "transparent",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                border: `2px solid ${on ? "var(--brand)" : "var(--line-2)"}`,
                background: on ? "var(--brand)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {on && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#fff" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {opt.t}
                  {opt.recommended && (
                    <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "var(--growth-soft)", color: "var(--growth)", fontWeight: 700, letterSpacing: 0.4 }}>
                      LIKELY RIGHT
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 2 }}>{opt.d}</div>
              </div>
              <span style={{
                fontSize: 9, letterSpacing: 0.6, textTransform: "uppercase", fontWeight: 700,
                padding: "3px 7px", borderRadius: 3,
                background: on ? "var(--brand)" : "var(--paper-2)",
                color: on ? "#fff" : "var(--mute)",
              }}>{opt.tag}</span>
            </div>
          );
        })}
      </div>

      {!revealed && (
        <div style={{ marginTop: 16 }}>
          <Button kind="primary" onClick={onSubmit} disabled={!choice}>
            {choice ? "See the simulation" : "Pick an option"}
          </Button>
        </div>
      )}

      {revealed && (
        <div className="screen-in" style={{ marginTop: 16 }}>
          <div className="section-title">Two weeks later</div>
          <div className="card" style={{ padding: 0 }}>
            {[
              { id: "sell", t: "If you sold", v: "1,013", c: "var(--danger)", delta: "No recovery captured", recovery: [1013, 1014, 1013, 1015, 1014, 1013] },
              { id: "hold", t: "If you held", v: "1,167", c: "var(--growth)", delta: "+154 from the low", recovery: [1013, 1042, 1071, 1098, 1132, 1167] },
              { id: "buy", t: "If you bought more", v: "1,243", c: "var(--growth)", delta: "+230 from the low", recovery: [1013, 1058, 1102, 1148, 1196, 1243] },
            ].map((r, i, arr) => (
              <div key={r.id} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                background: choice === r.id ? "var(--brand-tint)" : "transparent",
              }}>
                <Sparkline data={r.recovery} color={r.c} width={64} height={36} fill={false} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--mute)", marginBottom: 2 }}>
                    {r.t}{choice === r.id ? " · your choice" : ""}
                  </div>
                  <div className="num" style={{ fontSize: 16, fontWeight: 700 }}>{r.v} <span style={{ fontSize: 11, color: "var(--mute)" }}>CAD</span></div>
                </div>
                <span className="num" style={{ fontSize: 11, color: r.c, fontWeight: 600, textAlign: "right", whiteSpace: "nowrap" }}>{r.delta}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <CoachInsight>
              {choice === "sell" && "You sold during the drop. That's one of the most common investor mistakes — locking in losses by selling low. Notice how much further your portfolio would have come back if you'd held."}
              {choice === "hold" && "You stayed the course. That's exactly the muscle long-term investors build over years. You did it in week 4."}
              {choice === "buy" && "You bought the dip. Harder than it sounds — most people freeze. The next two market events will test this conviction differently."}
            </CoachInsight>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 10, flexDirection: "column" }}>
            <Button kind="primary" onClick={() => navigate("learn/week-5")}>Next: Week 5 →</Button>
            <Button kind="ghost" onClick={() => navigate("learn")}>Back to timeline</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Week 7: Market rally / FOMO ───────────────────────────────────
function Week7Mission({ m }) {
  const { navigate, completeMission, progress } = useApp();
  const submitted = progress.missionDecisions[7];
  const [choice, setChoice] = useState(submitted || null);

  const options = [
    { id: "shift20", t: "Shift 20% into tech", d: "Take some exposure." },
    { id: "shift50", t: "Shift 50% into tech", d: "Heavy bet on the rally continuing." },
    { id: "stay", t: "Stay diversified", d: "Don't chase. Trust the plan.", recommended: true },
    { id: "research", t: "Research before deciding", d: "Read about sector concentration risk first.", smart: true },
  ];

  const consequences = {
    shift20: "Tech ETF corrected 11% over the next month. Your portfolio fell about 2% extra from the concentration.",
    shift50: "Tech ETF corrected 11%. Your portfolio fell about 5% extra. That's the cost of chasing — even when you're 'only sort of' chasing.",
    stay: "Tech corrected 11%. Your diversified portfolio barely moved. Boring won this round.",
    research: "You opened the Learn module on sector concentration. After 2 minutes you decided to stay. Behaviour score: highest possible — research-driven decisions are the gold standard.",
  };

  return (
    <div className="screen-in">
      <MissionHeader m={m} />
      <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 4, background: "var(--brand)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
        Market event · Rally
      </div>
      <div className="card" style={{ padding: 18 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>Tech stocks are up 18% this month.</h3>
        <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.5, marginTop: 8 }}>{m.lesson}</p>
      </div>

      <div className="section-title">Your decision</div>
      <div className="card" style={{ padding: 0 }}>
        {options.map((opt, i) => {
          const on = choice === opt.id;
          return (
            <div
              key={opt.id}
              className={!submitted ? "tap" : ""}
              onClick={!submitted ? () => setChoice(opt.id) : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                borderBottom: i < options.length - 1 ? "1px solid var(--line)" : "none",
                background: on ? "var(--brand-tint)" : "transparent",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                border: `2px solid ${on ? "var(--brand)" : "var(--line-2)"}`,
                background: on ? "var(--brand)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {on && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#fff" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {opt.t}
                  {opt.smart && <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "var(--brand-soft)", color: "var(--brand-deep)", fontWeight: 700, letterSpacing: 0.4 }}>SCORES HIGHEST</span>}
                  {opt.recommended && !opt.smart && <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "var(--growth-soft)", color: "var(--growth)", fontWeight: 700, letterSpacing: 0.4 }}>STAY THE COURSE</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 2 }}>{opt.d}</div>
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <div style={{ marginTop: 16 }}>
          <Button kind="primary" onClick={() => choice && completeMission(7, choice, {
            behaviour: choice === "research" ? 15 : choice === "stay" ? 10 : choice === "shift20" ? -5 : -15,
            diversification: choice === "shift50" ? -15 : 0,
          })} disabled={!choice}>
            {choice ? "Lock in choice" : "Pick an option"}
          </Button>
        </div>
      ) : (
        <div className="screen-in" style={{ marginTop: 16 }}>
          <CoachInsight>{consequences[submitted]}</CoachInsight>
          <div style={{ marginTop: 16, display: "flex", gap: 10, flexDirection: "column" }}>
            <Button kind="primary" onClick={() => navigate("learn/week-8")}>Next: Week 8 →</Button>
            <Button kind="ghost" onClick={() => navigate("learn")}>Back to timeline</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Week 10: Sustained noise ──────────────────────────────────────
function Week10Mission({ m }) {
  const { navigate, completeMission, progress } = useApp();
  const submitted = progress.missionDecisions[10];
  const [choice, setChoice] = useState(submitted || null);
  const noise = [1100, 1133, 1088, 1110, 1095, 1112, 1098, 1115, 1102, 1118];

  const options = [
    { id: "maintain", t: "Maintain schedule, no changes", d: "Trust the plan. Resist the urge to react.", recommended: true },
    { id: "trade2", t: "Make 2 small adjustments", d: "Tweak allocation as conditions shift." },
    { id: "trade5", t: "Trade actively", d: "5+ portfolio changes over 2 weeks." },
  ];

  const consequences = {
    maintain: "Noise is not signal — and you treated it that way. +15 to Behaviour. This habit is the difference between long-term winners and losers.",
    trade2: "Two adjustments is fine if grounded — but in pure noise, every trade is a guess. Slight Behaviour penalty.",
    trade5: "Overtrading. Pure noise punished. −10 to Behaviour. This is the most common way new investors lose returns to themselves.",
  };

  return (
    <div className="screen-in">
      <MissionHeader m={m} />
      <div className="card" style={{ padding: 18 }}>
        <Sparkline data={noise} color="var(--mute)" width={500} height={100} fluid />
        <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.5, marginTop: 14 }}>{m.lesson}</p>
      </div>

      <div className="section-title">What's your behaviour over the next 2 weeks?</div>
      <div className="card" style={{ padding: 0 }}>
        {options.map((opt, i) => {
          const on = choice === opt.id;
          return (
            <div key={opt.id} className={!submitted ? "tap" : ""} onClick={!submitted ? () => setChoice(opt.id) : undefined} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
              borderBottom: i < options.length - 1 ? "1px solid var(--line)" : "none",
              background: on ? "var(--brand-tint)" : "transparent",
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, flexShrink: 0, border: `2px solid ${on ? "var(--brand)" : "var(--line-2)"}`, background: on ? "var(--brand)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {on && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#fff" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {opt.t}
                  {opt.recommended && <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "var(--growth-soft)", color: "var(--growth)", fontWeight: 700, letterSpacing: 0.4 }}>RECOMMENDED</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 2 }}>{opt.d}</div>
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <div style={{ marginTop: 16 }}>
          <Button kind="primary" onClick={() => choice && completeMission(10, choice, { behaviour: choice === "maintain" ? 15 : choice === "trade2" ? -3 : -10 })} disabled={!choice}>
            {choice ? "Lock in" : "Pick an option"}
          </Button>
        </div>
      ) : (
        <div className="screen-in" style={{ marginTop: 16 }}>
          <CoachInsight>{consequences[submitted]}</CoachInsight>
          <div style={{ marginTop: 16, display: "flex", gap: 10, flexDirection: "column" }}>
            <Button kind="primary" onClick={() => navigate("learn/week-11")}>Next: Week 11 →</Button>
            <Button kind="ghost" onClick={() => navigate("learn")}>Back to timeline</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Score deltas for stub weeks ───────────────────────────────────
function scoreDeltaFor(week, choice) {
  const map = {
    3: { c50: { consistency: 5 }, c100: { consistency: 10 }, c200: { consistency: 12 } },
    5: { rebalance: { diversification: 10 }, leave: { diversification: 0 } },
    6: { all: { goalAlignment: 8 }, half: { goalAlignment: 4 }, save: { goalAlignment: 0 }, spend: { goalAlignment: -2 } },
    8: { fhsa: { goalAlignment: 6 }, tfsa: { goalAlignment: 3 }, rrsp: { goalAlignment: -2 } },
    9: { low: { goalAlignment: 4 }, high: { goalAlignment: -4 } },
    11: { hold: { goalAlignment: 4 }, contrib: { consistency: 6, goalAlignment: 2 }, timeline: { goalAlignment: 2 } },
  };
  return (map[week] && map[week][choice]) || {};
}
