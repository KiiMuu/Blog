const Tag = require('../models/tag');
const slugify = require('slugify'); // new category => new-category
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createTag = (req, res, next) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let tag = new Tag({
        name,
        slug
    });

    tag.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
}

exports.tagsList = (req, res, next) => {
    Tag.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
}

exports.readTag = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Tag.findOne({ slug }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(tag);
    });
}

exports.removeTag = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Tag.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: 'Tag deleted successfully'
        });
    });
}