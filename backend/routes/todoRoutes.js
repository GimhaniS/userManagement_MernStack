const express = require("express");
const router = express.Router();

const {
  getAllToDos,
  createTask,
  deleteTask,
  updateTask,
  getAllTodosByUserId,
  getDataByTaskId,
} = require("../controllers/todoController");

router.get("/getAllTasks", getAllToDos);
router.get("/getAllTodosByUserId/:id", getAllTodosByUserId);
router.get("/getDataByTaskId/:id", getDataByTaskId);

router.post("/createTask", createTask);
router.delete("/deleteTask/:id", deleteTask);
router.put("/updateTask/:id", updateTask);

module.exports = router;
