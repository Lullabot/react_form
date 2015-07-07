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

http.createServer(function (req, res) {
  // Form handler.
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
  // Assets handler.
  else if (['/js/contact-form.js', '/js/JSXTransformer.js', '/js/react.js'].indexOf(req.url) !== -1) {
    fs.readFile('./' + req.url, function (err, js) {
      res.writeHeader(200, {'Content-Type': 'application/javascript'});
      res.write(js);
      res.end();
    });
  }
  // Form submit handler.
  else if (req.url == '/send') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'OK' }));
  }
}).listen(1337, '127.0.0.1');
