const router = require("express").Router();
const authController = require("../controllers/auth_controller");
const promClient = require("prom-client");

// Skapa en räknare för inloggningar
const loginCounter = new promClient.Counter({
  name: "user_login_total",
  help: "Total number of user logins",
});

// Registrera standardmetrics (om du inte redan har gjort det)
promClient.collectDefaultMetrics();

router.post("/login", (req, res, next) => {
  loginCounter.inc();
  authController.bearerLogin(req, res, next);
});

router.post("/register", authController.basicRegister);

module.exports = router;
