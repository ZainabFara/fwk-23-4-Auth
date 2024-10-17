const {SECURE, HTTP_ONLY, SAME_SITE } = require('../config.js');
const { generateAccessToken, generateRefreshToken, generateCsrfToken } = require('../domain/auth_handler.js ');

exports.basicLogin = (req, res) => {
    res.status(200).send("Basic Login!");
};

exports.bearerLogin = (req, res) => {
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
};