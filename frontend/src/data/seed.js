import { INITIAL_TICKERS } from "./tickers.js";

export const SEED = {
  user: {
    name: "Sara",
    age: 26,
    income: 3200,
    essentials: 2400,
    idle: 800,
    goal: "house",
    goalLabel: "House down payment",
    goalAmount: 25000,
    goalYears: 4,
    contribution: 100,
    portfolioType: "balanced",
    accountChoice: "fhsa",
  },
  progress: {
    currentWeek: 4,           // demo starts mid-program at the hero week
    completedMissions: [1, 2, 3],
    missionDecisions: { 3: "c100" },
    onboarded: true,
  },
  score: {
    consistency: 71,
    diversification: 58,
    goalAlignment: 51,
    behaviour: 38,
    bonus: 0,
    total: 218,
    percentile: 38,
  },
  paper: {
    cash: 1000.0,
    holdings: [],            // [{symbol, shares, avgCost}]
    orders: [],              // [{id, ts, symbol, side, shares, price}]
  },
  learn: {
    completedLessons: [],    // array of "category/lesson" keys
  },
  tickers: INITIAL_TICKERS,
};
