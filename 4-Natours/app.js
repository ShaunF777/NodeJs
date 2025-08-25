// --- DEPENDENCIES & SETUP ---

const express = require('express');
const morgan = require('morgan'); //Gives a nice log of whats happening

const tourRouter = require('./routes/tourRoutes')
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

// --- ROUTE HANDLERS (Controllers) are now imported from routs folder


// ---ROUTES middleware---
app.use('/api/v1/tours', tourRouter); // Mount subapplication for tourRouter 
app.use('/api/v1/users', userRouter); // Mount subapplication for userRouter 

// --- START SERVER ---
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
