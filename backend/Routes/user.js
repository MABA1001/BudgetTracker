const userRouter = require("express").Router();

userRouter.post("/login");
userRouter.post("/signup");

module.exports = {userRouter};
