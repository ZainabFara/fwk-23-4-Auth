const { SECURE, HTTP_ONLY, SAME_SITE } = require("../config.js");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const logger = require("../logger");
const { loginCounter } = require("./metrics_controller.js");
const {
  generateAccessToken,
  generateRefreshToken,
  generateCsrfToken,
} = require("../domain/auth_handler.js");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  port: 3306,
  user: "test",
  password: "test",
  database: "test",
});

exports.bearerLogin = (req, res) => {
  const { email, password } = req.body;
  logger.info(`Received email: ${email}`, { method: req.method });
  logger.info(`Received password: ${password}`);
  let role;

  if (email === "user@test.com" && password === "password") {
    role = "user";
    loginCounter.inc();
  } else if (email === "admin@admin.com" && password === "password") {
    role = "admin";
    loginCounter.inc();
  } else {
    return res.status(401).json({ message: "Login failed. Try again." });
  }

  const accessToken = generateAccessToken({ email, role });
  const refreshToken = generateRefreshToken({ email });
  const csrfToken = generateCsrfToken({});

  res.cookie("accessToken", accessToken, {
    httpOnly: HTTP_ONLY,
    secure: SECURE,
    maxAge: 15 * 60 * 1000,
    sameSite: SAME_SITE,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: HTTP_ONLY,
    secure: SECURE,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: SAME_SITE,
  });

  res.json({ csrfToken });
};

exports.basicRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    pool.query(
      "INSERT INTO users (username, email, password, uuid) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, userId],
      (err, results) => {
        if (err) {
          logger.error("Database error:", err);
          return res.status(500).json({ message: "Registration failed!" });
        }
        const accessToken = generateAccessToken({ email });
        const refreshToken = generateRefreshToken({ email });
        const csrfToken = generateCsrfToken();

        res.cookie("accessToken", accessToken);
        res.cookie("refreshToken", refreshToken);
        res.status(201).json({
          message: "User registered successfully",
          csrfToken,
        });
      }
    );
  } catch (error) {
    console.error("Error with registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.verify = async (req, res) => {};
