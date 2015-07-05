var http = require('http');
var fs = require('fs');

var files = {

}
http.createServer(function (req, res) {
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
  else if (req.url == '/send') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'OK' }));
  }
  else {
    fs.readFile('./' + req.url, function (err, js) {
      if (err) {
        console.log(req.url);
        res.end();
      }
      else {
        res.writeHeader(200, {'Content-Type': 'application/javascript'});
        res.write(js);
        res.end();
      }
    });
  }
}).listen(1337, '127.0.0.1');
