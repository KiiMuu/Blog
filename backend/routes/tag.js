const express = require('express');
const router = express.Router();

// controllers
const tagController = require('../controllers/tag');
const authController = require('../controllers/auth');

// validators
const { runValidation } = require('../validators/index');
const { tagValidator } = require('../validators/tag');

// endpoints
router.post(
    '/tag', 
    runValidation,
    tagValidator,
    authController.requireSignIn, 
    authController.adminMiddleware,
    tagController.createTag
);
router.get('/tags', tagController.tagsList);
router.get('/tag/:slug', tagController.readTag);
router.delete(
    '/tag/:slug', 
    authController.requireSignIn, 
    authController.adminMiddleware,
    tagController.removeTag
);

module.exports = router;