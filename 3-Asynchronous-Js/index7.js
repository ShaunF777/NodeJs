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
    console.log(`Breed: ${thenResult}`);

    // 3 x superagent.get(...) also returns 3x promises
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
    //Passing an array of promises into Promise.all will run them asynchronously
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message); // Map loops through, transfoming the new array
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n')); //Joins the images urls into a string using the new line  
    console.log('Random dog image saved to file!');
  } catch (err) {
    // If ANY awaited promise rejects, we jump straight here
    console.log(err);
    throw err; // Throw err will mark this entire promise as 'REJECTED' allowing the outside catch method to run
  }
  // Any return value from an async function is automatically wrapped in a resolved promise
  return '2: Ready 🐕‍🦺🐕‍🦺🐕‍🦺';
};

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
