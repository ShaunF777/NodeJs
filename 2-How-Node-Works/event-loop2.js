/*1. Write a bunch of code.
2. Try to figue out in witch order they should be executed in the EVENT LOOP.
3. Then analyse if the results we thereafter get actualy makes sense.*/
const fs = require('fs');
const crypto = require('crypto');

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('------------------------------------------');
  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('Process.nextTic'));
  /*In Node.js, process.nextTick() is a function that schedules a callback to be 
    executed in the next iteration of the event loop, but with a higher priority than 
    other asynchronous operations like setTimeout() or setImmediate(). */
});

console.log('Hello from the top level code');
