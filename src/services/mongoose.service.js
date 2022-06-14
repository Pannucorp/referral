const mongoose = require('mongoose');

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
};

mongoose
    .connect('mongodb://localhost:27017/Referral', mongooseOptions)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;