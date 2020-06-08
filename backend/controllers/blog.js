exports.time = (req, res, next) => {
    res.json({ time: Date().toString() });
}