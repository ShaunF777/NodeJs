// --- DEPENDENCIES & SETUP ---
const express = require('express');
const fs = require('fs');

const app = express();

// --- GLOBAL CONFIGURATION (middleware) ---
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// --- ROUTES & ROUTE HANDLERS ---
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
// Console.log(req.params) object using app.get('/api/v1/tours/:id/:x/:y', (req, res)
// in postman use GET 127.0.0.1:3000/api/v1/tours/5/23/45
// and the log will print { id: '5', x: '23', y: '45' }
// OPTIONAL routes are defined using app.get('/api/v1/tours/:id/:x/:y?', (req, res)
// use GET 127.0.0.1:3000/api/v1/tours/5/23 would log { id: '5', x: '23', y: undefined }
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params); // `req.params` is an object that holds the URL parameters.
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find((el) => el.id === id); // Create new array with only the found id

  //if (id > tours.length) {  when client request is GET 127.0.0.1:3000/api/v1/tours/23
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
