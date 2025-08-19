// For ES8 Now we want to use ASYNC/Await.
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
// Helper function that "promisifies" fs.writeFile
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('Random dog image saved to file! 🐶');
    });
  });
};
// 'async' lets interpreter know that this is an asynchronous function that must run seperately in the thread pool without blocking the event loop and return a promise
// multiple awaits inside an await block allows the code to look more synchronous but still function asynchronously, this is called syntactic suger
const getDogPic = async () => {
  try {
    const thenResult = await readFilePro(`${__dirname}/dogff.txt`); // 'await' will pause the code untill promise fulfilled, then return the resolved value
    console.log(`Breed from file: ${thenResult}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
    console.log(res.body);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

/* Old  ES6 way
readFilePro(`${__dirname}/dog.txt`)
  .then((thenResult) => {
    console.log(`Breed from file: ${thenResult}`);
    return superagent.get(`https://dog.ceo/api/breed/${thenResult}/images/random`);
  })
  .then((res) => {
    console.log(res.body);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    console.log(err);
  }); */
