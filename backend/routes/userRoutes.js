const express = require("express");
const router = express.Router();

const {
  getUsers,
  userRegister,
  userLogin,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/register", userRegister);

router.post("/login", userLogin);

module.exports = router;
