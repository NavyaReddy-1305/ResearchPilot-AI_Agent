const { generateContent } = require("../services/geminiService");

/* =========================
   SUMMARY
========================= */

exports.summarize = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text required" });
    }

    const prompt = `
You are a professional academic research assistant.

Summarize the following research abstract in clear academic language:

${text}

Provide a concise but structured summary.
`;

    const summary = await generateContent(prompt);

    res.json({ summary });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Summary failed" });
  }
};

/* =========================
   PAPER Q&A
========================= */

exports.askPaperQuestion = async (req, res) => {
  try {
    const { paperText, question } = req.body;

    if (!paperText || !question) {
      return res.status(400).json({ error: "Paper text and question required" });
    }

    const prompt = `
You are an expert academic research assistant.

Below is a research paper abstract or content:

${paperText}

User Question:
${question}

Answer ONLY based on the paper.
Be precise and academic.
If not found, say:
"This information is not explicitly stated in the paper."
`;

    const result = await generateContent(prompt);

    console.log("AI RESULT:", result); // 🔍 Debug log

    res.json({
      answer: result || "No answer generated."
    });

  } catch (error) {
    console.error("Q&A ERROR:", error);
    res.status(500).json({ error: "Q&A failed" });
  }
};

/* =========================
   RESEARCH AGENT
========================= */

exports.researchAgent = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const prompt = `
You are ResearchPilot AI — an advanced academic research assistant.

User Query:
${message}

Provide:
- Structured
- Detailed
- Academic
- Non-generic response
`;

    const response = await generateContent(prompt);

    res.json({ response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Agent failed" });
  }
};
