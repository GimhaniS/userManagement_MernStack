const express = require("express");
const router = express.Router();

const {
  getUsers,
  userRegister,
  userLogin,
  verifyEmail,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/verifyEmail", verifyEmail);

module.exports = router;
