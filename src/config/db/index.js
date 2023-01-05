const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://abcdef:111111111111a@cluster0.atwn6ip.mongodb.net/abc');
        console.log('connect successfully');
    } catch (error) {
        console.log('connect failed');
    }
}

module.exports = { connect };
