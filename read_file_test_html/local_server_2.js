const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // read the HTML file
  const filePath = './index_d3_csv_v4_all_pic_no_plat_soft.html';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // handle error
      res.writeHead(500);
      res.end(`Error loading ${filePath}`);
    } else {
      // send the HTML file with cache-control header set to disable caching
      res.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000/');
});
