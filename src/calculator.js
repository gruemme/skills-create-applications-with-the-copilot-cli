#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition: + or add
//  - subtraction: - or subtract
//  - multiplication: * or x or mul
//  - division: / or div
//  - modulo: % or mod
//  - exponentiation (power): ^ or pow or **
//  - square root: sqrt (unary)
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

function modulo(a, b) {
  if (b === 0) throw new Error('ModuloByZero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('NegativeSquareRoot');
  return Math.sqrt(n);
}

function calculate(a, op, b) {
  // Note: calculate expects numeric operands. For unary ops like 'sqrt', pass the number as `a` and `b` may be undefined.
  const aNum = Number(a);
  const bNum = b === undefined ? undefined : Number(b);

  if (isNaN(aNum) || (b !== undefined && isNaN(bNum))) throw new Error('OperandsMustBeNumbers');

  switch (op) {
    case '+':
    case 'add':
      return add(aNum, bNum);
    case '-':
    case 'subtract':
      return subtract(aNum, bNum);
    case '*':
    case 'x':
    case 'X':
    case 'mul':
      return multiply(aNum, bNum);
    case '/':
    case 'div':
      return divide(aNum, bNum);
    case '%':
    case 'mod':
      return modulo(aNum, bNum);
    case '^':
    case 'pow':
    case '**':
      return power(aNum, bNum);
    case 'sqrt':
      // Support both `calculate(n, 'sqrt')` and `calculate('sqrt', n)` forms
      if (b === undefined) {
        return squareRoot(aNum);
      }
      // if a is 'sqrt' and b is number
      if (String(a).toLowerCase() === 'sqrt') {
        const val = Number(b);
        if (isNaN(val)) throw new Error('OperandsMustBeNumbers');
        return squareRoot(val);
      }
      return squareRoot(bNum);
    default:
      throw new Error('UnsupportedOperator:' + op);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  function usage() {
    console.error('Usage: calc <number1> <operator> <number2>');
    console.error('Supported operators: +  -  *  /  %  ^  sqrt (also: add, subtract, mul, div, mod, pow)');
    process.exit(1);
  }

  // Allow unary form for sqrt: `calc sqrt 9` or `calc 9 sqrt` or full binary ops `calc 2 + 3`
  if (args.length !== 3) {
    usage();
  }

  try {
    const result = calculate(args[0], args[1], args[2]);
    console.log(result);
  } catch (err) {
    if (err.message === 'DivisionByZero' || err.message === 'ModuloByZero') {
      console.error('Error: division or modulo by zero');
      process.exit(3);
    }
    if (err.message === 'NegativeSquareRoot') {
      console.error('Error: cannot take square root of negative number');
      process.exit(4);
    }
    if (err.message === 'OperandsMustBeNumbers') {
      console.error('Error: both operands must be numbers');
      process.exit(2);
    }
    console.error('Error:', err.message);
    usage();
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };
