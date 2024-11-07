const router = require("express").Router();
const { handleHealthCheck } = require("@kunalnagarco/healthie");
const authController = require("../controllers/auth_controller");

router.post("/login", authController.bearerLogin);

router.post("/register", authController.basicRegister);

module.exports = router;
