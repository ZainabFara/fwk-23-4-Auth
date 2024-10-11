require('dotenv').config();
const PORT = process.env.PORT || 3001
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "YourJWTSecretKey"

module.exports = {
    PORT,
    JWT_SECRET_KEY
};
