// 12-week mission spec. Hero weeks (1,2,4,7,10,12) have custom screens;
// stub weeks render from this data via <MissionStub>.

export const MISSIONS = [
  {
    week: 1,
    title: "Your financial picture",
    tagline: "Where your money actually goes.",
    lesson:
      "Investing matters for you specifically — not in the abstract. You bring home about $3,200/month. About $2,400 covers essentials. The rest sits in chequing earning almost nothing. That gap is the opportunity.",
    decision: null,
    pointsScene: 200,
    hero: true,
  },
  {
    week: 2,
    title: "Your first portfolio",
    tagline: "Pick a mix that matches your timeline.",
    lesson:
      "A portfolio is just a recipe — some stocks (growth, more risk), some bonds (stability, less risk). The right mix depends on how soon you need the money. For a 4-year house goal, Balanced is the standard recommendation.",
    decision: null,
    pointsScene: 150,
    hero: true,
  },
  {
    week: 3,
    title: "Adding to your investment",
    tagline: "Consistency beats timing.",
    lesson:
      "Person A invests $1,200 at the perfect moment. Person B invests $100 every month no matter what. Over 10 years, Person B usually wins because most people can't time the market — but anyone can be consistent.",
    decision: {
      prompt: "Set up your simulated monthly contribution",
      options: [
        { id: "c50", label: "$50/month", body: "Cautious start." },
        { id: "c100", label: "$100/month", body: "Matches your idle cash comfortably.", recommended: true },
        { id: "c200", label: "$200/month", body: "Aggressive — leaves little buffer." },
      ],
      consequence: {
        c50:  "At $50/mo, projected portfolio in 4 years is around $2,700. Slow but real progress.",
        c100: "At $100/mo, projected portfolio in 4 years is around $5,400. That's $4,400 in contributions plus growth — and it stays automatic.",
        c200: "At $200/mo, projected portfolio in 4 years is around $10,800. Strong — but make sure you're keeping an emergency fund liquid.",
      },
    },
    pointsScene: 150,
  },
  {
    week: 4,
    title: "The market drops",
    tagline: "Markets fall. Every investor sees this.",
    lesson:
      "A 12% correction wiped $137 off your portfolio in 3 days. The question isn't whether — it's how you respond.",
    decision: null,
    pointsScene: 200,
    hero: true,
  },
  {
    week: 5,
    title: "What you're actually holding",
    tagline: "Open the hood. See what's inside.",
    lesson:
      "Your $1,013 isn't 'an investment' — it's a slice of about 250 companies. Apple, TD, Shopify, government bonds. The Week 4 drop shifted your allocation: equities are now 64%, down from 70%. Rebalancing means selling a little of what went up and buying more of what went down to get back to your target.",
    decision: {
      prompt: "Your allocation drifted. What do you do?",
      options: [
        { id: "rebalance", label: "Rebalance back to 70/30", body: "Sell some bonds, buy equities at the lower price.", recommended: true },
        { id: "leave", label: "Leave it as 64/36", body: "Lower risk now, but drifts from your plan." },
      ],
      consequence: {
        rebalance: "You restored your target allocation and bought equities cheaper. +10 to Diversification.",
        leave:     "Allocation stays drifted. Over time this means your portfolio doesn't behave like the one you chose.",
      },
    },
    pointsScene: 150,
  },
  {
    week: 6,
    title: "A windfall",
    tagline: "$500 tax refund just landed.",
    lesson:
      "Unexpected money tests your plan. You don't have to invest it all — but the choice you make changes when you hit your goal.",
    decision: {
      prompt: "What do you do with the $500?",
      options: [
        { id: "all",   label: "Invest all $500",         body: "Reaches house goal ~8 months sooner.", recommended: true },
        { id: "half",  label: "Invest half, save half",  body: "Reaches goal ~4 months sooner. Keeps liquidity." },
        { id: "save",  label: "Keep all $500 in savings",body: "No impact on goal timeline." },
        { id: "spend", label: "Spend it",                body: "Reduces goal progress slightly. Worth it if it funds something real." },
      ],
      consequence: {
        all:   "Strong move. Projected $5,800 closer at your target date.",
        half:  "Balanced. Some progress, some cushion.",
        save:  "Safe. Money still earning ~0.05% — consider a HISA at minimum.",
        spend: "Honest answer. Just notice the tradeoff against your timeline.",
      },
    },
    pointsScene: 150,
  },
  {
    week: 7,
    title: "The market rallies",
    tagline: "Tech is up 18%. Should you chase?",
    lesson:
      "FOMO is as damaging as panic. Sector rallies look like easy money — until they correct, which they usually do within months.",
    decision: null,
    pointsScene: 200,
    hero: true,
  },
  {
    week: 8,
    title: "Registered accounts",
    tagline: "Pick the right wrapper for your goal.",
    lesson:
      "For a house down payment, FHSA is usually the best choice — your contributions are tax-deductible like an RRSP, but withdrawals for a first home are tax-free like a TFSA. Lifetime cap: $40,000. Annual cap: $8,000.",
    decision: {
      prompt: "Which account opens at graduation?",
      options: [
        { id: "fhsa", label: "FHSA", body: "Built for first-home buyers. Tax-deductible in, tax-free out.", recommended: true },
        { id: "tfsa", label: "TFSA", body: "More flexible — withdraw anytime, any reason." },
        { id: "rrsp", label: "RRSP", body: "Better for retirement than a 4-year goal." },
      ],
      consequence: {
        fhsa: "Strong fit for your stated goal. Saved — your real account opens as FHSA at week 12.",
        tfsa: "Reasonable if your goal might change. Tax-free growth either way.",
        rrsp: "Mismatch with your timeline. Locked in until retirement or first-home buyer plan withdrawal.",
      },
    },
    pointsScene: 150,
  },
  {
    week: 9,
    title: "Fees and costs",
    tagline: "What you pay matters as much as what you earn.",
    lesson:
      "MER means Management Expense Ratio — the % the fund charges you every year. A 1.5% MER vs 0.5% MER on a $100,000 portfolio over 35 years is roughly a $90,000 difference, paid quietly out of your returns. The Scotia Essentials portfolios sit at 0.60% MER and include rebalancing + access to an advisor.",
    decision: {
      prompt: "Pick the lower-fee fund?",
      options: [
        { id: "low",  label: "Lower MER (0.60%)", body: "Standard Scotia Essentials Balanced.", recommended: true },
        { id: "high", label: "Higher MER (1.50%)", body: "More 'active' management — historically rarely outperforms after fees." },
      ],
      consequence: {
        low:  "Right call. Over your timeline that's roughly $4,400 in fees saved.",
        high: "Active management sounds appealing — but fewer than 20% of active funds beat their index over 10+ years after fees.",
      },
    },
    pointsScene: 100,
  },
  {
    week: 10,
    title: "Sustained uncertainty",
    tagline: "Up 3%, down 4%, up 2%. No drama. Just noise.",
    lesson:
      "Most of the time, markets aren't crashing or rallying — they're wobbling. Overtrading during noise is one of the most common ways new investors hurt their own returns.",
    decision: null,
    pointsScene: 200,
    hero: true,
  },
  {
    week: 11,
    title: "Your investment review",
    tagline: "11 weeks in. How are you doing?",
    lesson:
      "Reviewing a portfolio is not the same as watching it. You look at it once a quarter, compare it to your goal, and decide if anything material has changed. Most of the time the answer is no.",
    decision: {
      prompt: "Anything to adjust before graduation?",
      options: [
        { id: "hold",     label: "Stay the course",         body: "Plan still fits goal and timeline.", recommended: true },
        { id: "contrib",  label: "Increase contribution",   body: "Bump from $100 to $150/month." },
        { id: "timeline", label: "Extend timeline 1 year",  body: "Lower monthly pressure, slightly more market exposure." },
      ],
      consequence: {
        hold:     "Reviewing without reacting is the discipline. Your plan still maps to your goal.",
        contrib:  "Higher contribution moves your goal date 5 months earlier.",
        timeline: "Less pressure now, slightly more total time in market — also a valid choice.",
      },
    },
    pointsScene: 150,
  },
  {
    week: 12,
    title: "Graduation",
    tagline: "90 days learning. Now make it real.",
    lesson: "Your real account opens with the prize already inside.",
    decision: null,
    pointsScene: 0,
    hero: true,
  },
];

export const HERO_WEEKS = new Set([1, 2, 4, 7, 10, 12]);
