// calculator.test.js
// Unit tests for calculator.js
// Uses Jest for testing

const { execSync } = require('child_process');

function runCalc(op, a, b) {
  return execSync(`node src/calculator.js ${op} ${a} ${b}`, { encoding: 'utf8' }).trim();
}

function runCalcError(op, a, b) {
  try {
    execSync(`node src/calculator.js ${op} ${a} ${b}`, { encoding: 'utf8' });
    return null;
  } catch (err) {
    return err.stdout || err.stderr || err.message;
  }
}

describe('Calculator CLI', () => {
  test('addition: 7 + 3 = 10', () => {
    expect(runCalc('add', 7, 3)).toBe('Result: 10');
  });

  test('subtraction: 7 - 3 = 4', () => {
    expect(runCalc('subtract', 7, 3)).toBe('Result: 4');
  });

  test('multiplication: 7 * 3 = 21', () => {
    expect(runCalc('multiply', 7, 3)).toBe('Result: 21');
  });

  test('division: 7 / 3 ≈ 2.333...', () => {
    expect(runCalc('divide', 7, 3)).toBe('Result: 2.3333333333333335');
  });

  test('division by zero', () => {
    const output = runCalcError('divide', 7, 0);
    expect(output).toContain('Error: Division by zero is not allowed.');
  });

  // Modulo operation
  test('modulo: 10 % 3 = 1', () => {
    expect(runCalc('mod', 10, 3)).toBe('Result: 1');
  });

  test('modulo by zero', () => {
    const output = runCalcError('mod', 10, 0);
    expect(output).toContain('Error: Modulo by zero is not allowed.');
  });

  // Power operation
  test('power: 2 ^ 3 = 8', () => {
    expect(runCalc('pow', 2, 3)).toBe('Result: 8');
  });

  test('power: 5 ^ 0 = 1', () => {
    expect(runCalc('pow', 5, 0)).toBe('Result: 1');
  });

  test('power: 2 ^ -2 = 0.25', () => {
    expect(runCalc('pow', 2, -2)).toBe('Result: 0.25');
  });

  // Square root operation
  test('square root: sqrt 9 = 3', () => {
    expect(runCalc('sqrt', 9)).toBe('Result: 3');
  });

  test('square root: sqrt 0 = 0', () => {
    expect(runCalc('sqrt', 0)).toBe('Result: 0');
  });

  test('square root: sqrt 2 = 1.4142135623730951', () => {
    expect(runCalc('sqrt', 2)).toBe('Result: 1.4142135623730951');
  });

  test('square root of negative number', () => {
    const output = runCalcError('sqrt', -4);
    expect(output).toContain('Error: Square root of negative number is not allowed.');
  });

  test('invalid operation', () => {
    const output = runCalcError('foo', 7, 3);
    expect(output).toContain('Usage: node calculator.js <operation> <num1> <num2>');
  });

  test('invalid input', () => {
    const output = runCalcError('add', 'a', 3);
    expect(output).toContain('Error: Both arguments must be valid numbers.');
  });
});
