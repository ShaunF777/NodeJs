const fs = require('fs');

// Blocking, synchronous way
// Read the data from the file and return it into the variable. Args= path, format
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written');

// Non-blocking, asynchronous way
// Node starts reading the file, then the callback func. readFile() task goes on in the background
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => { 
    fs.readFile(`./txt/${data1}.txt`, 'utf8', (err, data2) => { 
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf8', (err, data3) => { 
            if (err) return console.log('ERROR! 🧨')
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf8', err=> {
                console.log('Your file has been written 😁');
            })
        });
    });
});
console.log('Will read file!');