// By convention, app.js is used to hold the Express app setup and configuration
const express = require('express');

const app = express();
// Calling express() creates an application object
// This "app" has methods to define routes, middleware, and configuration

// -------------------------
// ROUTES
// -------------------------
// Good practice to keep versions, for updates and testing updates
app.get('/api/v1/tours', (req, res) => {});

// -------------------------
// START SERVER
// -------------------------
const port = 3000;
// app.listen() starts the HTTP server, similar to using http.createServer() in raw Node.js
// It binds the app to a network port, allowing it to accept incoming requests.
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
