const express = require('express');
const app = express();
app.use(express.json());

app.use("/api/auth", require('./auth_routes/routes.js'));

module.exports = app;