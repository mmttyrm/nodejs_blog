const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/k_education_dev');
        console.log('connect success!!!!!!');
    } catch (error) {
        console.log('connect failure!!!');
    }
}

module.exports = { connect };
