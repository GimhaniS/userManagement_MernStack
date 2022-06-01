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
    expiresIn: 86400,
    default: Date.now(),
  },
});

module.exports = mongoose.model("verificationToken", verificationTokenSchema);
