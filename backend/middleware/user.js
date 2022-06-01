const { isValidObjectId } = require("mongoose");
const User = require("../model/user");
const resetToken = require("../model/resetToken");
const bcrypt = require("bcryptjs");
const ResetTokenValidation = async (req, res, next) => {
  const { userId, otp } = req.body;
  console.log("token,id", otp);
  console.log("token,id", userId);
  if (!otp || !userId) {
    res.status(404).json({
      success: false,
      message: "Invalid Request.",
    });
  }
  if (!isValidObjectId(userId)) {
    res.status(404).json({
      success: false,
      message: "Invalid User.",
    });
  }

  const user = await User.findById(userId);
  console.log("user Id ", user._id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "user not found.",
    });
  }

  const ResetToken = await resetToken.findOne({ owner: user._id });
  console.log("resettoken ", ResetToken);
  if (!ResetToken) {
    res.status(404).json({
      success: false,
      message: "reset token not found.",
    });
  }

  console.log("resetToken =======>", ResetToken);
  console.log("resetToken.token =======>", ResetToken.token);
  console.log("otp =======>", otp);
  const isValid = await bcrypt.compare(otp, ResetToken.token);
  if (!isValid) {
    res.status(404).json({
      success: false,
      message: "Reset token is not valid",
    });
  }

  req.user = user;
  next();
};
module.exports = ResetTokenValidation;
