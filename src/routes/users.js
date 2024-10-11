const bcrypt = require("bcrypt");
const users = [
    { id: 1, email: 'user@example.com', password: bcrypt.hashSync('password', 10), role: 'user' }
];

module.exports = users;
