//readline is a built-in module that provides an interface for reading data
// from a Readable stream (like process.stdin) one line at a time.
import {default as readline} from 'readline';

const consoleInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

consoleInterface.question(`What's your name? `, (name) => {
  console.log(`Hi ${name}!`);
  consoleInterface.close();
});
