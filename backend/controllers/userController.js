const User = require("../model/user");
const ErrorHandler = require("../model/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//get all users

const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({}, "email name");
  } catch (err) {
    // const error = new ErrorHandler("fetching users failed. ", 500);
    res.status(500).json({ message: "fetching users failed." });
    // return next(error);
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// register

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  let errors = [];
  if (!name) {
    errors.push({ message: "name required.", status: 500 });
  }
  if (!password) {
    errors.push({ message: "password required.", status: 500 });
  }
  if (!email) {
    errors.push({ message: "email required.", status: 500 });
  }
  if (!emailRegex.test(email)) {
    errors.push({ message: "invalid email", status: 500 });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  let signUpUser;
  try {
    signUpUser = await User.findOne({ email });
  } catch (err) {
    res.status(500).json({ message: "user registration failed." });
    // return next(error);
  }
  if (signUpUser) {
    res.status(422).json({ message: "user exists." });
    // return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).json({ message: "could not create user.try again" });
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
  } catch (err) {
    res.status(500).json({ message: "signup failed." });
  }

  // let token;
  // try {
  //   token = jwt.sign(
  //     { userId: user.id, email: user.email },
  //     process.env.JWT_SECRET,
  //     { expires: "30d" }
  //   );
  // } catch (err) {
  //   res.status(500).json({ message: "signup failed.try again" });
  // }

  res.status(201).json({ user: user.toObject({ getters: true }) });
};

// login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  if (!password) {
    errors.push({ message: "password required.", status: 500 });
    return;
  }
  if (!email) {
    errors.push({ message: "email required.", status: 500 });
    return;
  }
  if (!emailRegex.test(email)) {
    errors.push({ message: "invalid email.", status: 500 });
    return;
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  let signInUser;
  try {
    signInUser = await User.findOne({ email: email });
  } catch (err) {
    res.status(500).json({ message: "log in failed." });
    return;
  }
  if (!signInUser) {
    res.status(401).json({ message: "invalid credentials !" });
    return;
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, signInUser.password);
  } catch (err) {
    res.status(500).json({ message: "couldn't log in. Check credentials." });
    return;
  }

  if (!isValidPassword) {
    res.status(401).json({ message: "invalid password !" });
    return;
  }

  let token;
  token = auth(signInUser.email, signInUser.id, "30d");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).json({ message: "login failed.try again" });
      return;
    }
    if (decoded) {
      return res.status(200).json({
        success: true,
        token: token,
        message: signInUser,
      });
    }
  });

  // res.json({
  //   userId: signInUser.id,
  //   email: signInUser.email,
  //   token: token,
  //   status: 200,
  // });
  // res.status(500).json({ message: "issue" });
  res.status(200).json({ user: signInUser.toObject({ getters: true }) });
};

module.exports = {
  getUsers,
  userRegister,
  userLogin,
};
