#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition: + or add
//  - subtraction: - or subtract
//  - multiplication: * or x or mul
//  - division: / or div
// Usage: calc <number1> <operator> <number2>
// Example: calc 4 + 5

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('DivisionByZero');
  return a / b;
}

function calculate(a, op, b) {
  a = Number(a);
  b = Number(b);
  if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('OperandsMustBeNumbers');

  switch (op) {
    case '+':
    case 'add':
      return add(a, b);
    case '-':
    case 'subtract':
      return subtract(a, b);
    case '*':
    case 'x':
    case 'X':
    case 'mul':
      return multiply(a, b);
    case '/':
    case 'div':
      return divide(a, b);
    default:
      throw new Error('UnsupportedOperator:' + op);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  function usage() {
    console.error('Usage: calc <number1> <operator> <number2>');
    console.error('Supported operators: +  -  *  /  (also: add, subtract, mul, div, x)');
    process.exit(1);
  }

  if (args.length !== 3) {
    usage();
  }

  try {
    const result = calculate(args[0], args[1], args[2]);
    console.log(result);
  } catch (err) {
    if (err.message === 'DivisionByZero') {
      console.error('Error: division by zero');
      process.exit(3);
    }
    if (err.message === 'OperandsMustBeNumbers') {
      console.error('Error: both operands must be numbers');
      process.exit(2);
    }
    console.error('Error:', err.message);
    usage();
  }
}

module.exports = { add, subtract, multiply, divide, calculate };
