const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { AUTH, AUTH_TYPES } = require("./config");
const helmet = require("helmet");
const { handleHealthCheck } = require("@kunalnagarco/healthie");

app.use(handleHealthCheck());

app.use(
  helmet({
    hidePoweredBy: true, //Döljer teknologin vi använder i vår app
    frameguard: { ation: "deny" }, // skydd mot clickjacking-attacker
    referrerPolicy: { policy: "no-referrer" }, // Förhindrar att referensinformation skickas för att skydda användarens integritet
  })
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // tillåter bara resurser från samma domän
      stylesSrc: ["'self'"], // tillåter CSS från samma domän
      fontSrc: ["'self'", "https://fonts.google.com/"], // tillåter typsnitt från Google Fonts
      iconSrc: ["'self'", "https://www.jensenyh.se/favicon.ico"], //tillåter favicon från skolans hemsida
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:6006",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.get("/health");

app.use("/api/auth", require("./auth_routes/routes.js"));

module.exports = app;
