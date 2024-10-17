const router = require('express').Router();
const authController = require('../controllers/auth_controller');

router.post("/login", authController.bearerLogin);

router.post("/register", (req, res) => {
  req.headers;
  res.json({ status: "you are registered!" });
});

module.exports = router;
