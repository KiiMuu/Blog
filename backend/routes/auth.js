const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/auth');

// validators
const { runValidation } = require('../validators/index');
const { userSignUpValidator, userSignInValidator } = require('../validators/auth');

// endpoints
router.post(
    '/signup', 
    userSignUpValidator,
    runValidation, 
    authController.signup
);
router.post(
    '/signin', 
    userSignInValidator,
    runValidation, 
    authController.signin
);
router.get(
    '/signout',
    authController.signout
);

// test route
router.get('/secret', authController.requireSignIn, (req, res) => {
    res.json({
        message: 'You have access to secret page'
    });
});

module.exports = router;