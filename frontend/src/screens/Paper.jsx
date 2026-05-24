import React from "react";
import { useApp } from "../state.jsx";
import { PageHeader, Button, Sparkline, Triangle, fmtMoney } from "../components.jsx";
import { dayChange, dayChangePct } from "../data/tickers.js";
import { GATE_LESSONS } from "../data/learn.js";

export function PaperDashboard() {
  const { navigate, paper, tickers, paperUnlocked } = useApp();

  if (!paperUnlocked) return <PaperGate />;

  const portfolioValue = paper.cash + paper.holdings.reduce((s, h) => {
    const t = tickers.find((t) => t.symbol === h.symbol);
    return s + (t ? t.price * h.shares : 0);
  }, 0);
  const startValue = 1000;
  const totalDelta = portfolioValue - startValue;
  const totalDeltaPct = (totalDelta / startValue) * 100;

  return (
    <div className="screen-in">
      <PageHeader title="Practice" sub="Paper trading · AI feedback on every decision" />

      <div className="two-col-paper">
        {/* Left: portfolio */}
        <div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, color: "var(--mute)", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
              Portfolio value
            </div>
            <div className="num" style={{ fontSize: "clamp(28px, 7vw, 36px)", fontWeight: 700, letterSpacing: -0.5, lineHeight: 1 }}>
              {fmtMoney(portfolioValue)} <span style={{ fontSize: 14, color: "var(--mute)", fontWeight: 500 }}>CAD</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
              <Triangle dir={totalDelta >= 0 ? "up" : "down"} />
              <span className="num" style={{ fontSize: 13, color: totalDelta >= 0 ? "var(--growth)" : "var(--danger)", fontWeight: 600 }}>
                {totalDelta >= 0 ? "+" : ""}{fmtMoney(totalDelta).replace("$", "$")} ({totalDeltaPct >= 0 ? "+" : ""}{totalDeltaPct.toFixed(2)}%)
              </span>
              <span style={{ fontSize: 11, color: "var(--mute)" }}>since start</span>
            </div>
            <div className="divider" style={{ margin: "16px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--mute)" }}>Cash</span>
              <span className="num" style={{ fontWeight: 600 }}>{fmtMoney(paper.cash)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
              <span style={{ color: "var(--mute)" }}>Invested</span>
              <span className="num" style={{ fontWeight: 600 }}>{fmtMoney(portfolioValue - paper.cash)}</span>
            </div>
          </div>

          {paper.holdings.length > 0 && (
            <>
              <div className="section-title">Holdings</div>
              <div className="card" style={{ padding: 0 }}>
                {paper.holdings.map((h, i, arr) => {
                  const t = tickers.find((t) => t.symbol === h.symbol);
                  if (!t) return null;
                  const value = t.price * h.shares;
                  const cost = h.avgCost * h.shares;
                  const pl = value - cost;
                  const plPct = (pl / cost) * 100;
                  return (
                    <div key={h.symbol} className="tap" onClick={() => navigate(`practice/ticker/${h.symbol}`)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="num" style={{ fontSize: 13, fontWeight: 700 }}>{h.symbol}</div>
                        <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>{h.shares} sh @ avg ${h.avgCost.toFixed(2)}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="num" style={{ fontSize: 13, fontWeight: 600 }}>{fmtMoney(value)}</div>
                        <div className="num" style={{ fontSize: 11, color: pl >= 0 ? "var(--growth)" : "var(--danger)", marginTop: 2 }}>
                          {pl >= 0 ? "+" : "−"}${Math.abs(pl).toFixed(2)} ({pl >= 0 ? "+" : ""}{plPct.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div style={{ marginTop: 12 }}>
            <Button kind="ghost" onClick={() => navigate("practice/orders")}>
              View order history ({paper.orders.length})
            </Button>
          </div>
        </div>

        {/* Right: market */}
        <div>
          <div className="section-title" style={{ marginTop: 0 }}>Market · live</div>
          <div className="card" style={{ padding: 0 }}>
            {tickers.map((t, i, arr) => {
              const chg = dayChange(t);
              const chgPct = dayChangePct(t);
              const up = chg >= 0;
              return (
                <div key={t.symbol} className="tap" onClick={() => navigate(`practice/ticker/${t.symbol}`)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="num" style={{ fontSize: 13, fontWeight: 700 }}>{t.symbol}</div>
                    <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.short}</div>
                  </div>
                  <Sparkline data={t.history.slice(-30)} color={up ? "var(--growth)" : "var(--danger)"} width={70} height={28} fill={false} />
                  <div style={{ textAlign: "right", minWidth: 70 }}>
                    <div className="num" style={{ fontSize: 13, fontWeight: 700 }}>{t.price.toFixed(2)}</div>
                    <div className="num" style={{ fontSize: 11, color: up ? "var(--growth)" : "var(--danger)", marginTop: 2 }}>
                      {up ? "+" : ""}{chgPct.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 12, padding: "12px 16px", background: "var(--paper-2)", borderRadius: 8, fontSize: 11, color: "var(--mute)", lineHeight: 1.5 }}>
            Educational simulation tool. Prices are mock real-time. No real orders placed.
          </div>
        </div>
      </div>
    </div>
  );
}

function PaperGate() {
  const { navigate, learn } = useApp();
  return (
    <div className="screen-in">
      <PageHeader title="Paper trading" sub="Locked" onBack={() => navigate("practice")} />

      <div style={{ textAlign: "center", padding: "32px 16px" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: "var(--paper-2)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="var(--ink)" strokeWidth="1.6" />
            <path d="M8 11V7.5a4 4 0 018 0V11" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
            <circle cx="12" cy="15.5" r="1.4" fill="var(--ink)" />
          </svg>
        </div>
        <h2 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 700, margin: 0 }}>Complete 2 lessons to unlock</h2>
        <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.5, marginTop: 10, maxWidth: 420, margin: "10px auto 0" }}>
          $1,000 in practice money. Real markets, real iTRADE interface. We just want you to know what you're doing before your first trade.
        </p>
      </div>

      <div className="section-title">Gate lessons</div>
      <div className="card" style={{ padding: 0 }}>
        {GATE_LESSONS.map((key) => {
          const [catSlug, lSlug] = key.split("/");
          const done = learn.completedLessons.includes(key);
          return (
            <div key={key} className="tap" onClick={() => navigate(`learn/${catSlug}/${lSlug}`)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, background: done ? "var(--ink)" : "var(--surface)", border: done ? "none" : "2px solid var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {done && <svg width="11" height="11" viewBox="0 0 11 11"><path d="M2 5.5l2.5 2.5L9 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {catSlug === "investing-basics" ? "What is investing and why it matters now" : "What is diversification"}
                </div>
                <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
                  {done ? "Complete" : "Tap to read · ~4 min"}
                </div>
              </div>
              <svg width="7" height="13" viewBox="0 0 7 13"><path d="M1 1l5 5.5L1 12" stroke="var(--brand)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
