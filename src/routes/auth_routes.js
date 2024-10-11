const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth_controller');

const router = express.Router();

router.post('/login',
    [
        check('email').isEmail().withMessage('Enter a valid email address'),
        check('password').notEmpty().withMessage('Password cannot be empty')
    ],
    authController.login
);

router.post('/register',
    [
        check('email').isEmail().withMessage('Enter a valid email address'),
        check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
    ],
    authController.register
);

router.get('/users', authController.get_all_users);

router.get('/current-user', authController.current_user);

router.post('/renew-token', authController.renew_token);

router.post('/verify-token', authController.verify_token);

module.exports = router;
