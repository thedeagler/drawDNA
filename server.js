// Init server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Init db
var db = require('./data/config.js');
var Sequence = require('./data/sequenceModel.js');

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/new', function(req, res) {
  var seq = new Sequence();

  seq.save(function(err, seqEntry) {
    if(seqEntry) {
      res.redirect('/draw/' + seqEntry.id);
    } else {
      res.send('Error creating new sequence.');
    }
  });
})

// Figure out rerouting logic here
app.use('/draw', express.static(__dirname + '/public'));
app.get('/draw/:id', function(req, res) {
  var id = req.params.id;
  Sequence.findOne({_id: id}, function(err, seqEntry) {
    if(err) {
      res.redirect('/');
    } else {
      res.sendFile(__dirname + '/public/draw.html');
    }
  });
});

app.get('/data/:id', function(req, res) {
  var id = req.params.id;
  Sequence.findOne({_id: id}, function(err, seqEntry) {
    if(err) {
      res.redirect('/');
    } else {
      res.status(200).send(seqEntry);
    }
  });
});

app.post('/data/:id', function(req, res) {
  var id = req.params.id;
  var seqData = req.body;

  Sequence.findOneAndUpdate({_id: id}, seqData, {new: true}, function(err, seqEntry) {
    if(err) {
      res.status(400).send({
        error: err,
        message: 'Unable to update.'
      });
    } else {
      res.status(200).send(seqEntry);
    }
  });
});

// Everything else, route back to homepage.
app.get('/*', function(req, res) {
  res.redirect('/');
})

app.listen(PORT, function () {
  console.log('drawDNA server listening on port', PORT, 'at', new Date().toLocaleTimeString());
});
