const { registerUser, loginUser } = require("../Controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);
userRouter.post("/logout");

module.exports = { userRouter };
