const fs = require('fs');
const { FileError } = require('./error-file');

// Check file for existence
const checkFileExist = (path, fileType) => {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch {
    if (fileType) throw new FileError('ERR_INP_FILE_NOT_EXIST');
    if (!fileType) throw new FileError('ERR_OUT_FILE_NOT_EXIST');
  }
};

// Check file read access
const checkFileRead = (path, fileType) => {
  try {
    fs.accessSync(path, fs.constants.R_OK);
  } catch {
    if (fileType) throw new FileError('ERR_INP_FILE_READ');
    if (!fileType) throw new FileError('ERR_OUT_FILE_READ');
  }
};

// Check file read access
const checkFileWrite = (path, fileType) => {
  try {
    fs.accessSync(path, fs.constants.W_OK);
  } catch {
    if (fileType) throw new FileError('ERR_INP_FILE_WRITE');
    if (!fileType) throw new FileError('ERR_OUT_FILE_WRITE');
  }
};

module.exports = {
  checkFileExist,
  checkFileRead,
  checkFileWrite,
};
