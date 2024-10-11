const express = require("express");
const {
  addCollaborator,
  removeCollaborator,
} = require("../controllers/collaborationController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/:taskId/add", authMiddleware, addCollaborator);
router.post("/:taskId/remove", authMiddleware, removeCollaborator);

module.exports = router;
