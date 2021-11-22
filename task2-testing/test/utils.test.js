const { expect } = require('@jest/globals');
const { FileError } = require('../modules/error-file');
const {
  checkFileExist,
  checkFileRead,
  checkFileWrite,
} = require('../modules/utils');

describe('File operations tests', () => {
  test('Should return true if input and/or output file(s) exist', () => {
    expect(checkFileExist('input.txt', 1)).toBe(true);
    expect(checkFileExist('output.txt')).toBe(true);
  });

  test('Should throw an errror if input and/or output file(s) does not exist', () => {
    expect(() => checkFileExist('../input.txt', 1)).toThrow(FileError);
    expect(() => checkFileExist('../output.txt', 0)).toThrow(FileError);
  });

  test('Should return true if input and/or output file(s) is accessible for read', () => {
    expect(checkFileRead('input.txt', 1)).toEqual(true);
    expect(checkFileRead('output.txt', 0)).toEqual(true);
  });

  test('Should throw an errror if input and/or output file(s) does not accessible for read', () => {
    expect(() => checkFileRead('../input.txt', 1)).toThrow(FileError);
    expect(() => checkFileRead('../output.txt', 0)).toThrow(FileError);
  });

  test('Should return true if input and/or output output file is accessible for write', () => {
    expect(checkFileWrite('input.txt', 1)).toEqual(true);
    expect(checkFileWrite('output.txt', 0)).toEqual(true);
  });

  test('Should throw an errror if input and/or output file does not accessible for write', () => {
    expect(() => checkFileWrite('../input.txt', 1)).toThrow(FileError);
    expect(() => checkFileWrite('../output.txt', 0)).toThrow(FileError);
  });
});
