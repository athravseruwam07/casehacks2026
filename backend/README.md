# Scotia First Investor — Backend

This is the Express.js backend for **Scotia First Investor**, a 90-day simulated investing experience for young Canadian Scotiabank customers. It handles AI coaching message generation by calling the Google Gemini API server-side so the API key stays off the client.

## Local setup

```bash
git clone <repo>
cd backend
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
```

Server runs on `http://localhost:3001`.

## Test it locally

Health check:

```bash
curl http://localhost:3001/health
```

`/api/chat`:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "week": 4,
    "decision": "sold",
    "decisionContext": "User sold their entire portfolio during a simulated 12% market correction",
    "portfolioValue": 1013.42,
    "portfolioType": "balanced",
    "userGoal": "house down payment",
    "goalTimeline": "7 years",
    "previousDecisions": ["chose balanced portfolio", "set up $100/month contribution"]
  }'
```

`/api/ask`:

```bash
curl -X POST http://localhost:3001/api/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Should I put money in a TFSA or RRSP first?",
    "userGoal": "house down payment",
    "goalTimeline": "7 years",
    "portfolioType": "balanced",
    "week": 5
  }'
```

## Deploy to Railway

1. Push the `backend` folder to GitHub.
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
3. Select this repo (set root directory to `backend` if the repo also contains the frontend).
4. Open the **Variables** tab and add:
   - `GEMINI_API_KEY` — your Google AI Studio key
   - `PORT` — `3001` (Railway also injects its own PORT; the code respects it)
   - `ALLOWED_ORIGINS` — comma-separated list, e.g. `http://localhost:5173,https://your-vercel-app.vercel.app`
5. Railway auto-detects Node.js and runs `npm start`.
6. In the **Settings** tab, generate a public domain. Copy that URL — it becomes `VITE_API_URL` for the frontend.

Gotchas:
- Railway sets `PORT` automatically; do not hardcode it.
- If the frontend domain changes (preview deploys), either add it to `ALLOWED_ORIGINS` or rely on the built-in `*.vercel.app` allowlist regex in `index.js`.
- Free Railway plan sleeps after inactivity — first request after idle may take a few seconds.

## API contract

### `POST /api/chat`

Request:

```json
{
  "week": 4,
  "decision": "sold",
  "decisionContext": "User sold their entire portfolio during a simulated 12% market correction",
  "portfolioValue": 1013.42,
  "portfolioType": "balanced",
  "userGoal": "house down payment",
  "goalTimeline": "7 years",
  "previousDecisions": ["chose balanced portfolio", "set up $100/month contribution"]
}
```

Success response:

```json
{ "message": "..." }
```

Error response (Gemini failure — always 200 so the frontend doesn't break):

```json
{
  "message": "Great decision to reflect on your investing choices. Keep thinking about how each move connects to your goal.",
  "error": true
}
```

### `POST /api/ask`

Request:

```json
{
  "question": "Should I put money in a TFSA or RRSP first?",
  "userGoal": "house down payment",
  "goalTimeline": "7 years",
  "portfolioType": "balanced",
  "week": 5
}
```

Success response:

```json
{ "message": "..." }
```

Error response:

```json
{
  "message": "That's a great question. As a general rule, focus on understanding your goal and timeline first — that drives most investing decisions.",
  "error": true
}
```

### `GET /health`

```json
{ "status": "ok" }
```

## Frontend integration

Set this in the React app:

```
# frontend/.env
VITE_API_URL=https://your-railway-app.railway.app
```

Drop-in fetch helper:

```javascript
// utils/api.js
export const getCoachingMessage = async (decisionContext) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(decisionContext)
    });
    const data = await response.json();
    return data.message;
  } catch {
    return "Keep reflecting on your investing decisions — every choice is a learning opportunity.";
  }
};

export const askAI = async (questionContext) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionContext)
    });
    const data = await response.json();
    return data.message;
  } catch {
    return "That's a great question. Focus on your goal and timeline — those two things drive most good investing decisions.";
  }
};
```
