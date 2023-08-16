const express = require("express");
const { userRouter } = require("./Routes/user");
const { transactionRouter } = require("./Routes/transaction");
const connect_database = require("./utils/connect_database");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

connect_database();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
