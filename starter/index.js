const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////
// FILES


///////////////////////
// SERVER
// (TOP Level Code) Not a problem using sync because it only executes once at startup
const replaceTemplate = (temp, product) => {
    // Use 'let' so we can mutate output's value as needed
    /* Now one small trick that we have to use here is to actually not use the quotes,
    but instead use a regular expression. And that's because there might be multiple instances of this placeholder
    and so the trick is to wrap this in a regular expression and use the g-flag then on it.
    Which means global and so this will make it so that all of these placeholders will get replaced
    and not just the first one that occurs. */
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); 
    output = output.replace(/{%IMAGE%}/g, product.image); 
    output = output.replace(/{%PRICE%}/g, product.price); 
    output = output.replace(/{%FROM%}/g, product.from); 
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients); 
    output = output.replace(/{%QUANTITY%}/g, product.quantity); 
    output = output.replace(/{%DESCRIPTION%}/g, product.description); 
    output = output.replace(/{%ID%}/g, product.id); 
    // Organic is a boolean, to hide the badge in template-product.html
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); 
    return output; // output final html
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data); // Parse it into an object

// Create Server
const server = http.createServer((req, res) => {
    //console.log(req.url);
    //console.log(url.parse(req.url, true)); // true to parse the quiry into an object
    const {query, pathname} = url.parse(req.url, true); //Destructuring to assign 2x const from an object 
    //const pathName = req.url; //Parse variables from the url

    // Overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        // Loop over dataObj list, in each iteration we will replace the placeholders in the template card 
        // with the current product which is element. Replacing the array with the 5 final product cards.
        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join(''); // add them together in 1 html
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        //console.log(cardsHtml);

        res.end(output);
    
    // Product page
    } else if (pathname === '/product') {
        console.log(query);
        res.end('This is the product route');
    
    // API
    } else if (pathname === '/api') {
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