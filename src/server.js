const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth_routes');
require('./auth/passport_config.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


app.use('/auth', authRoutes);

module.exports = app;
