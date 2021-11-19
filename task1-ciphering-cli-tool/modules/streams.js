const fs = require('fs');
const { checkFileExist, checkFileRead, checkFileWrite } = require('./utils');

// Generate readable stream
const getReadable = (file) => {
  let readable;

  if (file) {
    checkFileExist(file, 1);
    checkFileRead(file);

    readable = fs.createReadStream(file);
  } else readable = process.stdin;

  readable.setEncoding('utf8');

  return readable;
};

// Generate writeable stream
const getWriteable = (file) => {
  let writeable;

  if (file) {
    checkFileExist(file, 0);
    checkFileWrite(file);

    writeable = fs.createWriteStream(file);
  } else writeable = process.stdout;

  return writeable;
};

module.exports = {
  getReadable,
  getWriteable,
};
