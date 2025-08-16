const EventEmitter = require('events'); // Standard name for aquring this bult in events class
const http = require('http');

// Create a parent class
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales(); // Create new instance or object of the created class

// Observer pattern. Multiple listeners can be setup that wait & listen for the same events
myEmitter.on('newSale', () => {
  // Listener 1
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
  // Listener 2
  console.log('Customer name: Jonas');
});

myEmitter.on('newSale', (stock) => {
  // Listener 3
  console.log(`There are now ${stock} items left in stock.`);
}); // multiple listeners for the same event will execute synchronously

myEmitter.emit('newSale', 9); // This object emits the pattern

////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => { 
  console.log('request recieved');
  console.log(req.url);
  res.end('Request recieved'); // we can only send 1 response
});

server.on('request', (req, res) => {
  console.log('Another request 🐷');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...');
});
