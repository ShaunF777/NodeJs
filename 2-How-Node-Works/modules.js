/* In Js, Arguments is an array containing all values passed into a function
The below log will show all 5 arguments: exports, require, module, __filename, __dirname
*/
console.log(arguments)
/**
 [Arguments] {
  '0': {},  //Exports: empty because we are not exporting anything
  '1': [Function: require] {
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: {
      id: '.',
      path: '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works',
      exports: {},
      filename: '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works/modules.js',
      loaded: false,
      children: [],
      paths: [Array],
      [Symbol(kIsMainSymbol)]: true,
      [Symbol(kIsCachedByESMLoader)]: false,
      [Symbol(kURL)]: undefined,
      [Symbol(kFormat)]: undefined,
      [Symbol(kIsExecuting)]: true
    },
    extensions: [Object: null prototype] {
      '.js': [Function (anonymous)],
      '.json': [Function (anonymous)],
      '.node': [Function (anonymous)]
    },
    cache: [Object: null prototype] {
      '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works/modules.js': [Object]
    }
  },
  '2': { //Module function
    id: '.',
    path: '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works',
    exports: {},
    filename: '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works/modules.js',
    loaded: false,
    children: [],
    paths: [
      '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works/node_modules',
      '/home/frstfllwr/Desktop/NodeJs/node_modules',
      '/home/frstfllwr/Desktop/node_modules',
      '/home/frstfllwr/node_modules',
      '/home/node_modules',
      '/node_modules'
    ],
    [Symbol(kIsMainSymbol)]: true,
    [Symbol(kIsCachedByESMLoader)]: false,
    [Symbol(kURL)]: undefined,
    [Symbol(kFormat)]: undefined,
    [Symbol(kIsExecuting)]: true
  },
  '3': '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works/modules.js',
  '4': '/home/frstfllwr/Desktop/NodeJs/2-How-Node-Works'
}
 */

// To show the wrapper function
console.log(require("module").wrapper);
/** This is the template it uses to fill up the body of this function with our code
 * [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
]
 */