const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { email, name, password } = body;
  if (!name) {
    res.status(500).json({ message: "name required." });
  }
  if (!password) {
    res.status(500).json({ message: "password required." });
  }
  if (!email) {
    res.status(500).json({ message: "email required." });
  }
  if (!emailRegex.test(email)) {
    res.status(500).json({ message: "Invalid email" });
  } else {
    res
      .status(500)
      .json({ success: false, message: "user registration failed." });
  }

  const { user_pool_id } = process.env;
  const params = {
    UserPoolId: user_pool_id,
    Username: name,
    UserAttributes: [
      {
        Name: "name",
        Value: name,
      },
      {
        Name: "email",
        Value: email,
      },
    ],
    MessageAction: "SUPPRESS",
  };

  const response = await cognito.adminCreateUser(params).promise();
  console.log("RES===>", response);

  if (response.User) {
    const passwordParams = {
      Password: password,
      UserPoolId: user_pool_id,
      Username: name,
      Permanent: true,
    };
    const res = await cognito.adminSetUserPassword(passwordParams).promise();
    console.log("RES====>", res);
  }
  res.status(200).json({ message: "user registeration completed" });
};
