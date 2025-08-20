// app.js is by convention used to for all the express configuration
const express = require('express');

const app = express(); // Calling express() will add a bunch of methods to our app variable

// Why define routes? To determine how an app responds to a certain client url(request) and http method
// 'get' is the http method sent to our server on this '/' url
// Define route for GET method on '/' url
// Test in postman using GET and 127.0.0.1:3000
app.get('/', (req, res) => {
  // res is only sent when 'get' is requested on '/'
  res
    .status(200) // 200 is the default, if not specified
    // Express automatically adds the below for browser to expect JSON data
    // res.writeHead(200, { 'Content-type': 'application/json'});
    /* X-Powered-By :Express
    Content-Type :application/json; charset=utf-8
    Content-Length :57
    ETag :W/"39-ngnEKioMg5il1d5ZCL+geUNsBiM"
    Date :Wed, 20 Aug 2025 13:33:23 GMT
    Connection :keep-alive
    Keep-Alive :timeout=5 */
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

// Define route for POST method on '/' url
// Test in postman using POST and 127.0.0.1:3000
app.post('/', (req, res) => {
  // res is only sent when 'post' is requested on '/'
  res.send('You can post to this endpoint...');
});

const port = 3000; // predefine for use in listen
// app.listen starts up a server, similar to the http package in node
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
