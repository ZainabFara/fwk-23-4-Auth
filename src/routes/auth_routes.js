const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (isValidUser(email, password)) {
        const token = jwt.sign(
            { email, role: getUserRole(email) },
            'secretKey',
            { expiresIn: '1h' }
        );
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid login' });
    }
});

module.exports = router;
