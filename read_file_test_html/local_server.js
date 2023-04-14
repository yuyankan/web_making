const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
  const filePath = '.' + req.url;
  const contentType = getContentType(filePath);

  fs.readFile(filePath, function(error, content) {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1><p>The requested URL ' + req.url + ' was not found on this server.</p>');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Expires': '0'
      });
      res.end(content);
    }
  });
}).listen(8080);

console.log('Server running at http://localhost:8080/');


function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'text/plain';
  }
}






