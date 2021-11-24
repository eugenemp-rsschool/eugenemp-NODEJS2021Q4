const { FileError } = require('./error-file');
const { ValidationError } = require('./error-validation');
const { checkFileExist, checkFileRead, checkFileWrite } = require('./utils');

// Valid input options
const regex = [/^-c$|^--config$/, /^-i$|^--input$/, /^-o$|^--output$/];

// Handle ciphering config=====================================================
const validateCipher = (config) => {
  if (!config) throw new ValidationError('ERR_NO_CFG');

  config.split('-').forEach((el) => {
    if (!/^(C[01]|R[01]|A)$/.test(el)) throw new ValidationError('ERR_NO_CFG');
  });

  return config;
};

// Validate file arg===========================================================
const validateFile = (file, fileType) => {
  const invPath = /^(.+)(\/+)$/;

  if (!file || invPath.test(file) || regex.some((el) => el.test(file))) {
    if (fileType) throw new FileError('ERR_INP_PATH');
    if (!fileType) throw new FileError('ERR_OUT_PATH');
  }

  checkFileExist(file, fileType);
  checkFileRead(file, fileType);
  checkFileWrite(file, fileType);

  return file;
};

// Handle arguments and generate output config=================================
const getConfig = (args) => {
  const wrgIdx = [];
  const cnfIdx = [];
  const inpIdx = [];
  const outIdx = [];

  // Parse arguments
  args.forEach((el, i) => {
    if (regex[0].test(el)) cnfIdx.push(i);
    else if (regex[1].test(el)) inpIdx.push(i);
    else if (regex[2].test(el)) outIdx.push(i);
    else if (!regex.some((regx) => regx.test(args[i - 1]))) wrgIdx.push(i);
  });

  // Check for mandatory opts, duplication and wrong arguments
  if (wrgIdx.length > 0) throw new ValidationError('ERR_WRG_ARGS');
  if (cnfIdx.length < 1) throw new ValidationError('ERR_NO_CFG_OPT');
  if (cnfIdx.length > 1 || inpIdx.length > 1 || outIdx.length > 1)
    throw new ValidationError('ERR_DUP_OPTS');

  // Build config
  const config = {
    cipher: validateCipher(args[cnfIdx[0] + 1]).split('-'),
    input: inpIdx.length > 0 ? validateFile(args[inpIdx[0] + 1], 1) : null,
    output: outIdx.length > 0 ? validateFile(args[outIdx[0] + 1], 0) : null,
  };

  return config;
};

module.exports = {
  validateCipher,
  validateFile,
  getConfig,
};
