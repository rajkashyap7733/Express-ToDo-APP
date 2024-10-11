const Timer = require("../models/Timer");

exports.startTimer = async (req, res) => {
  const { taskId } = req.body;
  try {
    const timer = new Timer({
      task: taskId,
      user: req.user.userId,
      startTime: new Date(),
      isRunning: true,
    });
    await timer.save();
    res.json({ message: "Timer started", timer });
  } catch (error) {
    res.status(500).json({ message: "Error starting timer", error });
  }
};

exports.stopTimer = async (req, res) => {
  try {
    const { timerId } = req.params;
    const timer = await Timer.findById(timerId);
    timer.endTime = new Date();
    timer.isRunning = false;
    await timer.save();
    res.json({ message: "Timer stopped", timer });
  } catch (error) {
    res.status(500).json({ message: "Error stopping timer", error });
  }
};
