import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { SEED } from "./data/seed.js";
import { GATE_LESSONS } from "./data/learn.js";
import { INITIAL_TICKERS } from "./data/tickers.js";

const STORAGE_KEY = "ilearn:v1";
const Ctx = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // tickers are not persisted (they change every refresh) — rehydrate from INITIAL
    parsed.tickers = INITIAL_TICKERS;
    return parsed;
  } catch {
    return null;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "navigate": {
      const route = action.route;
      // push to browser history unless replace
      if (typeof window !== "undefined") {
        const url = `#${route}`;
        if (action.replace) window.history.replaceState({ route }, "", url);
        else window.history.pushState({ route }, "", url);
      }
      return { ...state, route };
    }

    case "completeOnboarding":
      return {
        ...state,
        user: { ...state.user, ...action.patch },
        progress: { ...state.progress, onboarded: true, currentWeek: Math.max(state.progress.currentWeek, 1) },
        route: "home",
      };

    case "completeMission": {
      const { week, choice, scoreDelta } = action;
      const completed = state.progress.completedMissions.includes(week)
        ? state.progress.completedMissions
        : [...state.progress.completedMissions, week];
      const decisions = { ...state.progress.missionDecisions, [week]: choice };
      const nextWeek = Math.max(state.progress.currentWeek, week === state.progress.currentWeek ? week + 1 : state.progress.currentWeek);
      const newScore = { ...state.score };
      if (scoreDelta) {
        for (const k of Object.keys(scoreDelta)) {
          newScore[k] = (newScore[k] || 0) + scoreDelta[k];
        }
        newScore.total = newScore.consistency + newScore.diversification + newScore.goalAlignment + newScore.behaviour + (newScore.bonus || 0);
      }
      return {
        ...state,
        progress: { ...state.progress, completedMissions: completed, missionDecisions: decisions, currentWeek: nextWeek },
        score: newScore,
      };
    }

    case "markLessonComplete": {
      const key = action.key;
      if (state.learn.completedLessons.includes(key)) return state;
      return {
        ...state,
        learn: { ...state.learn, completedLessons: [...state.learn.completedLessons, key] },
      };
    }

    case "placeOrder": {
      const { symbol, side, shares, price } = action;
      const total = shares * price;
      let cash = state.paper.cash;
      let holdings = [...state.paper.holdings];
      const idx = holdings.findIndex((h) => h.symbol === symbol);

      if (side === "buy") {
        if (total > cash) return state;
        cash -= total;
        if (idx >= 0) {
          const h = holdings[idx];
          const newShares = h.shares + shares;
          const newAvg = (h.avgCost * h.shares + price * shares) / newShares;
          holdings[idx] = { ...h, shares: newShares, avgCost: +newAvg.toFixed(4) };
        } else {
          holdings.push({ symbol, shares, avgCost: price });
        }
      } else {
        // sell
        if (idx < 0 || holdings[idx].shares < shares) return state;
        cash += total;
        const h = holdings[idx];
        const remaining = h.shares - shares;
        if (remaining === 0) holdings.splice(idx, 1);
        else holdings[idx] = { ...h, shares: remaining };
      }

      const order = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        ts: Date.now(),
        symbol, side, shares, price: +price.toFixed(2), total: +total.toFixed(2),
      };
      return {
        ...state,
        paper: { ...state.paper, cash: +cash.toFixed(2), holdings, orders: [order, ...state.paper.orders] },
      };
    }

    case "tickPrices": {
      const tickers = state.tickers.map((t) => {
        const drift = (Math.random() - 0.5) * 2 * 0.0035 * t.price;
        const next = Math.max(0.01, +(t.price + drift).toFixed(2));
        const history = [...t.history.slice(-59), next];
        return { ...t, price: next, history };
      });
      return { ...state, tickers };
    }

    case "resetDemo":
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return { ...SEED, route: "home", tickers: INITIAL_TICKERS };

    default:
      return state;
  }
}

export function StateProvider({ children }) {
  const init = loadInitial() || { ...SEED, route: typeof window !== "undefined" && window.location.hash ? window.location.hash.slice(1) : "home" };
  const [state, dispatch] = useReducer(reducer, init);
  const persistTimer = useRef(null);

  // Persist (debounced)
  useEffect(() => {
    clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      try {
        const { tickers, ...rest } = state;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
      } catch {}
    }, 250);
  }, [state]);

  // Browser back/forward
  useEffect(() => {
    const onPop = (e) => {
      const route = (e.state && e.state.route) || (window.location.hash ? window.location.hash.slice(1) : "home");
      dispatch({ type: "navigate", route, replace: true });
    };
    window.addEventListener("popstate", onPop);
    // Set initial history state
    if (!window.history.state || !window.history.state.route) {
      window.history.replaceState({ route: state.route }, "", `#${state.route}`);
    }
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line
  }, []);

  // Live price tick (every 4s)
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "tickPrices" }), 4000);
    return () => clearInterval(id);
  }, []);

  // Paper trading always available — gate disabled for demo
  const paperUnlocked = true;

  const value = {
    ...state,
    paperUnlocked,
    navigate: (route, replace = false) => dispatch({ type: "navigate", route, replace }),
    completeOnboarding: (patch) => dispatch({ type: "completeOnboarding", patch }),
    completeMission: (week, choice, scoreDelta) => dispatch({ type: "completeMission", week, choice, scoreDelta }),
    markLessonComplete: (key) => dispatch({ type: "markLessonComplete", key }),
    placeOrder: (order) => dispatch({ type: "placeOrder", ...order }),
    resetDemo: () => dispatch({ type: "resetDemo" }),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp outside StateProvider");
  return v;
}

// Route helpers
export function parseRoute(route) {
  if (!route) return { tab: "home", segments: [] };
  const parts = route.split("/").filter(Boolean);
  return { tab: parts[0] || "home", segments: parts.slice(1) };
}
