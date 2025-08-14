const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////
// FILES
// (TOP Level Code) Not a problem using sync because it only executes once at startup
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data); // Convert JSON string to a JavaScript object/array
///////////////////////
// SERVER

// Create Server
const server = http.createServer((req, res) => {
    /*console.log(req.url);
    console.log(url.parse(req.url, true));
    parse breaks the URL into parts (like path and query). With true, 
    the query string is parsed into an object, making it easier to access values. */
    const {query, pathname} = url.parse(req.url, true); // Parse URL and extract query parameters and path

    // Overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'}); // Tells browser to expect HTML
        /*
        "map" indexes through each item in dataObj and runs replaceTemplate for each, returning a 
        new array of HTML strings. el is just a changing index number for each item in the array. 
        el gets passed to replaceTemplate as the product data index.
        "join('')" replaces the commas with '' combining all the HTML strings into one big string
        Finally cardsHtml becomes an string thats populated with the 5 product cards
        */
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        // Output becomes the template-overview.html, but with the cardsHtlm inserted 
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output); // Sends the response and closes the connection
        
        // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'}); // Tells browser to expect HTML
        const product = dataObj[query.id]; //Get product number from the query
        const output = replaceTemplate(tempProduct, product) //Run function with new product number
        //res.end('This is the product route');
        
        res.end(output); // Sends the response and closes the connection
    // API
    } else if (pathname === '/api') {
        // More efficiant, only pasing the data that was once read in top code
        res.writeHead(200, { 'Content-type': 'application/json'}); // Tells browser to expect JSON data
        res.end(data); // Sending raw json data
    
    // Not found
    } else {
        res.writeHead(404, { // Never send headers after the response
            'Content-type': 'text/html', // Tells browser to expect HTML
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>'); // Sends the response and closes the connection
    }
        
});

// Listen for requests on port, host ip
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});

/* What is .end?
It finishes the response and sends data to the browser.
Other options:
res.write(data) to send data in chunks (before calling .end)
res.end() with no argument just closes the response
How to explore available functions for these methods?
Use MDN Web Docs for JavaScript and Node.js documentation.
For Node.js-specific methods, check the Node.js API docs.
In VS Code, hover over a method or press Ctrl+Click to see its definition and documentation.
 */