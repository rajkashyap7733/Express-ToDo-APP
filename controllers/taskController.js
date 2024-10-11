const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority, tags } = req.body;
    const newTask = new Task({
      title,
      description,
      owner: req.user.userId,
      deadline,
      priority,
      tags,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.userId }).populate(
      "collaborators"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
