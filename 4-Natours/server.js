// --- START SERVER --- 
// This is our entrypoint. To use other modules like the express, database config, error handling, environment variables 
const app = require('./app'); // Express related module

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});