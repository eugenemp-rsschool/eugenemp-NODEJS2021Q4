const fs = require('fs');
const { FileError } = require('./error-file');
const { handleError } = require('./handle-errors');

// Check file for existence
const checkFileExist = (path, fileType) => {
  try {
    try {
      fs.accessSync(path, fs.constants.F_OK);
    } catch {
      if (fileType) throw new FileError('ERR_INP_FILE_NOT_EXIST');
      else throw new FileError('ERR_OUT_FILE_NOT_EXIST');
    }
  } catch (error) {
    handleError(error);
  }
};

module.exports = {
  checkFileExist,
};
