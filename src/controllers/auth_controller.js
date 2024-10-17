const {SECURE, HTTP_ONLY, SAME_SITE } = require('../config.js');
const { generateAccessToken, generateRefreshToken, generateCsrfToken } = require('../domain/auth_handler.js');

exports.basicLogin = (req, res) => {
    res.status(200).send("Basic Login!");
};

exports.bearerLogin = (req, res) => {
    console.log(req.body, "logged in from sb");
    const { email, password } = req.body;
  
    if (email === "user@test.com" && password === "password") {
      const accessToken = generateAccessToken({ email });
      const refreshToken = generateRefreshToken({ email });
      const csrfToken = generateCsrfToken({});
  
      try {
        const decoded = jwt.verify(accessToken, key);
        console.log(decoded);
      } catch (err) {
        console.log(err);
      }
  
      res.cookie("accessToken", accessToken, {
        httpOnly: HTTP_ONLY,
        secure: SECURE,
        maxAge: 15 * 60 * 1000,
        sameSite: SAME_SITE
      });
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: HTTP_ONLY,
        secure: SECURE,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: SAME_SITE
      });
  
      res.json({ csrfToken });
    } else {
      res.status(401).json({ message: "Login failed. Try again." });
    }
};