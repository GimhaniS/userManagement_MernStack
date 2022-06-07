const User = require("../model/user");
const Todo = require("../model/todo");
const verificationToken = require("../model/verificationToken");
const resetToken = require("../model/resetToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const generatedOtp = require("../utils/mail");
const createRandomBytes = require("../utils/helper");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");

const getAllToDos = async (req, res) => {
  const user_Id = req.user;
  const headers = req.headers;
  console.log("user req==================>", user_Id);
  const tasks = await Todo.find({ userId: user_Id });
  if (!tasks) {
    res.status(500).json({ message: "fetching tasks failed." });
  }

  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const { userId, taskName, taskDescription } = req.body;
  let errors = [];
  const userN = await User.findById(userId);
  if (!userN && userN.verified) {
    res.status(404).json({ success: false, message: "userNot Found!" });
  }

  if (!taskName) {
    errors.push({ message: "task required.", status: 500 });
  }

  const isExists = await Todo.findOne({ taskName: taskName, owner: userN._id });
  if (isExists) {
    errors.push({ message: "task already exists.", status: 500 });
  }

  const newTask = new Todo({
    taskName,
    taskDescription,
    owner: userN._id,
  });

  try {
    const savedtask = newTask.save();
  } catch (err) {
    res.status(500).json({ success: false, message: "task creating failed" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  res.json({
    success: true,
    message: "task added",
    task: newTask,
  });
};

const deleteTask = async (req, res) => {
  let errors = [];
  const taskToDelete = await Todo.findByIdAndDelete(req.params.id);
  if (!taskToDelete) {
    errors.push({ message: "task not found!", status: 500 });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  res
    .status(500)
    .json({ success: true, message: "task deleted", task: taskToDelete });
};

const updateTask = async (req, res) => {
  let errors = [];
  const taskTpUpdate = await Todo.findByIdAndUpdate(req.params.id, req.body);
  if (!taskTpUpdate) {
    errors.push({ message: "task not found!", status: 500 });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  res
    .status(500)
    .json({ success: true, message: "task updated", task: taskTpUpdate });
};
module.exports = {
  getAllToDos,
  createTask,
  deleteTask,
  updateTask,
};
