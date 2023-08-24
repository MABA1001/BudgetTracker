const { getPayload } = require("./../utils/authentication");

const authUser = (req, res, next) => {
  // Check if req.body.user exists, create it if it doesn't
  let payload = null;
  console.log(req.headers);
  try {
    payload = getPayload(req);
  } catch (error) {
    return res
      .status(401)
      .send({ status: "Unauthenticated", message: error.message });
  }

  if (payload) {
    req.user = { id: payload.user_id };
  } else {
    return res
      .status(401)
      .send({ status: "Unauthenticated", message: "You are not verfied user" });
  }
  next();
};

module.exports = { authUser };
