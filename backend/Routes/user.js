const { registerUser, loginUser } = require("../Controllers/userController");
const { authUser } = require("./../Middleware/authUser");
const userRouter = require("express").Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);
userRouter.get("/test", authUser, (req, res, next) => {
  res.send(req.user);
});
userRouter.post("/logout");

module.exports = { userRouter };
