/**
 * React form server.The simplest server ever.
 *
 * This Node.js application serves the contact form with its
 * assets and processes the submission. A lot of aspects
 * of a real life application have been omitted here
 * for the sake of simplicity such as form validation and
 * security.
 */
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) {
  // Returns the form.
  if (req.url == '/') {
    fs.readFile('./index.html', function (err, html) {
      if (err) {
        throw err;
      }
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
    });
  }
  // Returns JavaScript assets.
  else if (['/js/contact-form.js', '/js/JSXTransformer.js', '/js/react.js'].indexOf(req.url) !== -1) {
    fs.readFile('./' + req.url, function (err, js) {
      res.writeHeader(200, {'Content-Type': 'application/javascript'});
      res.write(js);
      res.end();
    });
  }
  // Processes the form submission.
  else if (req.url == '/send' && req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var formData = qs.parse(body);
      // Here we would send an email using a module such as
      // https://www.npmjs.com/package/emailjs. For simplicity
      // we will just log the submitted data and return a
      // successfull response to the client.
      console.log(formData);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({status: 'OK' }));
    });
  }
}).listen(1337, '127.0.0.1');
