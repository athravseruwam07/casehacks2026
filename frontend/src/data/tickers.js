// 6 mock tickers. Prices tick during demo via the StateProvider interval.

function buildHistory(start, n = 60, volatility = 0.004) {
  const out = [start];
  let p = start;
  for (let i = 1; i < n; i++) {
    const delta = (Math.random() - 0.5) * 2 * volatility * p;
    p = Math.max(0.01, p + delta);
    out.push(+p.toFixed(2));
  }
  return out;
}

export const INITIAL_TICKERS = [
  {
    symbol: "XIC.TO",
    name: "iShares Core S&P/TSX Capped Composite Index ETF",
    short: "S&P/TSX 60",
    sector: "Canadian equities",
    price: 38.42,
    open: 38.18,
    history: buildHistory(38.42),
  },
  {
    symbol: "VFV.TO",
    name: "Vanguard S&P 500 Index ETF (CAD)",
    short: "US S&P 500",
    sector: "US equities",
    price: 142.85,
    open: 141.92,
    history: buildHistory(142.85, 60, 0.005),
  },
  {
    symbol: "XEF.TO",
    name: "iShares Core MSCI EAFE IMI Index ETF",
    short: "Intl developed",
    sector: "International equities",
    price: 36.71,
    open: 36.78,
    history: buildHistory(36.71, 60, 0.0035),
  },
  {
    symbol: "XBB.TO",
    name: "iShares Core Canadian Universe Bond Index ETF",
    short: "Canadian bonds",
    sector: "Fixed income",
    price: 28.05,
    open: 28.02,
    history: buildHistory(28.05, 60, 0.0012),
  },
  {
    symbol: "SHOP.TO",
    name: "Shopify Inc.",
    short: "Shopify",
    sector: "Technology",
    price: 96.40,
    open: 94.20,
    history: buildHistory(96.40, 60, 0.012),
  },
  {
    symbol: "BNS.TO",
    name: "Bank of Nova Scotia",
    short: "Scotiabank",
    sector: "Canadian banks",
    price: 71.20,
    open: 71.05,
    history: buildHistory(71.20, 60, 0.0045),
  },
];

export function dayChangePct(t) {
  return ((t.price - t.open) / t.open) * 100;
}
export function dayChange(t) {
  return t.price - t.open;
}
