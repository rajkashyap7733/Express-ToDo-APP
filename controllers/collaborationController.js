const Task = require("../models/Task");

exports.addCollaborator = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { collaboratorId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.collaborators.includes(collaboratorId)) {
      return res.status(400).json({ message: "User already a collaborator" });
    }

    task.collaborators.push(collaboratorId);
    await task.save();

    res.json({ message: "Collaborator added", task });
  } catch (error) {
    res.status(500).json({ message: "Error adding collaborator", error });
  }
};

exports.removeCollaborator = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { collaboratorId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.collaborators.pull(collaboratorId);
    await task.save();

    res.json({ message: "Collaborator removed", task });
  } catch (error) {
    res.status(500).json({ message: "Error removing collaborator", error });
  }
};
