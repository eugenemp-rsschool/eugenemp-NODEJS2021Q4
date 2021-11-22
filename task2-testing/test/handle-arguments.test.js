const { expect } = require('@jest/globals');
const { FileError } = require('../modules/error-file');
const { ValidationError } = require('../modules/error-validation');
const {
  validateCipher,
  validateFile,
  getConfig,
} = require('../modules/handle-arguments');

describe('Input arguments validation tests', () => {
  describe('Config pattern validation tests', () => {
    test('Should return config string if pattern it was correct', () => {
      expect(validateCipher('C0-R0-A')).toEqual('C0-R0-A');
    });

    test('Should throw an error if input pattern was missing', () => {
      expect(() => validateCipher()).toThrow(ValidationError);
    });

    test('Should throw an error if input pattern was incorrect', () => {
      expect(() => validateCipher('R2-D2')).toThrow(ValidationError);
    });
  });

  describe('File name validation tests', () => {
    test('Should return input/output file name if file exist, can be accessed and syntax is correct', () => {
      expect(validateFile('./input.txt', 1)).toBe('./input.txt');
      expect(validateFile('./output.txt', 0)).toBe('./output.txt');
    });

    test('Should throw an error if input/output file(s) not exist', () => {
      expect(() => validateFile('./input2.txt', 1)).toThrow(FileError);
      expect(() => validateFile('./output2.txt', 0)).toThrow(FileError);
    });

    test('Should throw an error if file path syntax was incorrect', () => {
      expect(() => validateFile('./', 1)).toThrow(FileError);
      expect(() => validateFile('./', 0)).toThrow(FileError);
    });
  });

  describe('General input parameters test', () => {
    test('Should return valid config object if passed arguments were correct: -c "C1-R1-A" -i "./input.txt" -o "./output.txt"', () => {
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

    test('Should return valid config object if passed arguments were correct: -c "C1-R1-A"', () => {
      const config = getConfig(['-c', 'C1-R1-A']);

      expect(config).toStrictEqual({
        cipher: ['C1', 'R1', 'A'],
        input: null,
        output: null,
      });
    });

    test('Should show error message if config argument was duplicated: -c "C1-C1-A-R0" -c "C0"', () => {
      expect(() => getConfig(['-c', 'C1-C1-A-R0', '-c', 'C0'])).toThrow(
        'ERR_DUP_OPTS'
      );
    });

    test('Should show error message if ciphering pattern was incorrect: -c "G1-R1-D"', () => {
      expect(() => getConfig(['-c', 'G1-R1-D'])).toThrow('ERR_NO_CFG');
    });

    test('Should show error message if mandatory -c flag was not passed:', () => {
      expect(() => getConfig(['-c', 'G1-R1-D'])).toThrow('ERR_NO_CFG');
    });

    test('Should show error message if input/output file path was incorrect:', () => {
      expect(() => getConfig(['-c', 'A', '-i', './'])).toThrow('ERR_INP_PATH');
      expect(() => getConfig(['-c', 'A', '-o', './'])).toThrow('ERR_OUT_PATH');
    });

    test('Should show error message if input contains wrong arguments:', () => {
      expect(() => getConfig(['-a', '-b'])).toThrow('ERR_WRG_ARGS');
    });

    test('Should show error message if no arguments were passed:', () => {
      expect(() => getConfig([])).toThrow('ERR_NO_CFG_OPT');
    });
  });
});
