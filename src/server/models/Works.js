const Works = require('../models/Works.js');
const mongoose = require('mongoose');

const WorksSchema = mongoose.Schema({
  name: String,
  amount: Number,
  age: Number,
  museum_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Museum' }
});

module.exports = mongoose.model('Works', WorksSchema);
