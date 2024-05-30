const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) res.status(401);

  const token = authHeader.split(" ")[1];
  console.log(token);

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
if (verified) {
    req.user = verified.username
    console.log(req.user);
    next()
}
};
module.exports = verifyJWT;
