const mongoose = require('mongoose');
const Museum = require('./models/Museum');
const Works = require('./models/Works');

const mongo_uri = 'mongodb://localhost/museum-works';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

museum.findOne({name: 'The MET'}, function(err, museum) {
  if (err) throw err;

  let arr = [
    {name: 'Maths 101',
      amount: 10000,
      age: 15,
      museum_id : museum._id},
    {name: 'Maths 202',
      amount: 10,
      age: 15,
      museum_id : museum._id},
    {name: 'Stats all folks',
      amount: 10,
      age: 15,
      museum_id : museum._id}
  ];
  Works.create(arr, function(err, res) {
    if(err) throw err;

    console.log(res);
  });
});
