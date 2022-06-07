const User = require("../model/user");
const verificationToken = require("../model/verificationToken");
const resetToken = require("../model/resetToken");
// const ErrorHandler = require("../model/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const generatedOtp = require("../utils/mail");
const createRandomBytes = require("../utils/helper");
// const mailTransport = require("../utils/mail");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
const user = require("../model/user");
// const emailTemplate = require("../utils/mail");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//get all users
///////////////////////////////////
const getUsers = async (req, res) => {
  console.log("req.user====>", req.user);
  let users;
  try {
    users = await User.findById(req.user);
  } catch (err) {
    // const error = new ErrorHandler("fetching users failed. ", 500);
    res.status(500).json({ message: "fetching users failed." });
    // return next(error);
  }
  res.json({
    success: true,
    message: "get alll users",
    user: users,
  });
};

// register
////////////////////////////////////////////////////
const userRegister = async (req, res) => {
  //requesting name,email,password from the body(user input)
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
    // req.user = user._id.str;
    // console.log("req===>", req.user);
  } catch (err) {
    res.status(500).json({ success: false, message: "signup failed." });
  }

  // res
  //   .status(201)
  //   .json({ success: true, user: user.toObject({ getters: true }) });

  res.json({
    success: true,
    message: "signUp successfully. check otp",
    user: user,
    token: verfication_token.token,
  });
};

// ///login

////////////////////////////////////////
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("password", password);
  let errors = [];
  // const tokenn = req.header("x-auth-token");
  // console.log("tokenn====", tokenn);
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
    signInUser = await User.findOne({ email });
  } catch (err) {
    res.status(500).json({ message: "log in failed." });
    return;
  }
  if (!signInUser) {
    res.status(401).json({ message: "invalid credentials !" });
    return;
  }
  console.log("new password", signInUser.password);
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, signInUser.password);
    console.log("isvalid", isValidPassword);
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
  token = jwt.sign(
    { email: signInUser.email, UserId: signInUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).json({ message: "login failed.try again" });
      return;
    }
    if (decoded) {
      // signInUser.token
      return res.status(200).json({
        success: true,
        message: "signin successfully.welcome",
        token: token,
        user: signInUser,
      });
    }
  });
};

// /////////////verfication email
////////////////////////////////////////////
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
  console.log("token", token);
  console.log("token.token", token.token);
  console.log("otp", otp);
  if (!token) {
    res.status(404).json({ success: false, message: "user not found" });
  }

  const result = await bcrypt.compare(otp, token.token);
  if (!result) {
    res
      .status(404)
      .json({ success: false, message: "Please provide a valid otp" });
  }

  userN.verified = true;
  req.user = userN._id;
  console.log("req.user", req.user);

  await verificationToken.findByIdAndDelete(token._id);
  await userN.save();

  //sending email
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
    to: userN.email,
    subject: "Welcome email",
    html: `<p> Email Verified Successfully.</p>`,
  });

  // res.json({
  //   success: true,
  //   message: "your email is verified",
  //   user: { username: userN.name, email: userN.email, id: userN.id },
  // });

  res.json({
    success: true,
    message: "your email is verified",
    user: userN,
  });
};

// forgot password
/////////////////////////////
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //email null validation
  if (!email) {
    res
      .status(404)
      .json({ success: false, message: "Please provide a valid email" });
  }
  //user null validation for requested email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ success: false, message: "userNot Found!" });
  }

  // creating random bytes
  // const randomBytes = await createRandomBytes();
  const randomBytes = await generatedOtp();

  // console.log("random byte", randomBytes);

  //hashing created random token
  let hashedRandomBytesOTP;
  try {
    hashedRandomBytesOTP = await bcrypt.hash(randomBytes, 8);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not create reset token .try again",
    });
  }

  const token = await resetToken.findOne({ owner: user._id });

  console.log("token", token);
  console.log("user._id from other s", user._id);

  if (token) {
    res.status(404).json({
      success: false,
      message: "new otp can't send. try again in 1hr",
    });
  }

  // console.log("random byte", randomBytes);
  const reset_token = new resetToken({
    owner: user._id,
    token: hashedRandomBytesOTP,
  });

  // console.log("reset_token", reset_token);
  // console.log("hashed random byte", hashedRandomBytesOTP);
  // console.log("reset_token", reset_token);

  //saving in DB
  await reset_token.save();

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
    from: "security@gmail.com",
    to: user.email,
    subject: "Password Reset",
    html: `<p> Reset the password! your otp is <b>${randomBytes}</b></p>`,
  });
  res.json({
    success: true,
    message: "password reset otp sent to the email",
    user: user,
  });
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  console.log("password req.body===>", password);

  const user = await User.findById(req.user._id);
  // console.log("user===>", user);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  console.log("user.password===>", user.password);
  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    res.status(404).json({
      success: false,
      message: "New password should be different ",
    });
  }
  // if(password.trim().length<8 || password.trim().lenght>20)
  // res.status(404).json({
  //   success: false,
  //   message: "Password must be 8 to 20 characters long!",
  // });

  //resetting thepassword in stored in db

  let hashednewPassword;
  try {
    hashednewPassword = await bcrypt.hash(password, 8);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not create reset token .try again",
    });
  }
  console.log(" hashed passowrd ===>", hashednewPassword);

  user.password = hashednewPassword;
  console.log("user===>", user.password);

  await user.save();
  //removing token
  await resetToken.findOneAndDelete({ owner: user._id });
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
    from: "security@gmail.com",
    to: user.email,
    subject: "Password Reset successfully",
    html: `<p>Password Reset successfully.Use your new password ofr logging</b></p>`,
  });
  res.json({
    success: true,
    message: "password reset otp sent to the email",
    user: user,
  });
};

module.exports = {
  getUsers,
  userRegister,
  userLogin,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
