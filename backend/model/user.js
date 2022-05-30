const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
    // minlength:8
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
