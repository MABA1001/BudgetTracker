const { getPayload } = require("./../utils/authentication");

const authUser = (req, res, next) => {
  // Check if req.body.user exists, create it if it doesn't
  let payload = null;

  try {
    payload = getPayload(req);
  } catch (error) {
    res.status(401).send({ status: "Unauthenticated", message: error.message });
  }

  if (payload) {
    req.user = { id: payload.user_id };
  } else {
    res
      .status(401)
      .send({ status: "Unauthenticated", message: "You are not verfied user" });
  }
  next();
};

module.exports = { authUser };
