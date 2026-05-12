#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition: + or add
//  - subtraction: - or subtract
//  - multiplication: * or x or mul
//  - division: / or div
// Usage: calc <number1> <operator> <number2>
// Example: calc 4 + 5

const args = process.argv.slice(2);

function usage() {
  console.error('Usage: calc <number1> <operator> <number2>');
  console.error('Supported operators: +  -  *  /  (also: add, subtract, mul, div, x)');
  process.exit(1);
}

if (args.length !== 3) {
  usage();
}

const a = Number(args[0]);
const op = args[1];
const b = Number(args[2]);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.error('Error: both operands must be numbers');
  process.exit(2);
}

let result;
switch (op) {
  case '+':
  case 'add':
    result = a + b; break;
  case '-':
  case 'subtract':
    result = a - b; break;
  case '*':
  case 'x':
  case 'X':
  case 'mul':
    result = a * b; break;
  case '/':
  case 'div':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(3);
    }
    result = a / b; break;
  default:
    console.error('Error: unsupported operator', op);
    usage();
}

console.log(result);
