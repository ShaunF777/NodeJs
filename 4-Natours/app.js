// --- DEPENDENCIES & SETUP ---
// All express related configuration (middleware) happens here

const express = require('express');
const morgan = require('morgan'); // Logs routing feedback in console

// Import the routers that imports their handler modules from controllers folder
const tourRouter = require('./routes/tourRoutes') // imports the whole file
const userRouter = require('./routes/userRoutes') 

const app = express();

// --- GLOBAL CONFIGURATION (middleware) ---
app.use(express.json()); // 'use' Adds a function to our middleware stack
app.use(morgan('dev')); // https://expressjs.com/en/resources/middleware.html

app.use((req, res, next) => {
  console.log('👉Hello from the middleware👈');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// --- ROUTE FLOW goes like this ---
// 1. Depending on the request, it goes to the sub application routers
// 2. Depenting on the route and request, it will execute one of the controller functions

// ---ROUTES middleware---
app.use('/api/v1/tours', tourRouter); // Mount subapplication for tourRouter 
app.use('/api/v1/users', userRouter); // Mount subapplication for userRouter 

module.exports = app; // Allow export of the whole application configuration in one file
