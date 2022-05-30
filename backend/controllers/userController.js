const User = require("../model/user");
const verificationToken = require("../model/verificationToken");
const ErrorHandler = require("../model/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const generatedOtp = require("../utils/mail");

// const mailTransport = require("../utils/mail");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
// const emailTemplate = require("../utils/mail");
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
    res
      .status(500)
      .json({ success: false, message: "user registration failed." });
    // return next(error);
  }
  if (signUpUser) {
    res.status(422).json({ success: false, message: "user exists." });
    // return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "could not create user.try again" });
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  //generating otp
  const OTP = generatedOtp();

  //hashing verification token

  let hashedOtp;

  try {
    hashedOtp = await bcrypt.hash(OTP, 8);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not create verification token .try again",
    });
  }

  const verfication_token = new verificationToken({
    owner: user._id,
    token: hashedOtp,
  });

  var mailTransport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    // service: "Gmail",
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  mailTransport.sendMail({
    from: "g.kasuni.samarasingh@gmail.com",
    to: user.email,
    subject: "Verify your email account",
    html: `<p> Welcome to the team! your otp is <b>${OTP}</b></p>`,
  });

  try {
    const savedUser = await user.save();
    const verficationToken = await verfication_token.save();
  } catch (err) {
    res.status(500).json({ success: false, message: "signup failed." });
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

  res
    .status(201)
    .json({ success: true, user: user.toObject({ getters: true }) });
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
    res
      .status(500)
      .json({ message: "couldn't log in. Credientials are not matched." });
    return;
  }

  if (!isValidPassword) {
    res.status(401).json({ message: "invalid password !" });
    return;
  }

  let token;
  token = auth(signInUser.email, signInUser._id, "30d");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).json({ message: "login failed.try again" });
      return;
    }
    if (decoded) {
      return res.status(200).json({
        success: true,
        token: token,
        user: signInUser,
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

const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    res
      .status(422)
      .json({ success: false, message: "Invalid request,missing paramters" });
  }
  if (!isValidObjectId) {
    res.status(422).json({ success: false, message: "Invalid user id" });
  }
  const userN = await User.findById(userId);
  if (!userN) {
    res.status(404).json({ success: false, message: "userNot Found!" });
  }
  if (userN.verified) {
    res
      .status(422)
      .json({ success: false, message: "user is already verified!" });
  }
  const token = await verificationToken.findOne({ owner: userN._id });
  if (!token) {
    res.status(404).json({ success: false, message: "user not found" });
  }

  const result = await bcrypt.compare(token, otp);
  if (!result) {
    res
      .status(404)
      .json({ success: false, message: "Please provide a valid otp" });
  }

  userN.verified = true;

  await verificationToken.findByIdAndDelete(token._id);
  await userN.save();

  mailTransport.sendMail({
    from: "g.kasuni.samarasingh@gmail.com",
    to: userN.email,
    subject: "Verify your email account",
    html: `<p> Email Verified Successfully.</p>`,
  });
};

module.exports = {
  getUsers,
  userRegister,
  userLogin,
  verifyEmail,
};
