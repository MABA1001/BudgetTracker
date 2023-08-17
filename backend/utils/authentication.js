const jwt = require("jsonwebtoken");

const getPayload = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    let jwtToken = req.headers.authorization.split(" ")[1];
    let payload = jwt.verify(jwtToken, process.env.SECRET_TOKEN_KEY);
    return payload;
  }
  return null;
};

module.exports = { getPayload };
