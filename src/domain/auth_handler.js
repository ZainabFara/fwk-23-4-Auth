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

//skapa en statisk JWT
/*
const token = jwt.sign(
  {
    email: "user@test.com",
    password: "password",
  },
  key
);
console.log(token);*/

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateCsrfToken,
};
