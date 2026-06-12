import {GoogleGenAI} from '@google/genai'

let client = null

const getClient = () => {
    if(client) return client
    const key = process.env.GEMINI_API_KEY
    if(!key) return null
    client = new GoogleGenAI({apiKey : key})
    return client
}
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

export const isEnabled = () => !!process.env.GEMINI_API_KEY

export const parseJSON = (text) => {
    let cleaned = (text || "").trim();

    if (cleaned.startsWith("```json")) {
        cleaned = cleaned
            .replace(/```json\n?/g, "")
            .replace(/```\n?$/g, "");
    } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/```\n?/g, "");
    }

    return JSON.parse(cleaned.trim());
};

export const chatCompletion = async ({
    system,
    user,
    temperature = 0.7,
}) => {

    const c = getClient();

    if (!c) {
        return {
            ok: false,
            content:
                "AI features are disabled - set GEMINI_API_KEY in the backend .env to enable real AI responses.",
        };
    }

    try {

        const res = await c.models.generateContent({
            model: MODEL,
            contents: user,
            config: {
                systemInstruction: system,
                temperature,
            },
        });

        return {
            ok: true,
            content: (res.text || "").trim(),
        };

    } catch (err) {

        console.error("AI error:", err.message);

        return {
            ok: false,
            content:
                "AI request failed. Please try again later.",
        };
    }
};

export const SYSTEM_PROMPTS = {
    weekly: `
You are a warm, encouraging habit coach.

Analyze the user's last 7 days of habit data.

Output exactly:

Overall Performance:
...

Strongest Habit:
...

Habit Needing Attention:
...

Current Streaks:
...

Recommendations:
1. ...
2. ...
3. ...

Keep under 150 words.
Use the user's actual habit names.
Be encouraging but honest.
`,

    suggestion: `
You are a productivity and habit expert.
Based on the user's habits, completion history,
and goals, suggest practical improvements.
Give specific and realistic recommendations.
Return valid json only with this shape : {\"suggestions\":[{\"name\":\"...\",\"description\":\"...\,\"frequency\":\"daily|weekly\",\"category\":\"Health|Fitness|Learning|Mindfulness|Productivity|Social|Finance|Creative|Study|Other\",\"icon\":\"<emoji>\",\"reason\":\"...\"}]} No prose outside json
`,

    recovery: `
You are a compassionate habit recovery coach.

The user has broken a streak or missed several habits.

Write:
1. A short empathetic opening (1-2 sentences)
2. Day 1 action
3. Day 2 action
4. Day 3 action

Focus on rebuilding momentum rather than perfection.

Keep the response under 120 words.
`,

    chat: `
You are a habit analysis assistant.

Answer only using the provided habit data.

Rules:
- Do not invent statistics.
- Do not assume missing information.
- If the answer cannot be determined from the provided data, say so.
- Keep answers concise and practical.
`,

    morning: `
You are a warm and motivating friend.

Write a short morning message (30-60 words).

Use:
- User's habit names
- Current streaks
- Recent progress

Be energetic but not cheesy.
Maximum one emoji.
`
};

