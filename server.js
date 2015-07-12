/**
 * React form server.The simplest server ever.
 *
 * This Express application serves the contact form with its
 * assets and processes the submission. A lot of aspects
 * of a real life application have been omitted here
 * for the sake of simplicity such as form validation and
 * security.
 */

var bodyParser = require('body-parser');
var fs = require('fs');
var express = require('express');
var app = express();

// Exposes public assets such as index.html and JavaScript files.
app.use(express.static('public'));

// Adds support for JSON-encoded bodies used in POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Processes a form submission.
app.post('/send', function (req, res) {
  console.log(req.body);
  return res.send({status: 'OK'});
});

// Starts the web application.
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
