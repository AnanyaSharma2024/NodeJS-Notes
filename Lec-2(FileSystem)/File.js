const fs = require('fs');
//REPL = READ EVALUATE PRINT LOOP
//Synchronous file system operations block the execution of the program until the operation is complete. This means that if you are performing a long-running operation, such as reading a large file, the program will be unresponsive until the operation is finished. Asynchronous file system operations, on the other hand, allow the program to continue executing while the operation is being performed. This means that you can perform other tasks while waiting for the file system operation to complete. In Node.js, you can use the 'fs' module to perform both synchronous and asynchronous file system operations.
fs.writeFileSync('hello.txt', 'Hello World Sync');

//Asynchronous file system operations does not block the execution of the program. This means that if you are performing a long-running operation, such as reading a large file, the program will continue to be responsive and can perform other tasks while waiting for the operation to complete. In Node.js, you can use the 'fs' module to perform asynchronous file system operations using callbacks, promises, or async/await syntax.
fs.writeFile('hello.txt', 'Hello World Async', (err) => {} )

const result = fs.readFileSync('./contacts.txt', 'utf-8'); //this will return the content of the file as a string
console.log(result);

//this does not return the content of the file as a string because it is an asynchronous operation and it will return undefined because the callback function is not executed yet
//therefore we need to use a callback function to get the content of the file as a string
//const result is not used in async thats it
fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
    if(err){
        console.log(err);
    }
    console.log(result);
});


fs.appendFileSync('hello.txt', '\nHello World Sync Append'); //this will append the content to the file

fs.appendFile('hello.txt', '\nHello World Async Append', (err) => {} ) //this will append the content to the file asynchronously

fs.appendFileSync('hello.txt', `${Date.now()} Hey There\n`); //this will append the current timestamp to the file

fs.appendFile('hello.txt', `${Date.now()} Hey There Async\n`, (err) => {} ) //this will append the current timestamp to the file asynchronously

 fs.copyFileSync('hello.txt', 'hello_copy.txt'); //this will copy the content of the file to another file

 fs.unlinkSync('hello_copy.txt'); //this will delete the file

 //info about the file such as size, created time, modified time, etc.
console.log(fs.statSync('hello.txt')); //this will return the stats of the file such as size, created time, modified time, etc.






