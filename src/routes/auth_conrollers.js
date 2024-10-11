const { JWT_SECRET_KEY } = require('../config');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const users = require('../auth/users');

exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    })(req, res, next);
};

exports.register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: users.length + 1, email, password: hashedPassword, role: 'user' };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
};

exports.get_all_users = (req, res) => {
    const userList = users.map(user => {
        return { id: user.id, email: user.email };
    });
    res.json(userList);
};

exports.current_user = (req, res) => {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password, ...restOfUser } = user;
    res.json(restOfUser);
};

exports.renew_token = (req, res) => {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const newToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token: newToken });
};

exports.verify_token = (req, res) => {
    const token = req.body.token;

    if (!token) return res.status(400).send({ message: 'Token is required' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        res.json({ user: decoded });
    } catch (error) {
        res.status(401).send({ message: 'Invalid Token' });
    }
};
