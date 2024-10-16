const express = require("express");
const app = express();
app.use(express.json());
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:6006",
    credentials: true,
  })
);

app.use(express.json());
const key = crypto.randomBytes(32).toString("base64");

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, key, {
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

app.post("/login", (req, res) => {
  console.log(req.body, "logged in from sb");
  const { email, password } = req.body;

  if (email === "user@test.com" && password === "password") {
    const accsessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });
    const csrfToken = generateCsrfToken({});

    try {
      const decoded = jwt.verify(accsessToken, key);
      console.log(decoded);
    } catch (err) {
      console.log(err);
    }

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
