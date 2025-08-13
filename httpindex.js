const fs = require('fs');
const http = require('http');

////////////////////////
// FILES


///////////////////////
// SERVER
// Create Server
const server = http.createServer((req, res) => {
    //console.log(req);
    res.end('Hello from the server!');
});

// Listen for requests on port, host ip
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
