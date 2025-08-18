// Demonstrate exporting one module into another

/*1.ES6 syntax for a class declaration
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  devide(a, b) {
    return a / b;
  }
}
// When we export a single value like a class or method
module.exports = Calculator; */

//2.ES6 syntax for a class expression
// More elegantly export a single value like a class or method
module.exports = class {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  devide(a, b) {
    return a / b;
  }
}; 
