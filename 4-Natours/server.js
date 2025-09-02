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

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections); // to show everything inside the connections object
    console.log('DB connection successful!');
  });

//console.log(process.env); // Env variables loaded onto the node process
//console.log(app.get('env')); // Global environment variable used by Express to define the env that the node app is running in

const tourSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  price: Number,
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// --- ROUTE FLOW goes like this ---
// 1. We recieve the request here. Then it goes to app.js
// 2. Depending on the request, it then goes to the sub application routers
// 3. Depenting on the route and request, it will then execute one of the controller functions
