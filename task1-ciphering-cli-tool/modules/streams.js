const fs = require('fs');
const { Transform } = require('stream');
const { atbash, caesar } = require('./handle-ciphering');
const { checkFileExist, checkFileRead, checkFileWrite } = require('./utils');

// Generate readable stream
const getReadable = (file) => {
  if (file) return fs.createReadStream(file, 'utf8');

  const readable = process.stdin;
  readable.setEncoding('utf8');

  return readable;
};

// Generate writeable stream
const getWriteable = (file) => {
  if (file) return fs.createWriteStream(file, { flags: 'a' });

  return process.stdout;
};

// Transform stream
const getTransform = (ciphrType) => {
  let cipher;

  if (ciphrType === 'A') cipher = atbash;
  if (ciphrType === 'C0') cipher = caesar('C', 0);
  if (ciphrType === 'C1') cipher = caesar('C', 1);
  if (ciphrType === 'R0') cipher = caesar('R', 0);
  if (ciphrType === 'R1') cipher = caesar('R', 1);

  return new Transform({
    transform(chunk, encoding, callback) {
      try {
        callback(null, cipher(chunk));
      } catch (error) {
        callback(error);
      }
    },
    decodeStrings: false,
    encoding: 'utf8',
  });
};

module.exports = {
  getReadable,
  getWriteable,
  getTransform,
};
