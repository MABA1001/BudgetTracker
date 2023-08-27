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
      return res.status(200).json(token);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const getUserDetails = async (req, res) => {
  try {
    // Get the user's ID from the token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.user_id;

    // Find the user by ID and select specific fields
    const user = await Users.findById(userId).select(
      "firstName email budgetLimit"
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Return user details
    res.status(200).json({
      firstName: user.firstName,
      email: user.email,
      budgetLimit: user.budgetLimit,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
