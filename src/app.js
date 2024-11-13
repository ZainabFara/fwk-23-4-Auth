const express = require("express");
const app = express();
const cors = require("cors");
const { AUTH, AUTH_TYPES } = require("./config");
const helmet = require("helmet");
const promClient = require("prom-client");
const { handleHealthCheck } = require("@kunalnagarco/healthie");
const morgan = require("morgan");

app.use(express.json());
app.use(handleHealthCheck());
app.use(helmet.hidePoweredBy()); // Döljer teknologin vi använder
app.use(helmet.frameguard({ action: "deny" })); // Skydd mot clickjacking-attacker
app.use(helmet.referrerPolicy({ policy: "no-referrer" })); // Förhindrar att referensinformation skickas för att skydda användarens integritet
app.use(helmet.dnsPrefetchControl({ allow: false })); // Stänger av DNS-prefetching
app.use(
  helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true })
); // Tvingar användning av HTTPS
app.use(helmet.noSniff()); // Förhindrar MIME-sniffing
app.use(helmet.xssFilter()); // Skydd mot XSS-attacker

// Ställer in Content Security Policy separat
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Tillåter bara resurser från samma domän
      styleSrc: ["'self'"], // Tillåter CSS från samma domän
      fontSrc: ["'self'", "https://fonts.google.com/"], // Tillåter typsnitt från Google Fonts
      imgSrc: ["'self'", "https://www.jensenyh.se/favicon.ico"], // Tillåter favicon från skolans hemsida
    },
  })
);

// Konfigurera CORS för lokal utveckling
app.use(
  cors({
    origin: "http://localhost:6006",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

//app.get("/health");

app.use("/api/auth", require("./auth_routes/routes.js"));

//Konfig Morgan att använda Winston
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Registrera Prometheus-klienten
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Skapa en "metrics" endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

module.exports = app;
