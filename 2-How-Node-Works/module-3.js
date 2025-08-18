console.log('From module-3: Module3 will now be loaded to the cache.');
console.log('From module-3: This text will only log the first time its loaded.');
console.log('From module-3: Next time you run the export, only its function wil be executed.');

module.exports = () => console.log('Log this beautiful text🌌');
