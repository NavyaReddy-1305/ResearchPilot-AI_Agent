const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const paperController = require("../controllers/paperController");

// Existing routes
router.post("/search", paperController.search);
router.post("/save", auth, paperController.savePaper);
router.get("/saved", auth, paperController.getSaved);

// Upload route
router.post(
  "/upload",
  upload.single("pdf"),
  paperController.uploadPaper
);

module.exports = router;
