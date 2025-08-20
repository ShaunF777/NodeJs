// app.js is by convention used to for all the express configuration
const express = require('express');

const app = express(); // Calling express() will add a bunch of methods to our app variable

// Define route = to determine how an app responds to a certain client url(request) and http method 
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side!')
});

const port = 3000; // predefine for use in listen
// app.listen starts up a server, similar to the http package in node
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
