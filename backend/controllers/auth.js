exports.signup = (req, res, next) => {
    const { name, email, password } = req.body;

    res.json({
        user: {
            name,
            email,
            password
        }
    });
}