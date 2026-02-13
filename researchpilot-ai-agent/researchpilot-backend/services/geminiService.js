const axios = require("axios");

exports.generateContent = async (prompt) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    }
  );

  return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
};
