// module.exports  -  Import calculator class from test-module-1
const C = require('./test-module-1') // Use uppercase names for classes
const calc1 = new C(); // New local instance of our calculator
console.log(calc1.add(2,5));

// exports