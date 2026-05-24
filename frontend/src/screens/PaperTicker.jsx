import React, { useState } from "react";
import { useApp } from "../state.jsx";
import { PageHeader, Button, Sparkline, Triangle, fmtMoney, CoachInsight } from "../components.jsx";
import { dayChange, dayChangePct } from "../data/tickers.js";
import { paperFeedback } from "../data/paperFeedback.js";

export function PaperTicker({ symbol }) {
  const { navigate, tickers, paper, placeOrder, user } = useApp();

  const t = tickers.find((x) => x.symbol === symbol);
  if (!t) return (
    <div className="screen-in" style={{ padding: 16 }}>
      <PageHeader title="Ticker not found" onBack={() => navigate("practice")} />
      <Button onClick={() => navigate("practice")}>Back</Button>
    </div>
  );

  const [side, setSide] = useState("buy");
  const [shares, setShares] = useState(1);
  const [pending, setPending] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);

  const holding = paper.holdings.find((h) => h.symbol === symbol);
  const chg = dayChange(t);
  const chgPct = dayChangePct(t);
  const up = chg >= 0;
  const estTotal = shares * t.price;
  const canBuy = side === "buy"
    ? estTotal <= paper.cash && shares > 0
    : holding && holding.shares >= shares && shares > 0;

  const submit = () => {
    if (!canBuy) return;
    setPending(true);

    // snapshot pre-trade for feedback
    const prevHoldings = paper.holdings.map((h) => ({ ...h }));
    const prevCash = paper.cash;
    const order = { id: Date.now(), symbol, side, shares: +shares, price: +t.price.toFixed(2), total: +estTotal.toFixed(2) };

    setTimeout(() => {
      placeOrder({ symbol, side, shares: +shares, price: t.price });
      const fb = paperFeedback({ order, prevHoldings, prevCash, tickers, user });
      setLastFeedback(fb);
      setPending(false);
      setShares(1);
    }, 300);
  };

  return (
    <div className="screen-in">
      <PageHeader title={t.symbol} sub={t.sector} onBack={() => navigate("practice")} />

      <div className="two-col-paper">
        {/* Left: ticker info */}
        <div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, color: "var(--mute)" }}>{t.name}</div>
            <div className="num" style={{ fontSize: "clamp(26px, 7vw, 34px)", fontWeight: 700, marginTop: 6, letterSpacing: -0.5 }}>
              ${t.price.toFixed(2)} <span style={{ fontSize: 14, color: "var(--mute)", fontWeight: 500 }}>CAD</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <Triangle dir={up ? "up" : "down"} />
              <span className="num" style={{ fontSize: 13, color: up ? "var(--growth)" : "var(--danger)", fontWeight: 600 }}>
                {up ? "+" : ""}${Math.abs(chg).toFixed(2)} ({up ? "+" : ""}{chgPct.toFixed(2)}%) today
              </span>
            </div>
            <div style={{ marginTop: 16 }}>
              <Sparkline data={t.history} color={up ? "var(--growth)" : "var(--danger)"} width={500} height={120} fluid />
            </div>
          </div>

          {holding && (
            <div className="card" style={{ marginTop: 16, padding: 18 }}>
              <div style={{ fontSize: 11, color: "var(--mute)", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
                Your position
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--mute)" }}>Shares</span>
                <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>{holding.shares}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--mute)" }}>Avg cost</span>
                <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>${holding.avgCost.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--mute)" }}>Market value</span>
                <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>{fmtMoney(t.price * holding.shares)}</span>
              </div>
            </div>
          )}

          {lastFeedback && (
            <div style={{ marginTop: 16 }}>
              <CoachInsight>{lastFeedback}</CoachInsight>
            </div>
          )}
        </div>

        {/* Right: order ticket */}
        <div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, color: "var(--mute)", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
              Order ticket
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 16, borderRadius: 8, overflow: "hidden", border: "1px solid var(--line)" }}>
              {["buy", "sell"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  style={{
                    padding: "10px",
                    background: side === s ? (s === "buy" ? "var(--growth)" : "var(--danger)") : "var(--surface)",
                    color: side === s ? "#fff" : "var(--ink)",
                    border: "none",
                    fontWeight: 700, fontSize: 14,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    fontFamily: "inherit",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <label style={{ display: "block", fontSize: 12, color: "var(--mute)", marginBottom: 6, fontWeight: 600 }}>
              Shares
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={shares}
              onChange={(e) => setShares(Math.max(0, Math.floor(+e.target.value || 0)))}
            />

            <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--paper-2)", borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "var(--mute)" }}>Price</span>
                <span className="num" style={{ fontWeight: 600 }}>${t.price.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 6 }}>
                <span style={{ color: "var(--mute)" }}>Shares</span>
                <span className="num" style={{ fontWeight: 600 }}>{shares}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--line)" }}>
                <span style={{ fontWeight: 600 }}>{side === "buy" ? "Est. cost" : "Est. proceeds"}</span>
                <span className="num" style={{ fontWeight: 700 }}>{fmtMoney(estTotal)}</span>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <Button kind={side === "buy" ? "primary" : "danger"} onClick={submit} disabled={!canBuy || pending}>
                {pending ? "Placing..." : !canBuy ? (side === "buy" ? "Insufficient cash" : "Not enough shares") : `Place ${side} order`}
              </Button>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "var(--mute)", textAlign: "center" }}>
              Cash available: <span className="num">{fmtMoney(paper.cash)}</span>
            </div>
          </div>

          <div style={{ marginTop: 12, padding: "12px 14px", background: "var(--paper-2)", borderRadius: 8, fontSize: 11, color: "var(--mute)", lineHeight: 1.5 }}>
            Educational simulation — no real orders placed. AI analyzes each trade so you learn from decisions, not just outcomes.
          </div>
        </div>
      </div>
    </div>
  );
}
