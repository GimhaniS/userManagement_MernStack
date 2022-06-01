const express = require("express");
const router = express.Router();

const {
  getUsers,
  userRegister,
  userLogin,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const ResetTokenValidation = require("../middleware/user");

router.get("/", getUsers);

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/verifyEmail", verifyEmail);

router.post("/forgotPassword", forgotPassword);

router.post("/reset-password", ResetTokenValidation, resetPassword);

module.exports = router;
