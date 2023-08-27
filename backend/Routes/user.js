const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../Controllers/userController");
const userRouter = require("express").Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);
userRouter.get("/", getUserDetails);
module.exports = { userRouter };
