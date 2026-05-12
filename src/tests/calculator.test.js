const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('Calculator - basic operations', () => {
  test('examples from image', () => {
    expect(calculate(2, '+', 3)).toBe(5);
    expect(calculate(10, '-', 4)).toBe(6);
    expect(calculate(45, '*', 2)).toBe(90);
    expect(calculate(20, '/', 5)).toBe(4);
  });

  test('operator aliases', () => {
    expect(calculate(1, 'add', 2)).toBe(3);
    expect(calculate(5, 'subtract', 3)).toBe(2);
    expect(calculate(6, 'mul', 7)).toBe(42);
    expect(calculate(8, 'div', 2)).toBe(4);
    expect(calculate(3, 'x', 4)).toBe(12);
  });

  test('individual helpers', () => {
    expect(add(2,3)).toBe(5);
    expect(subtract(5,2)).toBe(3);
    expect(multiply(3,3)).toBe(9);
    expect(divide(10,2)).toBe(5);
  });

  test('division by zero throws', () => {
    expect(() => calculate(1, '/', 0)).toThrow('DivisionByZero');
    expect(() => divide(1, 0)).toThrow('DivisionByZero');
  });

  test('invalid operands throw', () => {
    expect(() => calculate('a', '+', 1)).toThrow('OperandsMustBeNumbers');
    expect(() => calculate(1, '+', 'b')).toThrow('OperandsMustBeNumbers');
  });

  test('unsupported operator throws', () => {
    expect(() => calculate(1, '^', 2)).toThrow('UnsupportedOperator');
  });
});
