const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const Course = new Scheme({
  name: { type: String},
  description: {type: String},
  image: {type: String, maxLength: 255},
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("course", Course)//first argument: in database, second = schema