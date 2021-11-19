const process = require('process');
const { FileError } = require('./error-file');
const { ValidationError } = require('./error-validation');

const errMsgs = {
  ERR_NO_CFG_OPT: `Ciphering configuration is mandatory but was not provided!`,
  ERR_NO_CFG: `Ciphering configuration is missing or ivalid!`,
  ERR_WRG_OPTS: 'Wrong options provided!',
  ERR_DUP_OPTS: `Duplicated options were provided!`,
  ERR_INP_PATH: `Path to input file is missing or its syntax is wrong.`,
  ERR_OUT_PATH: `Path to output file is missing or its syntax is wrong.`,
  ERR_INP_FILE_NOT_EXIST: 'Specified input file does not exist!',
  ERR_OUT_FILE_NOT_EXIST: 'Specified output file does not exist!',
  ERR_INP_FILE_READ: 'You do not have read permission to input file!',
  ERR_OUT_FILE_WRITE: 'You do not have write permission to output file!',
};

const handleError = (error) => {
  if (error instanceof ValidationError || error instanceof FileError) {
    process.stderr.write(`${error.name}: ${errMsgs[error.message]}`);
    process.exit(error.exitCode);
  } else {
    process.stderr.write(`${error.name}: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  handleError,
};
