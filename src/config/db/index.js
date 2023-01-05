const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.ADMIN_ID);
        console.log('connect successfully');
    } catch (error) {
        console.log('connect failed');
    }
}

module.exports = { connect };
