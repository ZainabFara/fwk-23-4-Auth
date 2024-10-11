const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth_routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
module.exports = app;