const Users = require("./../Models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);

    const token = jwt.sign(
      { user_id: user.id, email: req.body.email }, // Use req.body.email here
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(token);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send("Email Address is already in use.");
    }
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await Users.findOne({ email });

    if (password === user?.password) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json(token);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser };
