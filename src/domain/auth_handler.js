const crypto = require("crypto");
const key = crypto.randomBytes(32).toString("base64");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, role: user.role }, key, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, key, {
    expiresIn: "7d",
  });
};

const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateCsrfToken,
};
