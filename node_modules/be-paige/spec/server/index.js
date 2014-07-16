var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8282;

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname,
      filename = path.join(__dirname, uri);

  if (uri === '/form' && request.method.toLowerCase() === 'post') {
    filename = path.join(__dirname, '/form_response.html');
  }

  fs.stat(filename, function(err, stat) {
    if (err) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write(err + "\n");
      response.end();
      return;
    }

    if (stat.isDirectory()) {
      filename += 'index.html';
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(+port);
