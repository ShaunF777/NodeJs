/* What we will do: Use the dog.txt file
 * 1. Read the dog bread from the file
 * 2. Do an HTTP request to get a random image of this dog breed
 * 3. Then save that random image to another text file
 * Its a 3 spep process all of which involves callbacks, that will show the problem we get with these
 */
// NOW WE WILL BE CONSUMING PROMISES, RATHER THAN NESTED CALLBACKS

const superagent = require('superagent');
const fs = require('fs');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    // get method will return a promise even though it's pending (NO data yet)
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      if (err) return console.log(err.message);
      console.log(res.body);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
    });
});
