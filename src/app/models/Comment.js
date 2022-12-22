const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const Comment = new Scheme({
    name: { type: String},
    email: { type: String, unique: false},
    video: { type: String },
    message: {type: String , required: true },
    to: {type: String},
    createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('comments', Comment); //first argument: in database, second = schema