/*1. Write a bunch of code.
2. Try to figue out in witch order they should be executed in the EVENT LOOP.
3. Then analyse if the results we thereafter get actualy makes sense.*/
const fs = require('fs');

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

/* Immediate Execution (within the current phase):
Callbacks passed to process.nextTick() are executed immediately after the current synchronous 
code block finishes, before the event loop moves to the next phase (e.g., timers, I/O events, setImmediate). 
This means they are prioritized and run as soon as possible within the current "tick" of the event loop.
Priority over Timers and I/O:
process.nextTick() callbacks are processed before any setTimeout(), setImmediate(), or I/O callbacks are handled. 
This makes it useful for ensuring that certain asynchronous operations are handled promptly and consistently. 
Use Cases:
- API Design: When building APIs, process.nextTick() can be used to ensure that event handlers are attached to an
    object before any I/O operations occur, allowing for consistent behavior whether an operation is synchronous or asynchronous.
- Error Handling: It can be used to defer error handling or retry mechanisms to prevent blocking the main thread while still addressing issues promptly.
- Avoiding Call Stack Issues: In recursive functions or intensive computations, process.nextTick() 
    can be used to break up the work and prevent exceeding the maximum call stack size.

Distinction from setTimeout(callback, 0) and setImmediate():
- process.nextTick() executes before any other phase of the event loop.
- setTimeout(callback, 0) schedules a callback to run at the end of the next tick, after all process.nextTick() 
    callbacks and microtasks (like Promise callbacks) have been processed.
- setImmediate() schedules a callback to run in the check phase of the event loop, after I/O callbacks but before close handlers.

In essence, process.nextTick() provides a mechanism for scheduling high-priority, non-blocking asynchronous 
operations that need to be executed as soon as possible within the current event loop iteration. */
