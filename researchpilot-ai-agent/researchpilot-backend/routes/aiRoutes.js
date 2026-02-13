const express = require("express");
const router = express.Router();

const {
  summarize,
  askPaperQuestion,
  researchAgent,
} = require("../controllers/aiController");

router.post("/summarize", summarize);
router.post("/ask", askPaperQuestion);
router.post("/agent", researchAgent);

module.exports = router;
