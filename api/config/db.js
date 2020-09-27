const mongoose = require('mongoose');
const db = process.env.DATABASE;

const connectMongo = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected!');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectMongo;