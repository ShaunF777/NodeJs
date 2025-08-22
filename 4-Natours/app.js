// --- DEPENDENCIES & SETUP ---
const express = require('express');
const fs = require('fs');

const app = express();

// --- GLOBAL CONFIGURATION (middleware) ---
app.use(express.json());

// Run once and parse Json data into an array of javascript objects kept for later use
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// --- ROUTES & ROUTE HANDLERS ---
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length, // For client info when sending arrays
    data: {
      tours, // ES6 way if key and value has the same name
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // Test with postman if console.log(req.body); returns this body { name: 'Test Tour', duration: 10, difficulty: 'easy' }
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
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
