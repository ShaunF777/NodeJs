/*We need to read a large tes file from the file system and then send to the client.
There are multiple ways, we will start basic and move to the best modern way.
*/
const fs = require('fs');
// Least code to create a server object
const server = require('http').createServer(); // Create a server directly when requiring the http object

server.on('request', (req, res) => {
  /*1st Solution, no streams. Simply read the file into a variable, and then send to client
    // Problem is Node will have to load the whole file into memmory, before sending to client.
    // It crashes when the file is too big, or if there's a 1000 requests to your server...
    fs.readFile("test-file.txt", (err, data) => {
        if (err) console.log(err); // Handle whatever error may occur, e.g. file does not exist
        res.end(data); // Send the data to the client as end response
    }); */

  /*2nd Solution with Streams: The idea: Don't create a variable we don't need.
    Instead just create a readable stream, and send/write it to client chunk by chunk
  const readable = fs.createReadStream('test-file.txt');
  readable.on('data', (chunk) => {
    // Listen for data chunk events
    res.write(chunk); //send all data chunk by chunk
  });
  readable.on('end', () => {
    // when finished
    res.end();
  });
  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500; // Server error
    res.end('File not found!');
  }); //Problem is that the readable stream is too fast, creating too many chunks
  // and the response stream can not handle too much chunks, called 'backpressure' */

  /*3rd Using pipe method to directly pipe the flow of data chunks from the server to the client */
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res); // From readableSource.pipeto(writableDestination)
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});

/*
The pipe method in Node.js streams is a fundamental mechanism for efficiently transferring data between a readable stream and a writable stream. 
It streamlines the process of consuming data from a source and delivering it to a destination, automatically managing aspects like back pressure, pausing, and resuming.
Here's a breakdown of its key aspects:

Connecting Streams:
    The pipe method is called on a readable stream and takes a writable stream as its argument. For example, readableStream.pipe(writableStream) 
    establishes a connection where data flowing from readableStream is automatically directed to writableStream.
Automatic Data Flow Management:
    Unlike manual event handling (e.g., listening for 'data' events and manually writing to the destination), pipe handles the entire data transfer process, including:
        Back Pressure: It automatically manages the flow rate, preventing the writable stream from being overwhelmed by data from the readable stream.
        Pausing and Resuming: It intelligently pauses the readable stream when the writable stream is unable to process data fast enough and resumes it when capacity becomes available. 
Chaining Pipes:
    The pipe method returns the destination stream, allowing for chaining multiple pipe calls. This is particularly useful when incorporating transform streams 
    (which are both readable and writable) to perform intermediate operations on the data, such as compression or encryption. 
    For instance, readableStream.pipe(transformStream).pipe(writableStream).
Use Cases:
    The pipe method is widely used for various tasks, including:
        File Operations: Efficiently copying files by piping a read stream to a write stream.
        Network Communication: Piping data from an incoming network connection to an outgoing one.
        Data Processing Pipelines: Creating chains of streams for complex data transformations. 
    Simplicity and Efficiency:
    By abstracting away the complexities of manual stream management, pipe simplifies code, reduces boilerplate, and enhances application performance, 
    especially in scenarios involving large data volumes or real-time data processing. 
*/
