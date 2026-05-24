// Learn tab content. 6 categories × 4 lessons. ~8 with full body, rest summary.

export const CATEGORIES = [
  {
    slug: "investing-basics",
    name: "Investing basics",
    desc: "What investing is and why it matters now.",
    icon: "spark",
    lessons: [
      {
        slug: "what-is-investing",
        title: "What is investing and why it matters now",
        weekTag: 1,
        readMinutes: 4,
        gate: true,
        body: `Investing is the act of putting money to work — buying small pieces of companies (stocks), loans to governments and businesses (bonds), or baskets of both (funds) — so that money can grow over time.

The reason it matters *now*, not at 40: time. A dollar invested at 24 has 40 years to compound. A dollar invested at 34 has 30. The difference between those two starting points isn't 25% more — it's often double or triple, because compounding accelerates as the base grows.

You don't need a large income to start. Consistency matters more than size in your first 10 years. $50/month into a low-cost portfolio, every month, beats $5,000 once when you feel ready.`,
      },
      {
        slug: "time-value-of-money",
        title: "The time value of money",
        weekTag: 1,
        readMinutes: 3,
        body: `A dollar today is worth more than a dollar a year from now — because the dollar today can earn returns. This is why people who delay investing pay a hidden cost. Not the contribution they didn't make, but the years of compounding they gave up.

Rule of thumb: at 7% returns, money roughly doubles every 10 years. $1,000 invested at 24 becomes ~$8,000 by 54. The same $1,000 invested at 34 becomes ~$4,000.`,
      },
      {
        slug: "compound-growth",
        title: "How compound growth works",
        weekTag: 1,
        readMinutes: 4,
        body: `Compound growth means your returns earn returns. Year 1 you earn $70 on $1,000. Year 2 you earn 7% on $1,070, not $1,000. The gap looks tiny early and enormous late.

For young investors, the bulk of your eventual portfolio value comes from the last 10 years before you need the money — but only because the first 30 set the foundation. Skip the first decade and you can never get back what compounding would have done with that runway.`,
      },
      {
        slug: "starting-early",
        title: "Why starting early beats starting big",
        weekTag: 1,
        readMinutes: 3,
        body: `A 24-year-old who invests $100/month for 10 years and then stops will typically have more at 65 than a 34-year-old who invests $100/month for 30 years straight. Same total dollars in. Different results, because the first 10 years had longer to compound.

The implication: don't wait until you can contribute more. Start now with whatever you can sustain, even $25/month. You can always increase later — what you can't get back is the time.`,
      },
    ],
  },
  {
    slug: "registered-accounts",
    name: "Registered accounts",
    desc: "TFSA, RRSP, FHSA — which one and why.",
    icon: "vault",
    lessons: [
      {
        slug: "tfsa-explained",
        title: "TFSA explained",
        weekTag: 8,
        readMinutes: 4,
        body: `A Tax-Free Savings Account is a wrapper around investments. Contributions are made with after-tax dollars (no deduction), but all growth and withdrawals are tax-free, forever. You can take money out any time, any reason, no penalty. Withdrawn contribution room comes back next calendar year.

2026 annual limit: $7,000. Cumulative room since 2009 if you've been 18+ the whole time: ~$102,000.

Best for: medium-term goals, emergency funds, anyone in a lower tax bracket today than they expect to be in retirement.`,
      },
      {
        slug: "rrsp-vs-tfsa",
        title: "RRSP vs TFSA — which is right for you",
        weekTag: 8,
        readMinutes: 5,
        body: `Both shelter investment growth from tax. The difference is when you pay tax.

RRSP: contributions are tax-deductible (you get money back at tax time). Growth is tax-deferred. Withdrawals are taxed as income. Best when your current tax rate is *higher* than your expected retirement tax rate.

TFSA: contributions use after-tax money (no deduction). Growth and withdrawals are completely tax-free. Best when your current tax rate is *lower* than your expected retirement tax rate — which is the case for most people aged 18–34.

For most young earners with modest income: TFSA first, RRSP later when income climbs.`,
      },
      {
        slug: "fhsa-explained",
        title: "FHSA for first-time homebuyers",
        weekTag: 8,
        readMinutes: 4,
        gate: false,
        body: `The First Home Savings Account is the newest wrapper (2023). It combines the best of both worlds for one specific goal: buying your first home.

Contributions are tax-deductible (RRSP-style). Growth is sheltered. Withdrawals for a first home are completely tax-free (TFSA-style).

Limits: $8,000/year, $40,000 lifetime. The account can stay open up to 15 years.

If your goal is a house in the next decade, FHSA almost always beats both TFSA and RRSP. The catch: you must use the funds toward a first home, otherwise you transfer to RRSP.`,
      },
      {
        slug: "resp-rdsp",
        title: "RESP and RDSP overview",
        weekTag: 8,
        readMinutes: 3,
        body: `Two specialized accounts most young adults don't need yet but should know exist.

RESP (Registered Education Savings Plan): for funding a child's education. Government matches 20% of contributions up to $500/year per child. Use when you have kids.

RDSP (Registered Disability Savings Plan): for people with disabilities. Substantial government matching grants and bonds. Use when eligible.`,
      },
    ],
  },
  {
    slug: "portfolios-and-risk",
    name: "Portfolios and risk",
    desc: "Mix, match, and why diversification works.",
    icon: "pie",
    lessons: [
      {
        slug: "diversification",
        title: "What is diversification",
        weekTag: 2,
        readMinutes: 4,
        gate: true,
        body: `Diversification means not putting everything into one company, one sector, or one country. It's the closest thing investing has to a free lunch.

When you own 500 companies via an index fund, no single bankruptcy can wipe you out. When you own one company, it can. The math: if any single holding could fall to zero, owning 500 of them caps your maximum loss from that event at 0.2% of your portfolio.

You don't need to pick the winners. You just need to own enough of the market that the winners carry you.`,
      },
      {
        slug: "risk-vs-return",
        title: "Risk vs return — the real tradeoff",
        weekTag: 2,
        readMinutes: 4,
        body: `Higher potential returns require accepting more variability along the way. Stocks return ~7% annually on average — but with regular 20% drawdowns. Bonds return ~3% — but rarely drop more than 5% in a bad year.

Your job isn't to maximize return. It's to pick a level of variability you can actually sit through without panic-selling at the bottom. A portfolio you bail on at the worst moment underperforms a more conservative one you hold through everything.`,
      },
      {
        slug: "portfolio-types",
        title: "Conservative, balanced, and growth portfolios explained",
        weekTag: 2,
        readMinutes: 3,
        body: `Three standard recipes:

Conservative — ~30% stocks, 70% bonds. Lower returns (~4%), smaller swings. Goals under 3 years.

Balanced — ~60% stocks, 40% bonds. Moderate returns (~6%), moderate swings. Goals 3–7 years.

Growth — ~80–100% stocks. Higher returns (~7–8%), bigger swings. Goals 7+ years.

The right mix depends on when you need the money — not your personality.`,
      },
      {
        slug: "rebalancing",
        title: "How and when to rebalance",
        weekTag: 5,
        readMinutes: 3,
        body: `Over time, what you bought drifts. If stocks run up, your 60/40 quietly becomes 70/30. Now you're taking more risk than you signed up for. Rebalancing means selling a bit of what grew and buying what lagged to restore your target mix.

How often: once or twice a year is plenty. Most managed portfolios (including Scotia Essentials) do this automatically.`,
      },
    ],
  },
  {
    slug: "market-behaviour",
    name: "Market behaviour",
    desc: "Why markets move and how to not freak out.",
    icon: "wave",
    lessons: [
      {
        slug: "what-causes-drops",
        title: "What causes market drops",
        weekTag: 4,
        readMinutes: 3,
        body: `Markets drop because of news (earnings misses, rate hikes, geopolitical events) and because of crowd behaviour (people see others selling and sell too). The first cause is usually overstated. The second is usually understated.

Drops of 10%+ happen about once a year. Drops of 20%+ happen about once every 4 years. Drops of 30%+ happen every 8–10 years. None of these mean the system is broken — they're features, not bugs.`,
      },
      {
        slug: "panic-selling",
        title: "Why panic selling destroys returns",
        weekTag: 4,
        readMinutes: 4,
        body: `Selling during a drop converts a paper loss into a real one. You also miss the recovery — which historically arrives within 12–18 months of the bottom.

The math is brutal: an investor who missed the 10 best days in the S&P 500 over the last 20 years had returns about half the average. Most of those best days happened within 2 weeks of the worst days. Selling when scared means being out of the market on exactly the days that matter most.

The fix: pre-decide what you'll do before the drop happens. "I will not sell if it drops less than 30%" is a real plan. "I'll decide when it happens" is not.`,
      },
      {
        slug: "dollar-cost-averaging",
        title: "Dollar-cost averaging — why boring wins",
        weekTag: 3,
        readMinutes: 3,
      },
      {
        slug: "fomo",
        title: "What FOMO costs you",
        weekTag: 7,
        readMinutes: 3,
      },
    ],
  },
  {
    slug: "investments-101",
    name: "Investments 101",
    desc: "Stocks, ETFs, bonds, mutual funds — what they are.",
    icon: "stack",
    lessons: [
      { slug: "stocks-and-etfs", title: "Stocks and ETFs", weekTag: 5, readMinutes: 4 },
      { slug: "bonds-and-gics", title: "Bonds and GICs", weekTag: 5, readMinutes: 3 },
      { slug: "mutual-funds", title: "Mutual funds", weekTag: 5, readMinutes: 3 },
      { slug: "index-vs-active", title: "Index investing vs active management", weekTag: 9, readMinutes: 4 },
    ],
  },
  {
    slug: "fees-and-costs",
    name: "Fees and costs",
    desc: "What you pay and why it compounds against you.",
    icon: "coin",
    lessons: [
      {
        slug: "what-is-mer",
        title: "What is an MER and why it matters",
        weekTag: 9,
        readMinutes: 4,
        body: `MER (Management Expense Ratio) is the annual % the fund charges you. A 1.5% MER means every year, 1.5% of your portfolio is paid out — whether the fund made money or not.

Sounds small. Isn't. On $100,000 over 35 years, the difference between 0.5% MER and 1.5% MER is roughly $90,000 in lost growth.

The trap: higher fees feel like they should buy better performance. They almost never do. Most "actively managed" funds with 1.5%+ MERs underperform their cheaper index alternatives over 10+ years.`,
      },
      { slug: "fee-compounding", title: "How fees compound against you over time", weekTag: 9, readMinutes: 3 },
      { slug: "comparing-platforms", title: "Comparing platforms honestly", weekTag: 9, readMinutes: 3 },
      { slug: "scotia-fees", title: "Scotiabank's fee structure, transparently explained", weekTag: 9, readMinutes: 3 },
    ],
  },
];

// flat lookup
export const ALL_LESSONS = CATEGORIES.flatMap((cat) =>
  cat.lessons.map((l) => ({ ...l, categorySlug: cat.slug, categoryName: cat.name }))
);

export const GATE_LESSONS = ALL_LESSONS.filter((l) => l.gate).map(
  (l) => `${l.categorySlug}/${l.slug}`
);

export function getLesson(catSlug, lessonSlug) {
  const cat = CATEGORIES.find((c) => c.slug === catSlug);
  if (!cat) return null;
  const lesson = cat.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { ...lesson, category: cat };
}
