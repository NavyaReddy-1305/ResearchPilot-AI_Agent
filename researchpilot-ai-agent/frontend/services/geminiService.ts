import { GoogleGenAI, Type } from "@google/genai";
import { Paper, PaperSummary } from "../types";

// ✅ Correct way for Vite
const getAIClient = () => {
  return new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
};

/* =========================
   PAPER SUMMARY
========================= */

export const generatePaperSummary = async (
  paper: Paper
): Promise<PaperSummary> => {
  const ai = getAIClient();

  const prompt = `
You are a professional academic research assistant.

Paper Title: ${paper.title}
Abstract: ${paper.abstract}

Provide structured JSON with:
shortSummary, keyContributions (array), methodology, results, conclusion.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // ✅ FIXED MODEL
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          shortSummary: { type: Type.STRING },
          keyContributions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          methodology: { type: Type.STRING },
          results: { type: Type.STRING },
          conclusion: { type: Type.STRING },
        },
        required: [
          "shortSummary",
          "keyContributions",
          "methodology",
          "results",
          "conclusion",
        ],
      },
    },
  });

  return JSON.parse(response.text);
};

/* =========================
   PAPER Q&A
========================= */

export const askPaperQuestion = async (
  paper: Paper,
  question: string
): Promise<string> => {
  const ai = getAIClient();

  const prompt = `
You are an academic research assistant.

Paper Title: ${paper.title}
Abstract: ${paper.abstract}

Question:
${question}

Answer ONLY using the abstract.
If not found, say:
"This information is not explicitly stated in the paper."
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // ✅ FIXED MODEL
    contents: prompt,
    config: {
      temperature: 0.7,
    },
  });

  return response.text;
};

/* =========================
   RESEARCH AGENT CHAT
========================= */

export const chatWithAgent = async (
  message: string
): Promise<string> => {
  const ai = getAIClient();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are ResearchPilot AI.

User Query:
${message}

Provide structured, academic, detailed answer.
Avoid generic chatbot replies.
`,
    config: {
      temperature: 0.8,
    },
  });

  return response.text ?? "";
};
