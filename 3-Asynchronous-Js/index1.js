/* What we will do: Use the dog.txt file
 * 1. Read the dog bread from the file
 * 2. Do an HTTP request to get a random image of this dog breed
 * 3. Then save that random image to another text file
 * Its a 3 sped process all of which involves callbacks, that will show the problem we get with these
 */

const fs = require("fs"); 
// Asynchronous reading of the file using tickbacks (template-string)
fs.readFile(`${__dirname}/dog.txt`, (err, data) => { // Feed it into data and log it
  console.log(`Breed: ${data}`);
});

// To do the http requist we can use native node modules or an npm package called 'superagent'
// Go to index 1 to see how the next step works using 'superagent'
