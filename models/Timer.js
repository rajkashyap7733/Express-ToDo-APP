const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    isRunning: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timer", timerSchema);
