const { SECURE, HTTP_ONLY, SAME_SITE } = require("../config.js");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  generateCsrfToken,
} = require("../domain/auth_handler.js");

const db = mysql.createConnection({
  host: "test-mysql",
  port: 3306,
  user: "test",
  password: "test",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database!", err);
    return;
  }
  console.log("Connected to database");
});

exports.bearerLogin = (req, res) => {
  const { email, password } = req.body;
  console.log("Received email:", email);
  console.log("Received password:", password);
  let role;

  if (email === "user@test.com" && password === "password") {
    role = "user";
  } else if (email === "admin@admin.com" && password === "password") {
    role = "admin";
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
    db.query(
      "INSERT INTO users (username, email, password, uuid) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, userId],
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
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
