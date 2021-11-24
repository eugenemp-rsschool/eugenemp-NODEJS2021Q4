const { expect } = require('@jest/globals');
const { atbash, caesar } = require('../modules/handle-ciphering');

describe('Ciphering functions tests', () => {
  describe('Should perform correct ciphering', () => {
    test('Atbash - should encode latin letters', () => {
      const result = atbash('abcdABCD');
      expect(result).toEqual('zyxwZYXW');
    });

    test('Atbash - shold not encode special symbols', () => {
      const result = atbash('!@#$%^&*()');
      expect(result).toEqual('!@#$%^&*()');
    });

    test('Atbash - shold not encode Cyrillic letters', () => {
      const result = atbash('абвгдАБВГД');
      expect(result).toEqual('абвгдАБВГД');
    });

    test('Caesar encode - should encode latin letters', () => {
      const encode = caesar('C', 1);
      expect(encode('abcdABCD')).toEqual('bcdeBCDE');
    });

    test('Caesar encode - shold not encode special symbols', () => {
      const encode = caesar('C', 1);
      expect(encode('!@#$%^&*()')).toEqual('!@#$%^&*()');
    });

    test('Caesar encode - shold not encode Cyrillic letters', () => {
      const encode = caesar('C', 1);
      expect(encode('абвгдАБВГД')).toEqual('абвгдАБВГД');
    });

    test('Caesar decode - should encode latin letters', () => {
      const decode = caesar('C', 0);
      expect(decode('abcdABCD')).toEqual('zabcZABC');
    });

    test('ROT-8 encode - should encode latin letters', () => {
      const encode = caesar('R', 1);
      expect(encode('abcdABCD')).toEqual('ijklIJKL');
    });

    test('ROT-8 encode - shold not encode special symbols', () => {
      const encode = caesar('R', 1);
      expect(encode('!@#$%^&*()')).toEqual('!@#$%^&*()');
    });

    test('ROT-8 encode - shold not encode Cyrillic letters', () => {
      const encode = caesar('R', 1);
      expect(encode('абвгдАБВГД')).toEqual('абвгдАБВГД');
    });

    test('ROT-8 decode - should encode latin letters', () => {
      const decode = caesar('R', 0);
      expect(decode('abcdABCD')).toEqual('stuvSTUV');
    });
  });
});