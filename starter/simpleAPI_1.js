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
    } else if (pathName === '/api') {
        // Not very efficiant because it needs to reed this Json file every time a request is made by the browser
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf8', (err,data) => { 
            const productData = JSON.parse(data);
            //console.log(productData);
            res.writeHead(200, { 'Content-type': 'application/json'}); // tosend json
            res.end(data); // Sending raw json data
        })
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