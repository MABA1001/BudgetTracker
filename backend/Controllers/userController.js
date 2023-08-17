const Users = require("./../Models/userModel");

const registerUser = async (req, res) => {
  try {
    let newUser = await Users.create(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

module.exports = { registerUser };
