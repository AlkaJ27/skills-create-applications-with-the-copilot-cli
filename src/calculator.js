// calculator.js
// Node.js CLI Calculator
// Supports: addition, subtraction, multiplication, division, modulo, power, square root

const [,, operation, ...args] = process.argv;

function printUsage() {
  console.log('Usage: node calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
}


if (!operation || (operation !== 'sqrt' && args.length < 2) || (operation === 'sqrt' && args.length < 1)) {
  printUsage();
  process.exit(1);
}


const num1 = parseFloat(args[0]);
const num2 = args.length > 1 ? parseFloat(args[1]) : undefined;

if (operation === 'sqrt') {
  if (isNaN(num1)) {
    console.log('Error: Argument must be a valid number.');
    process.exit(1);
  }
} else {
  if (isNaN(num1) || isNaN(num2)) {
    console.log('Error: Both arguments must be valid numbers.');
    process.exit(1);
  }
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
  case 'mod': // modulo operation
    if (num2 === 0) {
      console.log('Error: Modulo by zero is not allowed.');
      process.exit(1);
    }
    result = num1 % num2;
    break;
  case 'pow': // exponentiation
    result = Math.pow(num1, num2);
    break;
  case 'sqrt': // square root
    if (num1 < 0) {
      console.log('Error: Square root of negative number is not allowed.');
      process.exit(1);
    }
    result = Math.sqrt(num1);
    break;
  default:
    printUsage();
    process.exit(1);
}

console.log(`Result: ${result}`);