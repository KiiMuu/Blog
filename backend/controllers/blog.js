const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { result } = require('lodash');

exports.createBlog = (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }

        const { title, body, categories, tags } = fields;

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'Title is required'
            });
        }

        if (!body || body.length < 200) {
            return res.status(400).json({
                error: 'Content is too short'
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            });
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }

        const blog = new Blog({
            title,
            body,
            slug: slugify(title).toLowerCase(),
            mtitle: `${title} | ${process.env.APP_NAME}`,
            mdesc: stripHtml(body.substring(0, 160)),
            postedBy: req.user._id
        });

        // categories and tags
        let arrOfCategories = categories && categories.split(',');
        let arrOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1MB in size'
                });
            }

            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        blog.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            // res.json(result);
            Blog.findByIdAndUpdate(result._id, 
                { $push: {
                    categories: arrOfCategories
                }}, 
                { new: true }).exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } else {
                        Blog.findByIdAndUpdate(result._id, 
                            { $push: {
                                tags: arrOfTags
                            }}, { new: true }).exec((err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: errorHandler(err)
                                    });
                                } else {
                                    res.json(result);
                                }
                            });
                    }
                });
        });
    });
}