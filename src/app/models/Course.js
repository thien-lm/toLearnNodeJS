const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Course = new Scheme({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String, maxLength: 255 },
    level: { type: String, maxLength: 255 },
});

module.exports = mongoose.model('narutoshippuden', Course); //first argument: in database, second = schema
