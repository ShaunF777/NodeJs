const express = require('express');
const fs = require('fs');

// This "app" has methods to define routes, middleware, and configuration
const app = express(); // Calling express() creates an application object

// Run once and parse Json data into an array of javascript objects kept for later use inside tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// -------------------------
// ROUTES
// -------------------------
// Good practice to keep versions, for updates and testing updates
app.get('/api/v1/tours', (req, res) => {
  // route handler req, res will reply with the a list of tour data
  res.status(200).json({
    status: 'success',
    results: tours.length, // For client info when sending arrays
    data: {
      // Normally tours(key route) : tours(value object)
      tours, // ES6 way if key and value has the same name
    },
  });
});

// -------------------------
// START SERVER
// -------------------------
const port = 3000;
// app.listen() starts the HTTP server, similar to using http.createServer() in raw Node.js
// It binds the app to a network port, allowing it to accept incoming requests.
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
