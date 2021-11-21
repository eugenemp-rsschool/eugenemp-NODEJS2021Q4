const { expect } = require('@jest/globals');
const {
  validateCipher,
  validateFile,
  getConfig,
} = require('../modules/handle-arguments');

describe('Input arguments validation tests', () => {
  test('Should return config array if input config string is correct', () => {
    const array = validateCipher('C0-R0-A');
    expect(array.every((el) => /^(C[01]|R[01]|A)$/.test(el))).toBe(true);
  });

  test('Should return file name if syntax is correct', () => {
    const file = validateFile('./input.txt');
    expect(file).toBe('./input.txt');
  });
  
  test('Should return valid config object if input, output or both file names were passed', () => {
    const config = getConfig([
      '-c',
      'C1-R1-A',
      '-i',
      './input.txt',
      '-o',
      './output.txt',
    ]);
    expect(config).toStrictEqual({
      cipher: ['C1', 'R1', 'A'],
      input: './input.txt',
      output: './output.txt',
    });
  });
  
  test('Should return valid config object if only config argument was passed', () => {
    const config = getConfig(['-c', 'C1-R1-A']);
    expect(config).toStrictEqual({
      cipher: ['C1', 'R1', 'A'],
      input: null,
      output: null,
    });
  });
});
