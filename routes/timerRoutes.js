const express = require("express");
const { startTimer, stopTimer } = require("../controllers/timerController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/start", authMiddleware, startTimer);
router.post("/stop/:timerId", authMiddleware, stopTimer);

module.exports = router;
