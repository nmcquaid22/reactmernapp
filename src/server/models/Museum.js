const mongoose = require('mongoose');

const MuseumSchema = mongoose.Schema({
  name: String,
  location: String,
  email: String

});

module.exports = mongoose.model('Museum', MuseumSchema);
