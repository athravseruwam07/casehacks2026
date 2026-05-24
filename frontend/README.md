# Scotia iLEARN — Frontend

Mobile-first React web app for **Scotia iLEARN** (case]Hacks 2026 — Scotiabank case). Pure frontend demo. Vite + React 18, no backend wiring required.

## Run

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` on phone or desktop. Mobile fills viewport; desktop shows a centered 402×874 phone container.

## Screens

| # | Screen | Route key |
|---|--------|-----------|
| 1 | Discovery (entry inside Scotia iTRADE)         | `discovery` |
| 2 | Week 1 — Financial snapshot + goal picker      | `snapshot`  |
| 3 | Hub: Missions / Paper / Score (tabs)           | `hub`       |
| 4 | Week 4 — Market crash mission                  | `mission4`  |
| 5 | AI Coach insight                               | `ai`        |
| 6 | Week 12 — Graduation + real account open       | `graduation`|

State-based navigation in `src/App.jsx`. Tap entry card on Discovery → flows through.

## Structure

```
frontend/
  index.html
  vite.config.js
  package.json
  src/
    main.jsx          entry
    App.jsx           root + nav
    styles.css        design tokens, mobile shell
    components.jsx    AppHeader, SubBand, Button, ScoreBar, Sparkline, Ring, AISigil, Triangle, ITradeTabBar, wordmarks
    screens.jsx       all 6 screens
```

## Design tokens

Scotia red `#EC1A23` brand, near-black `#0A0A0A` CTA, white surfaces, hairline `#E5E5E7` dividers. Geist + Geist Mono fonts via Google Fonts. iTRADE-aligned visual language.

## Mobile behaviour

- Viewport meta locks zoom and uses `viewport-fit=cover`
- Body height uses `100dvh` for iOS Safari bottom-bar safety
- Touch tap feedback on all interactive rows (`.tap` class)
- Range sliders styled with Scotia red thumb

## Deploy

Vercel auto-detects Vite:

```bash
# from repo root
vercel --cwd frontend
```

Or push to GitHub and import in Vercel dashboard. Root directory: `frontend`. Build: `npm run build`. Output: `dist`.
