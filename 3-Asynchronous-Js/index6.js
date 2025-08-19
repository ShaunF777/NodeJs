const superagent = require('superagent');
const fs = require('fs');

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

const getDogPic = async () => {
  try {
    const thenResult = await readFilePro(`${__dirname}/dog.txt`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
    console.log(res.body);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err; // Throw err will mark this entire promise as 'REJECTED' allowing the outside catch method to run
  }
  return '2: Ready 🐕‍🦺🐕‍🦺🐕‍🦺';
};

console.log('1: Will get dog pics!');
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
  });
