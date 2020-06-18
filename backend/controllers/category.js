const Category = require('../models/category');
const slugify = require('slugify'); // new category => new-category
const { errorHandler } = require('../helpers/dbErrorHandler');
const category = require('../models/category');

exports.createCategory = (req, res, next) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let category = new Category({
        name,
        slug
    });

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
}

exports.categoriesList = (req, res, next) => {
    Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
}

exports.readCategory = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Category.findOne({ slug }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(category);
    });
}

exports.removeCategory = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Category.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: 'Category deleted successfully'
        });
    });
}