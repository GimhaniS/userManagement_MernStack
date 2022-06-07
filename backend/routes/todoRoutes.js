const express = require("express");
const router = express.Router();

const {
  getAllToDos,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/todoController");

router.get("/getAllTasks", getAllToDos);

router.post("/createTask", createTask);
router.delete("/deleteTask/:id", deleteTask);
router.put("/updateTask/:id", updateTask);

module.exports = router;
