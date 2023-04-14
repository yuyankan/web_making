/*
If you are using Node.js to serve your local web server, you can use the "cache-control" header to control caching of your HTML files. Here's an example of how you can set up Node.js to send the "cache-control" header with a "max-age" value of 0 to disable caching:

javascript
Copy code

*/



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
/*
In the code above, we are setting the "cache-control" header to "no-cache, no-store, must-revalidate", which will tell the client's browser not to cache the HTML file. You can adjust the "max-age" value to set a specific cache duration if you need to.

Keep in mind that disabling caching may impact the performance of your web application, so it's important to use caching judiciously and consider the needs of your users.
*/