// The ulternative for doing module.exports, is to add properties to the exports object itself
// This allows multiple functions to be consumed by other modules 
// Create 4 anonamous functions using the exports object and assigning each a different property
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;

// in module-tester.js we can now have an a single object that can utilise all these properties