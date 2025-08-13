const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////
// FILES


///////////////////////
// SERVER
// Create Server
const server = http.createServer((req, res) => {
    //console.log(req.url);
    const pathName = req.url;

    if(pathName === '/overview') {
        res.end('This is the overview route');
    } else if (pathName === '/product') {
        res.end('This is the product route');
    } else {
        res.writeHead(404);
        res.end('Page not found!');
    }
        
});

// Listen for requests on port, host ip
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});