// calculator.js
// Node.js CLI Calculator
// Supports: addition, subtraction, multiplication, division

const [,, operation, ...args] = process.argv;

function printUsage() {
  console.log('Usage: node calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide');
}

if (!operation || args.length < 2) {
  printUsage();
  process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

if (isNaN(num1) || isNaN(num2)) {
  console.log('Error: Both arguments must be valid numbers.');
  process.exit(1);
}

let result;
switch (operation) {
  case 'add':
    result = num1 + num2;
    break;
  case 'subtract':
    result = num1 - num2;
    break;
  case 'multiply':
    result = num1 * num2;
    break;
  case 'divide':
    if (num2 === 0) {
      console.log('Error: Division by zero is not allowed.');
      process.exit(1);
    }
    result = num1 / num2;
    break;
  default:
    printUsage();
    process.exit(1);
}

console.log(`Result: ${result}`);