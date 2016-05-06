var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

app.use('/app', express.static(__dirname + '/public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.redirect('/new');
});

app.get('/new', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(PORT, function () {
  console.log('drawDNA server started on port', PORT);
});
