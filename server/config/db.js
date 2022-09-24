const mongoose = require('mongoose');

const connectDB = async() => {
    // TODO: use env
    await mongoose.connect("mongodb://localhost:27017/users", {
        // useFindAndModify: true,
        // considered false?
    });

    console.log("mongo connected");
};

module.exports = connectDB;
