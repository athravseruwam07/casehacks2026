import React from "react";
import { useApp } from "../state.jsx";
import { PageHeader, fmtMoney, Button } from "../components.jsx";

export function PaperOrders() {
  const { navigate, paper } = useApp();

  return (
    <div className="screen-in">
      <PageHeader title="Order history" sub="Simulated · educational" onBack={() => navigate("practice")} />

      {paper.orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 16px" }}>
          <div style={{ fontSize: 14, color: "var(--mute)" }}>No orders yet.</div>
          <div style={{ marginTop: 16 }}>
            <Button kind="primary" full={false} onClick={() => navigate("practice")}>Browse market</Button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          {paper.orders.map((o, i, arr) => {
            const d = new Date(o.ts);
            const dateStr = d.toLocaleDateString("en-CA", { month: "short", day: "numeric" }) + " " + d.toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" });
            return (
              <div key={o.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 4,
                  background: o.side === "buy" ? "var(--growth)" : "var(--danger)",
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span className="num" style={{ fontSize: 13, fontWeight: 700 }}>{o.symbol}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: o.side === "buy" ? "var(--growth)" : "var(--danger)" }}>
                      {o.side}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
                    {o.shares} sh @ ${o.price.toFixed(2)} · {dateStr}
                  </div>
                </div>
                <div className="num" style={{ fontSize: 13, fontWeight: 700, textAlign: "right" }}>
                  {o.side === "buy" ? "−" : "+"}{fmtMoney(o.total)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
