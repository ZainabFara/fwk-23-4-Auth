const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { AUTH_TYPES } = require("./config");

const authRouter = {
  [AUTH_TYPES.BEARER]: require('./auth_routes/routes'),
}

app.use(
  cors({
    origin: "http://localhost:6006",
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRouter);

module.exports = app;
