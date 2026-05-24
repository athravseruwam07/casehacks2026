// Generates plain-language coach feedback after a paper trade.
// Heuristic-based, simulating an AI analyst. 2–4 sentences.

export function paperFeedback({ order, prevHoldings, prevCash, tickers, user }) {
  const { symbol, side, shares, price, total } = order;
  const ticker = tickers.find((t) => t.symbol === symbol);
  if (!ticker) return "Trade placed.";

  const prevHolding = prevHoldings.find((h) => h.symbol === symbol);
  const portfolioValueBefore = prevCash + prevHoldings.reduce((s, h) => {
    const t = tickers.find((t) => t.symbol === h.symbol);
    return s + (t ? t.price * h.shares : 0);
  }, 0);
  const positionPctOfPortfolio = (total / portfolioValueBefore) * 100;

  const lines = [];

  if (side === "buy") {
    if (!prevHolding) {
      lines.push(`First position in ${symbol} — that's a ${ticker.sector.toLowerCase()} play.`);
    } else {
      const newAvg = (prevHolding.avgCost * prevHolding.shares + price * shares) / (prevHolding.shares + shares);
      const direction = price < prevHolding.avgCost ? "lowered" : "raised";
      lines.push(`Adding to your ${symbol} position ${direction} your average cost to $${newAvg.toFixed(2)}.`);
    }

    if (positionPctOfPortfolio > 30) {
      lines.push(`This trade is ${positionPctOfPortfolio.toFixed(0)}% of your portfolio — that's a concentrated bet. In a real account, a single position over 25% means one bad day can hurt disproportionately.`);
    } else if (positionPctOfPortfolio > 15) {
      lines.push(`That's about ${positionPctOfPortfolio.toFixed(0)}% of your portfolio — meaningful exposure without being all-in.`);
    } else {
      lines.push(`At ${positionPctOfPortfolio.toFixed(0)}% of your portfolio, this is a measured size — exactly the kind of move that compounds well over time.`);
    }

    // Sector tilt commentary
    if (ticker.sector === "Technology") {
      lines.push(`Single-name tech is high-variance. Watch how it moves through your next mission events to learn your real tolerance.`);
    } else if (ticker.sector === "Fixed income") {
      lines.push(`Bonds dampen volatility — your portfolio just got a little more stable.`);
    } else if (ticker.sector === "Canadian banks") {
      lines.push(`Canadian bank stocks are stable dividend payers — boring in the best way.`);
    } else if (ticker.sector.includes("equities")) {
      lines.push(`Broad-market equity ETFs are how most long-term investors build a core. Your ${user.goalLabel.toLowerCase()} goal in ${user.goalYears} years aligns with this kind of holding.`);
    }
  } else {
    // SELL
    if (prevHolding) {
      const realized = (price - prevHolding.avgCost) * shares;
      if (realized > 0) {
        lines.push(`Sold ${shares} ${symbol} at a $${realized.toFixed(2)} gain from your avg cost.`);
        lines.push(`Taking profit feels good — just be careful you're not selling winners while holding losers (the classic mistake).`);
      } else if (realized < 0) {
        lines.push(`Sold ${shares} ${symbol} at a $${Math.abs(realized).toFixed(2)} loss from your avg cost.`);
        lines.push(`Locking in a loss is sometimes the right call — but only if your thesis on this position actually changed. If you sold because of price action alone, that's selling low.`);
      } else {
        lines.push(`Sold ${shares} ${symbol} roughly at break-even.`);
      }
    }

    const remaining = prevHolding ? prevHolding.shares - shares : 0;
    if (remaining === 0 && prevHolding) {
      lines.push(`Position fully closed. Cash up to $${(prevCash + total).toFixed(2)} — sitting in cash earns nothing, so plan your next move.`);
    } else if (remaining > 0) {
      lines.push(`You still hold ${remaining} ${symbol} shares — partial sells are useful for trimming oversized positions.`);
    }
  }

  return lines.join(" ");
}
