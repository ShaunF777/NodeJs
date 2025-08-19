/* What we will do: Use the dog.txt file
 * 1. Read the dog bread from the file
 * 2. Do an HTTP request to get a random image of this dog breed
 * 3. Then save that random image to another text file
 * Its a 3 sped process all of which involves callbacks, that will show the problem we get with these
 */
// Theres many ways to do http requists; native node modules; npm packages like 'superagent'
/* To use 'superagent', first run 'npm init' to create the local package.json, then run 'npm i superagent'
 */

const superagent = require('superagent'); // 2. Create a superagent function to expose the module
const fs = require('fs');
// Asynchronous reading of the file using tickbacks (template-string)
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  // Feed it into data and log it
  console.log(`Breed: ${data}`);
  // 2. Callback - From the origenal https://dog.ceo/api/breed/hound/images/random on the https://dog.ceo/dog-api/documentation/breed
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      //Callback function response contains the body
      console.log(res.body);
      // 3. Callback to save the image url
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Random dog image saved to file!');
      });
    });
});

/**
 * All this callbacks nested inside each other makes our code a callback hell. This is not a good way and makes editing hard.
 * We will learn how to use promises instead.
 */
