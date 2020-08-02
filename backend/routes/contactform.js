const express = require('express');
const router = express.Router();

// controllers
const contactFormController = require('../controllers/contactform');

// validators
const { runValidation } = require('../validators/index');
const { contactFormValidator } = require('../validators/contactform');

// endpoints
router.post(
    '/contact',
    contactFormValidator,
    runValidation,
    contactFormController.contactForm
);
router.post(
    '/contact/contact-blog-author',
    contactFormValidator,
    runValidation,
    contactFormController.contactBlogAuthor
);

module.exports = router;