// For ES6 Now we want to promisify the fs.read and fs.write parts of the code.
const superagent = require('superagent');
const fs = require('fs');

// Helper function that "promisifies" fs.readFile
// It will return a ES6 Promise, which can either resolve (success) or reject (error).
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I cound not find that file 💆'); // Rejects the Promise if file not found
      resolve(data); // Resolves the Promise for the .then handler to return this 'data'
    });
  });
};
// Helper function that "promisifies" fs.writeFile
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢'); // Rejects the Promise if file not found
      resolve('Random dog image saved to file! 🐶');
    });
  });
};

/** Returning the function, each time allows us to have a flat structure of chained promises rather then nested callbacks.
/** Promise chains explained:
 * Think of it like an assembly line 🛠:
 * - Step 1: One worker (a .then handler) receives the item (resolved value).
 * - Step 2: That worker can modify it, or hand it to another worker (.then).
 * - Step 3: Each .then passes its result to the next .then in line.
 * - If something goes wrong at any step (a reject or error),
 *   the whole line stops and sends the error to the .catch handler.
 * 
 * This way, promises let us write asynchronous steps in sequence
 * without nesting callbacks ("callback hell").
 */

// Step 1: Read the breed name from a local text file
readFilePro(`${__dirname}/dog.txt`)
  // then method only handles fulfilled promises and needs .catch for possible errors at the end
  .then((thenResult) => {
    console.log(`Breed from file: ${thenResult}`);
    // Step 2: Call the dog.ceo API using that breed name
    // superagent returns a Promise too
    return superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
  })
  .then((res) => {
    console.log(res.body); // Step 3: When the API responds, save the dog image URL to a file
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    // Step 4: Confirm everything worked
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    // GLOBAL ERROR HANDLER – this will catch:
    // - file not found
    // - API failure
    // - file write error
    console.log(err);
  });

  /**🛠 Key Differences from if/switch

If/Switch: Branching logic → “choose one path depending on condition.”

Promise chain: Sequential logic → “do this, then this, then this, unless something fails.” */
