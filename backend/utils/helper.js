const crypto = require("crypto-js");

//creating random token
const createRandomBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);

      const token = buff.toString("hex");
      resolve(token);
      console.log("random Bytes", token);
    });
  });

module.exports = {
  createRandomBytes,
};
