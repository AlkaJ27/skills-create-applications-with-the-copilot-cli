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

  test('invalid operation', () => {
    const output = runCalcError('mod', 7, 3);
    expect(output).toContain('Usage: node calculator.js <operation> <num1> <num2>');
  });

  test('invalid input', () => {
    const output = runCalcError('add', 'a', 3);
    expect(output).toContain('Error: Both arguments must be valid numbers.');
  });
});
