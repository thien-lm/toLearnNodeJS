const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const User = new Scheme({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
});

User.statics = {
  findByEmail(email) {
    return this.findOne({email: email});
  }
}

User.methods = {
    comparePassword(password) {
      return password == this.password;
    }
  }

module.exports = mongoose.model('users', User); //first argument: in database, second = schema