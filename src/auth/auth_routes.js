const express = require('express');
const { check } = require('express-validator');
const authController = require('../controller/auth_controllers');

const router = express.Router();

//Samtyckehantering 
const consentData = {};

function saveConsent(userId, consentGiven) {
    const consentInfo = {
        consent_given: consentGiven,
        consent_date: consentGiven ? new Date().toISOString() : null,
        consent_version: "v1.0"
    };
    consentData[userId] = consentInfo;
    return consentInfo;
}

function getConsent(userId) {
    return consentData[userId] || { consent_given: false };
}

const checkConsent = (req, res, next) => {
    const userId = req.user ? req.user.userId : 'defaultUser';
    const consentStatus = getConsent(userId);

    if (!consentStatus.consent_given) {
        return res.status(403).json({ message: "Samtycke krävs för att fortsätta." });
    }
    next();
};

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

router.get('/consent/status', (req, res) => {
    const userId = req.user ? req.user.userId : 'defaultUser';
    const consentStatus = getConsent(userId);
    res.json(consentStatus);
});

router.post('/consent/update', (req, res) => {
    const userId = req.user ? req.user.userId : 'defaultUser';
    const { consentGiven } = req.body;
    const updatedConsent = saveConsent(userId, consentGiven);
    res.json({
        message: consentGiven ? "Samtycke sparat" : "Samtycke tillbakadraget",
        consent: updatedConsent
    });
});

module.exports = router;
