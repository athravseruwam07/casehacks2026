import React from "react";
import { useApp } from "../state.jsx";
import { Button, Ring, AISigil, Triangle, fmtMoney } from "../components.jsx";
import { MISSIONS } from "../data/missions.js";
import { ALL_LESSONS } from "../data/learn.js";

export function Home() {
  const { user, progress, score, paper, navigate, learn, paperUnlocked, tickers } = useApp();
  const active = MISSIONS[progress.currentWeek - 1];
  const completedPct = (progress.completedMissions.length / 12) * 100;
  const learnPct = (learn.completedLessons.length / ALL_LESSONS.length) * 100;
  const portfolioValue = paper.cash + paper.holdings.reduce((s, h) => {
    const t = tickers.find((t) => t.symbol === h.symbol);
    return s + (t ? t.price * h.shares : 0);
  }, 0);

  const nextLesson = ALL_LESSONS.find(
    (l) => !learn.completedLessons.includes(`${l.categorySlug}/${l.slug}`)
  );

  return (
    <div className="screen-in">
      <div style={{ padding: "20px 0 8px" }}>
        <div style={{ fontSize: 13, color: "var(--mute)" }}>Welcome back, {user.name}</div>
        <h1 style={{ margin: "4px 0 0", fontSize: "clamp(22px, 5.5vw, 30px)", fontWeight: 700, letterSpacing: -0.4 }}>
          {active && active.week === 12 ? "You've reached graduation." : `Week ${progress.currentWeek} of your 90 days.`}
        </h1>
      </div>

      {/* Hero mission card */}
      {active && (
        <div className="card card-tap" onClick={() => navigate(`learn/week-${active.week}`)} style={{ padding: 0, marginTop: 16, overflow: "hidden" }}>
          <div style={{ height: 4, background: active.hero ? "var(--brand)" : "var(--ink)" }} />
          <div style={{ padding: "18px 18px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: active.hero ? "var(--brand)" : "var(--mute)" }}>
              Week {active.week} · {active.hero ? "Key lesson" : "Mission"}
              <span style={{ marginLeft: 8, fontSize: 10, color: "var(--mute)" }}>
                +{active.pointsScene} Scene+ pts
              </span>
            </div>
            <h2 style={{ margin: "8px 0 6px", fontSize: "clamp(20px, 4.5vw, 24px)", fontWeight: 700, letterSpacing: -0.3 }}>
              {active.title}
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "var(--mute)", lineHeight: 1.5 }}>{active.tagline}</p>
            <div style={{ marginTop: 16 }}>
              <Button kind="primary" full={false} onClick={(e) => { e.stopPropagation(); navigate(`learn/week-${active.week}`); }}>
                Start mission · 5–15 min
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="two-col" style={{ marginTop: 16 }}>
        {/* Score mini */}
        <div className="card card-tap" onClick={() => navigate("score")}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Ring pct={(score.total / 300) * 100} size={64} stroke={5}>
              <span className="num" style={{ fontSize: 13 }}>{score.total}</span>
            </Ring>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--mute)" }}>
                Investor Score
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                <span className="num">{score.total}</span> <span style={{ fontSize: 13, color: "var(--mute)", fontWeight: 500 }}>/ 300</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 12, color: "var(--growth)" }}>
                <Triangle dir="up" />
                Top {score.percentile}% nationally
              </div>
            </div>
          </div>
        </div>

        {/* Paper portfolio mini */}
        <div className="card card-tap" onClick={() => navigate("practice")}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--mute)" }}>
            Paper portfolio
          </div>
          {paperUnlocked ? (
            <>
              <div className="num" style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                {fmtMoney(portfolioValue)}
              </div>
              <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 4 }}>
                Cash {fmtMoney(paper.cash)} · {paper.holdings.length} holding{paper.holdings.length === 1 ? "" : "s"}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>Locked</div>
              <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 4 }}>
                Complete the two gate lessons to unlock.
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="card" style={{ marginTop: 16, padding: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--mute)", marginBottom: 12 }}>
          Your progress
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <ProgressRow label="Missions" value={`${progress.completedMissions.length} / 12`} pct={completedPct} />
          <ProgressRow label="Lessons" value={`${learn.completedLessons.length} / ${ALL_LESSONS.length}`} pct={learnPct} />
        </div>
      </div>

      {/* AI coach surface */}
      <div style={{ marginTop: 16, padding: "16px 16px", background: "var(--paper-2)", borderRadius: 12, border: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <AISigil />
          <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, color: "var(--mute)" }}>
            Coach insight
          </span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.55 }}>
          You're 3 weeks in and your Behaviour score is climbing. Week 4 is the test — when the market drops, the most important thing you can do is nothing dramatic. Open Week 4 when you're ready.
        </div>
      </div>

      {/* Continue learning */}
      {nextLesson && (
        <>
          <div className="section-title">Continue learning</div>
          <div className="card card-tap" onClick={() => navigate(`learn/library/${nextLesson.categorySlug}/${nextLesson.slug}`)}>
            <div style={{ fontSize: 11, color: "var(--mute)", letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>
              {nextLesson.categoryName}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{nextLesson.title}</div>
            <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 4 }}>{nextLesson.readMinutes} min read</div>
          </div>
        </>
      )}
    </div>
  );
}

function ProgressRow({ label, value, pct }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span className="num" style={{ fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "var(--line)", overflow: "hidden" }}>
        <div className="bar-fill" style={{ width: `${pct}%`, height: "100%", background: "var(--brand)" }} />
      </div>
    </div>
  );
}
