const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var toDoSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  // userId: {
  //   type: String,
  //   required: true,
  //   // unique: true,
  // },
});

module.exports = mongoose.model("todo", toDoSchema);
