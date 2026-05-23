import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (/\.vercel\.app$/.test(new URL(origin).hostname)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const CHAT_FALLBACK =
  "Great decision to reflect on your investing choices. Keep thinking about how each move connects to your goal.";
const ASK_FALLBACK =
  "That's a great question. As a general rule, focus on understanding your goal and timeline first — that drives most investing decisions.";

const buildChatPrompt = ({
  week,
  decision,
  decisionContext,
  portfolioValue,
  portfolioType,
  userGoal,
  goalTimeline,
  previousDecisions = [],
}) => `You are a warm, knowledgeable investing coach helping a young Canadian learn to invest for the first time through a simulated 90-day program called Scotia First Investor.

The user's profile:
- Goal: ${userGoal}
- Timeline: ${goalTimeline}
- Portfolio type: ${portfolioType}
- Current week: ${week} of 12
- Previous decisions: ${previousDecisions.join(", ")}

What just happened:
- Decision made: ${decision}
- Context: ${decisionContext}
- Portfolio value at time of decision: $${portfolioValue}

Your response rules:
- Respond in exactly 3-4 sentences
- Always reference the specific decision they made and their specific goal
- Be honest about mistakes without being harsh — this is a safe learning environment with fake money
- Never use financial jargon without immediately explaining it in plain language
- Never recommend specific securities or give regulated financial advice (no stock picks, no timing advice)
- Connect every response to their specific goal and timeline
- End with one forward-looking sentence about what to watch for or think about next
- Sound like a knowledgeable friend, not a compliance document`;

const buildAskPrompt = ({ question, userGoal, goalTimeline, portfolioType, week }) =>
  `You are a warm, knowledgeable investing guide helping a young Canadian (aged 18-34) learn about investing for the first time through a program called Scotia First Investor.

The user's profile:
- Goal: ${userGoal}
- Timeline: ${goalTimeline}
- Portfolio type: ${portfolioType}
- Current week: ${week} of 12

The user is asking: "${question}"

Your response rules:
- Answer in 3-5 sentences maximum
- Use plain language throughout — explain any term you use
- Never recommend specific securities or give regulated financial advice
- Always connect your answer to their specific goal and timeline where relevant
- If the question is outside investing (personal problems, unrelated topics), redirect warmly: "That's outside what I can help with, but for your investing journey..."
- If asked about Scotiabank competitors (Wealthsimple, Questrade), stay neutral and redirect to general principles
- Sound like a knowledgeable friend, not a textbook`;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const prompt = buildChatPrompt(req.body);
    const result = await model.generateContent(prompt);
    const message = result.response.text().trim();
    res.json({ message });
  } catch (err) {
    console.error("/api/chat error:", err.message);
    res.json({ message: CHAT_FALLBACK, error: true });
  }
});

app.post("/api/ask", async (req, res) => {
  try {
    const prompt = buildAskPrompt(req.body);
    const result = await model.generateContent(prompt);
    const message = result.response.text().trim();
    res.json({ message });
  } catch (err) {
    console.error("/api/ask error:", err.message);
    res.json({ message: ASK_FALLBACK, error: true });
  }
});

app.listen(PORT, () => {
  console.log(`Scotia First Investor backend running on port ${PORT}`);
});
