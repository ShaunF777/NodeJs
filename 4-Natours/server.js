// --- START SERVER ---
// This is our entrypoint. To use other modules like the express, database config, debug/error handling, environment variables
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // Express related module

dotenv.config({ path: './config.env' }); // Read the variables and save them into NODEjs environment variables.

// Replace the placeholder <PASSWORD> with the real pass word, so our connection string is complete
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// Connect to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    //console.log(con.connections); // to show everything inside the connections object
    console.log('DB connection successful!');
  });

// --- ROUTE FLOW goes like this ---
// 1. We recieve the request here. Then it goes to app.js
// 2. Depending on the request, it then goes to the sub application routers
// 3. Depenting on the route and request, it will then execute one of the controller functions
