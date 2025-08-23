// --- DEPENDENCIES & SETUP ---
const express = require('express');
const fs = require('fs');

const app = express();

// --- GLOBAL CONFIGURATION (middleware) ---
// This middleware is essential for Express to parse incoming JSON data from the request body.
// It takes the JSON data from the request and adds it to the `req.body` property,
// making it accessible in the route handlers. Without this, `req.body` would be undefined.
// Middleware is a function that sits in the middle of a request and response cycle.
app.use(express.json());

// Run once and parse Json data into an array of javascript objects kept for later use
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// --- ROUTES & ROUTE HANDLERS ---
// Route handler for getting all tours.
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Route handler for creating a new tour.
// The URL is the same as the GET request, but the HTTP method is POST.
app.post('/api/v1/tours', (req, res) => {
  // 1. Generate a new ID for the tour by taking the ID of the last tour and adding 1.
  const newId = tours[tours.length - 1].id + 1;

  // 2. Create the new tour object by merging the new ID with the data from the request body.
  // We use `Object.assign` to create a new object without mutating the original `req.body`.
  const newTour = Object.assign({ id: newId }, req.body);

  // 3. Add the new tour to the `tours` array in memory.
  tours.push(newTour);

  // 4. Persist the updated `tours` array back to the JSON file.
  // We use `fs.writeFile` (asynchronous) to avoid blocking the event loop.
  // The callback function handles the response after the file is successfully written.
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    // 5. Send a response with the newly created tour.
    // A status code of 201 "Created" is used to indicate successful resource creation.
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});

// --- START SERVER ---
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
