const { expect } = require('@jest/globals');
const { Readable, Writable, pipeline } = require('stream');
const { FileError } = require('../modules/error-file');
const { ValidationError } = require('../modules/error-validation');
const {
  validateCipher,
  validateFile,
  getConfig,
} = require('../modules/handle-arguments');
const { handleError } = require('../modules/handle-errors');
const { getTransform } = require('../modules/streams');

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

  describe('Error scenarios', () => {
    const mockFns = {
      mockExit: jest.spyOn(process, 'exit').mockImplementation(() => {}),
      mockStderr: jest
        .spyOn(process.stderr, 'write')
        .mockImplementation(() => {}),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Should show error message if config argument was duplicated: -c "C1-C1-A-R0" -c "C0"', () => {
      try {
        getConfig(['-c', 'C1-C1-A-R0', '-c', 'C0']);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'ValidationError: Duplicated options were passed!'
      );
    });

    test('Should show error message if mandatory -c flag was not passed:', () => {
      try {
        getConfig([]);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'ValidationError: Ciphering config argument is mandatory but was not provided!'
      );
    });

    test('Should show error message if input file path was incorrect -i "./":', () => {
      try {
        getConfig(['-c', 'A', '-i', './']);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'FileError: Path to input file is missing or its syntax is wrong.'
      );
    });

    test('Should show error message if output file path was incorrect: -o "./"', () => {
      try {
        getConfig(['-c', 'A', '-o', './']);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'FileError: Path to output file is missing or its syntax is wrong.'
      );
    });

    test('Should show error message if input file does not exist: -i "./notexist.null":', () => {
      try {
        getConfig(['-c', 'A', '-i', './notexist.null']);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'FileError: Specified input file does not exist!'
      );
    });

    test('Should show error message if output file does not exist: -o "./notexist.null":', () => {
      try {
        getConfig(['-c', 'A', '-o', './notexist.null']);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'FileError: Specified output file does not exist!'
      );
    });

    test('Should show error message if ciphering pattern was incorrect: -c "G1-R1-D"', () => {
      try {
        getConfig(['-c', 'G1-R1-D']);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'ValidationError: Ciphering configuration is missing or ivalid!'
      );
    });

    test('Should show error message if input contains wrong arguments:', () => {
      try {
        getConfig(['-a', '-b']);
      } catch (err) {
        handleError(err);
      }

      expect(mockFns.mockStderr).toHaveBeenCalledWith(
        'ValidationError: Wrong arguments were passed!'
      );
    });
  });

  describe('Success scenarios', () => {
    const mockWrite = jest.fn((chunk) => chunk.toString());
    const streams = {
      mockReadable: new Readable({ read() {} }),
      mockWriteable: new Writable({write: mockWrite}),
    };

    streams.mockWriteable.write = mockWrite;

    test('Should return correct encoded phrase: -c "C1-R1-A"', () => {
      const config = getConfig(['-c', 'C1-C1-R0-A']);

      pipeline(
        streams.mockReadable,
        ...config.cipher.map(getTransform),
        streams.mockWriteable,
        () => {}
      );
      streams.mockReadable.emit(
        'data',
        'This is secret. Message about "_" symbol!'
      );

      expect(mockWrite).toHaveReturnedWith(
        'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!'
      );
    });

    test('Should return correct encoded phrase: -c "C1-C0-A-R1-R0-A-R0-R0-C1-A"', () => {
      const config = getConfig(['-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A']);

      pipeline(
        streams.mockReadable,
        ...config.cipher.map(getTransform),
        streams.mockWriteable,
        () => {}
      );
      streams.mockReadable.emit(
        'data',
        'This is secret. Message about "_" symbol!'
      );

      expect(mockWrite).toHaveReturnedWith(
        'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!'
      );
    });

    test('Should return correct encoded phrase: -c "A-A-A-R1-R0-R0-R0-C1-C1-A"', () => {
      const config = getConfig(['-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A']);

      pipeline(
        streams.mockReadable,
        ...config.cipher.map(getTransform),
        streams.mockWriteable,
        () => {}
      );
      streams.mockReadable.emit(
        'data',
        'This is secret. Message about "_" symbol!'
      );

      expect(mockWrite).toHaveReturnedWith(
        'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!'
      );
    });

    test('Should return correct encoded phrase: -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1"', () => {
      const config = getConfig(['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1']);

      pipeline(
        streams.mockReadable,
        ...config.cipher.map(getTransform),
        streams.mockWriteable,
        () => {}
      );
      streams.mockReadable.emit(
        'data',
        'This is secret. Message about "_" symbol!'
      );

      expect(mockWrite).toHaveReturnedWith(
        'This is secret. Message about "_" symbol!'
      );
    });
  });
});
