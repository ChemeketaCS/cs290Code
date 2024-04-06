import {default as readline} from 'readline';

const consoleInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

consoleInterface.question(`What's your name? `, (name) => {
  console.log(`Hi ${name}!`);
  consoleInterface.close();
});
