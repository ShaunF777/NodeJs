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
  }
};

console.log('1: Will get dog pics!');
getDogPic();
console.log('2: Done getting dog pics!');
