import React from "react";
import { useApp } from "../state.jsx";
import { PageHeader, Button, Ring } from "../components.jsx";
import { CATEGORIES, getLesson, ALL_LESSONS, GATE_LESSONS } from "../data/learn.js";
import { MISSIONS } from "../data/missions.js";

const ICONS = {
  spark: "★", vault: "▣", pie: "◔", wave: "≈", stack: "▤", coin: "◉",
};

// ─── Landing: 12-week program + library entry ──────────────────────
export function LearnLanding() {
  const { navigate, progress, learn } = useApp();
  const libDone = learn.completedLessons.length;
  const libTotal = ALL_LESSONS.length;

  return (
    <div className="screen-in">
      <PageHeader title="Learn" sub="12-week program · plain-language modules" />

      <div className="two-col">
        {/* Left: 12-week program */}
        <div>
          <div className="card" style={{ padding: 18, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <Ring pct={(progress.completedMissions.length / 12) * 100} size={56} stroke={5}>
              <span className="num" style={{ fontSize: 12 }}>{progress.completedMissions.length}/12</span>
            </Ring>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--mute)" }}>
                Your program
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>Week {progress.currentWeek} of 12</div>
              <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
                {progress.completedMissions.length} missions complete · learn through real decisions
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            {MISSIONS.map((m, i, arr) => {
              const done = progress.completedMissions.includes(m.week);
              const active = m.week === progress.currentWeek && !done;
              const locked = m.week > progress.currentWeek;
              return (
                <div
                  key={m.week}
                  className={!locked ? "tap" : ""}
                  onClick={() => {
                    if (locked) return;
                    if (m.week === 12) return navigate("learn/graduation");
                    navigate(`learn/week-${m.week}`);
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                    opacity: locked ? 0.5 : 1,
                    background: active ? "var(--brand-tint)" : "transparent",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: done ? "var(--ink)" : active ? "var(--brand)" : "var(--paper-2)",
                    color: done || active ? "#fff" : "var(--mute)",
                    border: !done && !active ? "1px solid var(--line)" : "none",
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {done ? (
                      <svg width="11" height="11" viewBox="0 0 11 11"><path d="M2 5.5l2.5 2.5L9 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : (
                      <span className="num">{m.week}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: active ? "var(--brand)" : "var(--mute)", textTransform: "uppercase" }}>
                      Week {m.week}
                      {m.hero && " · Key lesson"}
                      {m.week === 12 && " · Graduation"}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: active ? 700 : 500, marginTop: 3, lineHeight: 1.3 }}>
                      {m.title}
                    </div>
                    {active && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, fontSize: 11, color: "var(--brand)" }}>
                        <span className="live-dot" style={{ width: 6, height: 6, borderRadius: 3, background: "var(--brand)" }} />
                        Available now
                      </div>
                    )}
                  </div>
                  {!locked && m.week !== 12 && (
                    <span className="num" style={{ fontSize: 11, fontWeight: 600, color: active ? "var(--brand)" : "var(--mute)" }}>+{m.pointsScene}</span>
                  )}
                  {!locked ? (
                    <svg width="7" height="13" viewBox="0 0 7 13"><path d="M1 1l5 5.5L1 12" stroke={active ? "var(--brand)" : "var(--mute-2)"} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="6.5" width="8" height="5.5" rx="1" stroke="var(--mute-2)" strokeWidth="1.3" fill="none" /><path d="M5 6.5V5a2 2 0 014 0v1.5" stroke="var(--mute-2)" strokeWidth="1.3" fill="none" /></svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: reference library + how-it-works */}
        <div>
          <div className="card card-tap" onClick={() => navigate("learn/library")} style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--brand)" }}>
                Reference library
              </span>
              <Ring pct={(libDone / libTotal) * 100} size={32} stroke={3}>
                <span style={{ fontSize: 10 }}>{libDone}/{libTotal}</span>
              </Ring>
            </div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
              Investing 101 modules
            </h3>
            <p style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.5, marginTop: 6 }}>
              Plain-language lessons across {CATEGORIES.length} categories. Read anytime — tagged to the week each concept matters.
            </p>
          </div>

          <div className="card" style={{ padding: 18, marginTop: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--mute)", marginBottom: 10 }}>
              How it works
            </div>
            <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: "var(--ink-2)" }}>
              <li>One mission unlocks per week. 5–15 min.</li>
              <li>Each mission: a concept, a decision, a consequence.</li>
              <li>Three market events test you under pressure.</li>
              <li>Graduate at Week 12 with a real Scotia account opened.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Library landing: 6 categories ─────────────────────────────────
export function LearnLibrary() {
  const { navigate, learn } = useApp();

  return (
    <div className="screen-in">
      <PageHeader title="Reference library" sub="Investing 101 in plain language" onBack={() => navigate("learn")} />
      <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.5, marginTop: -8 }}>
        Bite-sized lessons covering everything a first-time investor needs. Each tagged to the program week it becomes most relevant.
      </p>

      <div className="grid-3" style={{ marginTop: 16 }}>
        {CATEGORIES.map((cat) => {
          const total = cat.lessons.length;
          const done = cat.lessons.filter((l) => learn.completedLessons.includes(`${cat.slug}/${l.slug}`)).length;
          const pct = (done / total) * 100;
          return (
            <div key={cat.slug} className="card card-tap" onClick={() => navigate(`learn/library/${cat.slug}`)} style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10, minHeight: 150 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--brand-soft)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>
                  {ICONS[cat.icon] || "•"}
                </div>
                <Ring pct={pct} size={32} stroke={3}>
                  <span style={{ fontSize: 10 }}>{done}/{total}</span>
                </Ring>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>{cat.name}</div>
                <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 3, lineHeight: 1.4 }}>{cat.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Category browser ──────────────────────────────────────────────
export function LearnCategory({ slug }) {
  const { navigate, learn } = useApp();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return <NotFound />;

  return (
    <div className="screen-in">
      <PageHeader title={cat.name} sub="Module" onBack={() => navigate("learn/library")} />
      <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.5, marginTop: -8 }}>{cat.desc}</p>

      <div className="card" style={{ padding: 0, marginTop: 16 }}>
        {cat.lessons.map((lesson, i, arr) => {
          const key = `${cat.slug}/${lesson.slug}`;
          const done = learn.completedLessons.includes(key);
          return (
            <div key={lesson.slug} className="tap" onClick={() => navigate(`learn/library/${cat.slug}/${lesson.slug}`)} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "16px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 12,
                background: done ? "var(--ink)" : "var(--surface)",
                border: done ? "none" : "1.5px solid var(--line-2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {done && <svg width="11" height="11" viewBox="0 0 11 11"><path d="M2 5.5l2.5 2.5L9 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{lesson.title}</div>
                <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
                  Week {lesson.weekTag} · {lesson.readMinutes} min
                </div>
              </div>
              <svg width="7" height="13" viewBox="0 0 7 13"><path d="M1 1l5 5.5L1 12" stroke="var(--mute-2)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Lesson detail ─────────────────────────────────────────────────
export function LearnLesson({ catSlug, lessonSlug }) {
  const { navigate, learn, markLessonComplete } = useApp();
  const lesson = getLesson(catSlug, lessonSlug);
  if (!lesson) return <NotFound />;
  const key = `${catSlug}/${lessonSlug}`;
  const done = learn.completedLessons.includes(key);

  const flatIdx = ALL_LESSONS.findIndex((l) => l.categorySlug === catSlug && l.slug === lessonSlug);
  const next = flatIdx >= 0 && flatIdx < ALL_LESSONS.length - 1 ? ALL_LESSONS[flatIdx + 1] : null;

  const body = lesson.body || `This lesson is part of the **${lesson.category.name}** module. The full body is being prepared — in the meantime, the title and tag tell you when it becomes most relevant in the program.\n\nUse this as a placeholder during the demo. Mark it complete to test the lesson-completion flow.`;
  const paragraphs = body.split("\n\n");

  return (
    <div className="screen-in" style={{ maxWidth: 720, margin: "0 auto" }}>
      <PageHeader title={lesson.title} sub={`${lesson.category.name} · ${lesson.readMinutes} min`} onBack={() => navigate(`learn/library/${catSlug}`)} />

      <article style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: "0 0 18px" }}>{p}</p>
        ))}
      </article>

      <div style={{ display: "flex", gap: 10, marginTop: 24, flexDirection: "column" }}>
        {!done ? (
          <Button kind="primary" onClick={() => markLessonComplete(key)}>
            Mark as complete
          </Button>
        ) : (
          <div style={{ padding: "12px 16px", background: "var(--growth-soft)", color: "var(--growth)", borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
            ✓ Lesson complete
          </div>
        )}
        {next && (
          <Button kind="ghost" onClick={() => navigate(`learn/library/${next.categorySlug}/${next.slug}`)}>
            Next: {next.title} →
          </Button>
        )}
      </div>
    </div>
  );
}

function NotFound() {
  const { navigate } = useApp();
  return (
    <div className="screen-in" style={{ padding: 24 }}>
      <h1>Not found</h1>
      <Button onClick={() => navigate("learn")}>Back to Learn</Button>
    </div>
  );
}
