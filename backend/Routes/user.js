const { registerUser, loginUser } = require("../Controllers/userController");
const userRouter = require("express").Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);

module.exports = { userRouter };
