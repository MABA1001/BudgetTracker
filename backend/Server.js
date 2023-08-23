const express = require("express");
const { userRouter } = require("./Routes/user");
const { transactionRouter } = require("./Routes/transaction");
const connect_database = require("./utils/connect_database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Use the cors middleware for handling CORS headers
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "GET, POST, PUT, DELETE", // Allow specified HTTP methods
    credentials: true, // Enable sending cookies in cross-origin requests
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

connect_database();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
