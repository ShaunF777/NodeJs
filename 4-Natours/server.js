// --- START SERVER --- 
// This is our entrypoint. To use other modules like the express, database config, error handling, environment variables 
const app = require('./app'); // Express related module

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// --- ROUTE FLOW goes like this ---
// 1. We recieve the request here. Then it goes to app.js 
// 2. Depending on the request, it then goes to the sub application routers
// 3. Depenting on the route and request, it will then execute one of the controller functions