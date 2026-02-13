const fs = require("fs");
const pdfParse = require("pdf-parse");
const Paper = require("../models/Paper");

// ================= SEARCH =================
const search = async (req, res) => {
  res.json({ message: "Search endpoint working" });
};

// ================= SAVE =================
const savePaper = async (req, res) => {
  res.json({ message: "Save endpoint working" });
};

// ================= GET SAVED =================
const getSaved = async (req, res) => {
  res.json({ message: "Get saved endpoint working" });
};

// ================= UPLOAD =================
const uploadPaper = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    return res.status(200).json({
      message: "PDF uploaded successfully",
      textPreview: pdfData.text.substring(0, 500),
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = {
  search,
  savePaper,
  getSaved,
  uploadPaper,
};
