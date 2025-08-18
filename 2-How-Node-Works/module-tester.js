// module.exports  -  Import calculator class from test-module-1
const C = require('./module-1'); // Use uppercase names for classes
const calc1 = new C(); // New local instance of our calculator
console.log(calc1.add(2, 5));

// exports
const calc2 = require('./module-2'); //calc2 is an instance of the object, allowing use of all its properties
//console.log(calc2.multiply(2, 5));
//console.log(calc2.add(2, 5));
console.log(calc2.divide(2, 5));
//console.log(calc2.subtract(2, 5));

// exports destructuring can also be used now to import only the needed properties
const { add, multiply, subtract } = require('./module-2');
console.log(subtract(9.0, 6.8));
console.log(multiply(9.0, 6.8));
console.log(add(9.0, 6.8));

// caching
require('./module-3')();
require('./module-3')();
require('./module-3')();
