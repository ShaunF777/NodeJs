const superagent = require('superagent');
const fs = require('fs');
// ----------------------------
// Utility functions that return Promises
// ----------------------------

// Promisify fs.readFile → resolves with file content, rejects if error
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I cound not find that file 💆');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('Random dog image saved to file! 🐶');
    });
  });
};
// ----------------------------
// Async function (the "main worker")
// ----------------------------
const getDogPic = async () => {
  try {
    // await = pause until promise resolves (fulfilled) OR throws (rejected)
    const thenResult = await readFilePro(`${__dirname}/dog.txt`);
    // superagent.get(...) also returns a promise → await gives resolved response
    const res = await superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
    console.log(res.body);
    // Save the dog image URL into a file
    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    // If ANY awaited promise rejects, we jump straight here
    console.log(err);
    throw err; // Throw err will mark this entire promise as 'REJECTED' allowing the outside catch method to run
  }
  // Any return value from an async function is automatically wrapped in a resolved promise
  return '2: Ready 🐕‍🦺🐕‍🦺🐕‍🦺';
};

/* To recap, the most important thing to remember is that an Async function automatically
returns a promise, and that the value that we return from an Async function will be the result value
of that promise. And so from there, we can simply handle it as yet another promise. */ 
// ----------------------------
// Top-level IIFE (Immediately Invoked Async Function)
// This is our "program entry point"
// ----------------------------
(async () => {
  try {
    console.log('1: Will get dog pics!');
    // Await the async function → returns resolved value when done
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    // If getDogPic() throws, we handle it here
    console.log('ERROR 💣');
  }
})(); //Declare and call an async function directly

/**🧠 Concepts Reinforced in the Comments

Async function always returns a promise.

If you return "hi", that’s actually Promise.resolve("hi").

If you throw err, that’s actually Promise.reject(err).

await is syntactic sugar for “wait for this promise to resolve.”

If the promise fulfills → you get the value.

If the promise rejects → control jumps into the nearest catch.

try/catch in async = handles rejections the same way .catch() handles rejected promises.

Re-throwing errors is how you “bubble up” failures to an outer handler.
--------------------------------------------------------------------------
🔑 Analogy (so it sticks)

Think of async/await + try/catch like waiting at a restaurant:
await = sit at your table until the waiter brings your food (promise fulfilled).
If the kitchen messes up → waiter comes with bad news, you immediately jump to the complaint desk (catch).
If everything is fine, you keep eating and move on to dessert (next await).
If you throw the problem back out of the kitchen → your manager (outer catch) now has to deal with it. */




// Not so good way of runnung the getDogPic async function
/* console.log('1: Will get dog pics!');
//const x = getDogPic(); // Run's backend, and only serves when done.
//console.log(x); // Will return 'Promise { <pending> }'
// But this way getDogPic returns a promise, .then method gives access to it's future output ('2: Ready 🐕‍🦺🐕‍🦺🐕‍🦺')
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics!'); // All other output that we want after the async function, must be inside .then block
  })
  .catch((err) => {
    console.log('ERROR 💣');
  }); */

/**So in real life, this sort of stuff happens all the time.
So we have an Async function and we called it from another Async function, and maybe we even
called another Async function from that first Async function, and so we have a bunch of these
Async functions interacting with each other. And so it's very important that you know
how all of this works. */
