const { ValidationError } = require('./error-validation');
const { handleError } = require('./handle-errors');

// Input params patterns
const regex = [/^-c$|^--config$/, /^-i$|^--input$/, /^-o$|^--output$/];

// Handle ciphering config=====================================================
const validateCipher = (config) => {
  let configArr;

  try {
    if (!config) throw new ValidationError('ERR_NO_CFG');

    configArr = config.split('-');
    configArr.forEach((el) => {
      if (!/^(C[01]|R[01]|A)$/.test(el))
        throw new ValidationError('ERR_NO_CFG');
    });
  } catch (error) {
    handleError(error);
  }

  return configArr;
};

// Validate file arg===========================================================
const validateFile = (file, fileType) => {
  let outFile = file;
  
  try {
    if (!/^(.+)\/([^/]+)$/.test(file)) {
      if (!file || regex.some((regx) => regx.test(file)) || file === './') {
        if (fileType) throw new ValidationError('ERR_INP_PATH');
        else throw new ValidationError('ERR_OUT_PATH');

      } else outFile = `./${file}`;

    }
  } catch (error) {
    handleError(error);
  }

  return outFile;
  
};

// Handle arguments and generate output config=================================
const getConfig = (args) => {
  const wrgIdx = [];
  const cnfIdx = [];
  const inpIdx = [];
  const outIdx = [];

  try {
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
  } catch (error) {
    handleError(error);
  }

  // Build config
  const config = {
    cipher: validateCipher(args[cnfIdx[0] + 1]),
    input: inpIdx.length > 0 ? validateFile(args[inpIdx[0] + 1], 1) : null,
    output: outIdx.length > 0 ? validateFile(args[outIdx[0] + 1], 0) : null,
  };

  return config;
};

module.exports = {
  getConfig,
};
