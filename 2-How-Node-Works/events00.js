const EventEmitter = require('events'); // Standard name for aquring this built in events class

const myEmitter = new EventEmitter(); // Create new instance or object of the created class

// Observer pattern. Multiple listeners can be setup that wait & listen for the same events
myEmitter.on('newSale', () => { // Listener 1
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => { // Listener 2
  console.log('Customer name: Jonas');
});

myEmitter.on('newSale', stock => { // Listener 3 
  console.log(`There are now ${stock} items left in stock.`);
}); // multiple listeners for the same event will execute synchronously

myEmitter.emit('newSale', 9); // This object emits the pattern