const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(email) {
  return jwt.sign({ email:email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 60,
  });
}
function generateRefreshToken(email) {
  return jwt.sign({ email:email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
