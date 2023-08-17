const { registerUser } = require("../Controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/login");
userRouter.post("/signup", registerUser);
userRouter.post("/logout");

module.exports = { userRouter };
