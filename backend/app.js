const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const auth = require("../backend/middleware/auth");
const app = express();
const cors = require("cors");
// const port = 5000;

const port = process.env.PORT || 5000;

connectDB();
app.use(bodyParser.json());

app.use(cors());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/todoRoutes"));
// app.use(auth);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
