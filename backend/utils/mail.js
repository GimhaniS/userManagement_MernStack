const nodemailer = require("nodemailer");
const generatedOtp = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const val = Math.round(Math.random() * 9);
    otp = otp + val;
  }
  return otp;
};

module.exports = generatedOtp;

// const mailTransport = () => {};
// module.exports = mailTransport;

const emailTemplate = (otp) => {
  return `
  <!DOCTYPE html>
<html lang='en'>
<head>

  <meta  charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content ="IE=edge">
 <style>
  
      @media only screen and (max-width: 620px) {
  h1{
    font-size:20px;
    padding:5px;
  }

}
</style>
</head>

<body >
  
<div style="max-width:620px; margin:0 auto; font-family:sans-serif; color#272727">
<h1 style="background:#f6f6f6; padding:10px;text-align:center; color:#272727;">
You are so welcome to the team!</h1>
<p> Please verify your email to continue. Your one time password is :</p>
<p style :"width:80px;margin"0 auto; font=weight:bold;text-align:center;background:#f6f6f6; border-radius:5px;font-size:25px:">${otp}</p>
 
</div>
</body>

</html>
  `;
};

// module.exports = emailTemplate;
