const mongoose = require('mongoose');

function connect() {
    mongoose
        .connect('mongodb://127.0.0.1:27017/k_education_dev')
        .then(() => console.log('connect success!!!!!!'))
        .catch((error) => console.log('connect failure!!!'));
}

module.exports = { connect };
