const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////
// FILES


///////////////////////
// SERVER
// (TOP Level Code) Not a problem using sync because it only executes once at startup
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data); // Parse it into an object

// Create Server
const server = http.createServer((req, res) => {
    //console.log(req.url);
    const pathName = req.url;

    if(pathName === '/overview') {
        res.end('This is the overview route');
    } else if (pathName === '/product') {
        res.end('This is the product route');
    } else if (pathName === '/api') {
        // More efficiant, only pasing the data that was once read in top code
        res.writeHead(200, { 'Content-type': 'application/json'}); // to send json
        res.end(data); // Sending raw json data
    } else {
        res.writeHead(404, { // Never send headers after the response
            'Content-type': 'text/html', // to send html
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
        
});

// Listen for requests on port, host ip
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});