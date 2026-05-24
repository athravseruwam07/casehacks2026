import React from "react";
import { useApp, parseRoute } from "./state.jsx";
import { TabIcons } from "./components.jsx";

const TABS = [
  { id: "home", label: "Home" },
  { id: "practice", label: "Practice" },
  { id: "learn", label: "Learn" },
  { id: "score", label: "Score" },
];

function tabFromRoute(route) {
  const { tab } = parseRoute(route);
  if (tab === "home") return "home";
  if (tab === "practice") return "practice";
  if (tab === "learn") return "learn";
  if (tab === "score") return "score";
  return "home";
}

export function AppShell({ children }) {
  const { route, navigate, progress, score, user, paperUnlocked, resetDemo } = useApp();
  const activeTab = tabFromRoute(route);
  const missionAvailable = !progress.completedMissions.includes(progress.currentWeek) && progress.currentWeek <= 12;

  const navTo = (tab) => {
    if (tab === "home") navigate("home");
    if (tab === "practice") navigate("practice");
    if (tab === "learn") navigate("learn");
    if (tab === "score") navigate("score");
  };

  return (
    <div className="app-shell">
      {/* Sidebar — desktop only */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-title">
            Scotia <span style={{ fontWeight: 800 }}>iTRADE</span>
            <span style={{ color: "var(--line-2)", margin: "0 4px" }}>·</span>
            <span className="brand-i">iLEARN</span>
          </div>
          <div className="sidebar-brand-tagline">Learn it. Earn it. Own it.</div>
        </div>

        <nav className="sidebar-nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`sidebar-link${activeTab === t.id ? " on" : ""}`}
              onClick={() => navTo(t.id)}
            >
              <span className="ico">{TabIcons[t.id]}</span>
              <span>{t.label}</span>
              {t.id === "practice" && missionAvailable && <span className="badge-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-week-pill">
          Current week
          <div className="big">Week {progress.currentWeek} of 12</div>
          <div style={{ marginTop: 6, fontSize: 11, color: "var(--mute)" }}>
            Score {score.total} / 300
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{user.name.charAt(0)}</div>
            <div>
              <div className="who">{user.name}, {user.age}</div>
              <div style={{ fontSize: 11, color: "var(--mute)" }}>{user.goalLabel}</div>
            </div>
          </div>
          <button className="reset" onClick={() => {
            if (confirm("Reset demo to seeded state?")) resetDemo();
          }}>Reset demo</button>
        </div>
      </aside>

      {/* Top brand bar — mobile + tablet */}
      <header className="brand-bar">
        <div className="brand-bar-title">
          Scotia <span style={{ fontWeight: 800 }}>iTRADE</span>
          <span className="pipe">·</span>
          <span className="brand-i">iLEARN</span>
        </div>
        <div className="brand-bar-tag">Week {progress.currentWeek} / 12</div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>

      {/* Bottom tab bar — mobile/tablet */}
      <nav className="tab-bar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab-bar-item${activeTab === t.id ? " on" : ""}`}
            onClick={() => navTo(t.id)}
          >
            {TabIcons[t.id]}
            <span>{t.label}</span>
            {t.id === "practice" && missionAvailable && <span className="badge-dot" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
