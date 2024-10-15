const express = require("express");
const app = express();
app.use(express.json());
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
key = crypto.randomBytes(32).toString("base64");

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, password: user.password }, key, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, password: user.password }, key, {
    expiresIn: "7d",
  });
};

const generateCsrfToken = (user) => {
  return crypto.randomBytes(32).toString("hex");
};

const token = jwt.sign(
  {
    email: "user@test.com",
    password: "password",
  },
  key
);
console.log(token);

try {
  const decoded = jwt.verify(token, key);
  console.log(decoded);
} catch (err) {
  console.log(err);
}

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body; // Anta att du får email och password från frontend

  if (email === "user@test.com" && password === "password") {
    const accsessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });
    const csrfToken = generateCsrfToken({});

    res.cookie("accessToken", accsessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.json({ csrfToken });
  } else {
    res.status(401).json({ message: "Login failed. Try again." });
  }
});
module.exports = app;
