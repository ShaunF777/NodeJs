const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////
// FILES


///////////////////////
// SERVER
// (TOP Level Code) Not a problem using sync because it only executes once at startup
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data); // Parse it into an object

// Create Server
const server = http.createServer((req, res) => {
    //console.log(req.url);
    const pathName = req.url;

    // Overview page
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        

        res.end(tempOverview);
    
    // Product page
    } else if (pathName === '/product') {
        res.end('This is the product route');
    
    // API
    } else if (pathName === '/api') {
        // More efficiant, only pasing the data that was once read in top code
        res.writeHead(200, { 'Content-type': 'application/json'}); // to send json
        res.end(data); // Sending raw json data
    
    // Not found
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