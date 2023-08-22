const express = require("express");
const { userRouter } = require("./Routes/user");
const { transactionRouter } = require("./Routes/transaction");
const connect_database = require("./utils/connect_database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

connect_database();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
