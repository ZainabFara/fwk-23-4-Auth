const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { AUTH, AUTH_TYPES } = require("./config");

app.use(
    cors({
        origin: "http://localhost:6006",
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/auth", require("./auth_routes/routes.js"));

module.exports = app;
