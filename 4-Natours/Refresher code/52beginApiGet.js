// --- DEPENDENCIES & SETUP ---
// Express is a popular Node.js framework for building web applications and APIs.
const express = require('express');
// The 'fs' module is a core Node.js module for interacting with the file system.
// We use it here to read the JSON data file.
const fs = require('fs');

// Create the Express application object.
const app = express();


// --- LOAD DATA ---
// We read the 'tours-simple.json' file once when the application starts.
// This is synchronous code, which is acceptable at the top level because it only runs once
// when the app is initialized, not on every request, preventing it from blocking the event loop.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


// --- ROUTE HANDLERS ---
// This section contains the route handlers for our API endpoints.

// 1. GET ALL TOURS
// This route is designed to retrieve a list of all tours.
// RESTful conventions often include API versioning in the URL (e.g., '/api/v1')
// to allow for future changes without breaking existing clients.
// The JSend specification is used for the JSON response format, which provides a
// predictable structure for success, fail, or error states.

// Test in Postman:
// Method: GET
// URL: http://127.0.0.1:3000/api/v1/tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    // JSend specification: The 'status' indicates the result of the request.
    status: 'success',
    // 'results' is a custom field to provide the client with the number of items in the array.
    results: tours.length,
    // JSend specification: The 'data' field acts as an envelope for the actual payload.
    data: {
      // We use the ES6 shorthand for key/value pairs when the key and variable name are the same.
      tours, // which is equivalent to tours: tours
    },
  });
});


// ------------------------
// START SERVER
// ------------------------
// The port the server will listen on.
const port = 3000;
// Starts the server and listens for incoming requests on the specified port.
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});