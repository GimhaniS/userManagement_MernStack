const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: "3h",
    default: Date.now(),
  },
});

module.exports = mongoose.model("verificationToken", verificationTokenSchema);
