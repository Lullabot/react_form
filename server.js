/**
 * React form server.The simplest server ever.
 *
 * This Express application serves the contact form with its
 * assets and processes the submission. A lot of aspects
 * of a real life application have been omitted here
 * for the sake of simplicity such as form validation and
 * security.
 */

require('node-jsx').install({extension: '.jsx'});
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var React = require('react');
var ContactForm = React.createFactory(require('./src/contact-form.jsx'));

// Exposes public assets such as index.html and JavaScript files.
app.use(express.static('public'));

// Sets views path and templateengine (Jade).
app.set('views', './views');
app.set('view engine', 'jade');

// Returns the contact form.
app.get('/', function (req, res) {
  res.render('index', { Content: React.renderToString(ContactForm({}))});
});

// Adds support for JSON-encoded bodies used in POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Processes the form submission.
app.post('/send', function (req, res) {
  console.log(req.body);
  return res.send({status: 'OK'});
});

// Starts the web application.
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  console.log('App is running at port', app.get('port'));
});
