const fs = require('fs');
const { expect } = require('@jest/globals');
const { Readable, Transform, PassThrough } = require('stream');
const {
  getReadable,
  getWriteable,
  getTransform,
} = require('../modules/streams');

describe('Stream implementation tests', () => {
  test('Test if readable stream is instance of ReadStream if input file option was passed', () => {
    expect(getReadable('./input.txt') instanceof fs.ReadStream).toEqual(true);
  });

  test('Test if writeable stream is instance of WriteStream if output file option was passed', () => {
    expect(getWriteable('./output.txt') instanceof fs.WriteStream).toEqual(
      true
    );
  });

  test('Test if readable stream is stdin if input file option was not passed', () => {
    expect(getReadable(null)).toBe(process.stdin);
  });

  test('Test if writeable stream is stdout if output file option was not passed', () => {
    expect(getWriteable(null)).toBe(process.stdout);
  });

  test('Test if transform stream is instance of Transform', () => {
    expect(getTransform('C0') instanceof Transform).toEqual(true);
  });

  test('Test if transform stream encode/decode strings', () => {
    const mockReadable = new Readable({ read() {} });
    const transform = getTransform('C0');
    let output;

    transform.on('data', (data) => (output = data));
    mockReadable.pipe(transform);
    mockReadable.emit('data', 'This is secret. Message about "_" symbol!');

    expect(output).toEqual('Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!');
  });
});
