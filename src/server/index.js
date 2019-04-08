const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



const mongoose = require('mongoose');
const Museum = require('./models/Museum');
const Works = require('./models/Works');

const server = express();
const dbname = 'museum-works'; // change to match your database name

// serve files from the dist directory
server.use(express.static('dist'));

// URL to our DB - will be loaded from an env variable or will use local DB
const dbroute = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;

let db;

mongoose.connect(dbroute, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


// const mongo_uri = 'mongodb://localhost/lecturer-modules';
// mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
//   if (err) {
//     throw err;
//   } else {
//     console.log(`Successfully connected to ${mongo_uri}`);
//   }
// });
//
// app.use(express.static(path.join(__dirname, 'public')));
//
//
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


server.get('/api/museum', (req, res) => {
  Museum.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

server.get('/api/works', (req, res) => {
  Works.find({}, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

server.get('/api/museum/:id', (req, res) => {
  Museum.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

server.get('/api/museum/:id/works', (req, res) => {
  Museum.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    Works.find({museum: result._id}, (err, works) => {
      if (err) throw err;

      res.send(works);
    });
  });
});
// delete museum with specific ID from DB
server.delete('/api/museum', (req, res) => {
  Museum.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});
// create new museum based on info supplied in request body
server.post('/api/museum', (req, res) => {
  const museum = new Museum(req.body);

  museum.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

// update museum based on info supplied in request body
server.put('/api/museum', (req, res) => {
  // get the ID of the museum to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a museum matching this ID and update their details
  Museum.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});


server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
