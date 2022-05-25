const jwt = require("jsonwebtoken");
// const auth = (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token) return;
//     res.status(401).json({ message: "No token, access denied" });
//     const verified = jwt.verify(token, process.env.JWT_SECRET, {
//       expires: "30d",
//     });
//     req.user = { userId: verified.userId };
//   } catch (err) {
//     res.status(401).json({ message: "token verification failed. " });
//   }
// };
// module.exports = auth;

const auth = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: duration,
  });
};
module.exports = auth;
