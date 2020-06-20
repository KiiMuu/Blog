const express = require('express');

// controllers
const blogController = require('../controllers/blog');
const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/blog',
    authController.requireSignIn, 
    authController.adminMiddleware, 
    blogController.createBlog
);

module.exports = router;