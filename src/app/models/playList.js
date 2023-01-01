const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const PlayList = new Scheme({
    name: { type: String, required: true },
    image: { type: String, maxLength: 255 }
});
//export the model so that we can query them
module.exports = mongoose.model('playlists', PlayList); //first argument: in database, second = schema