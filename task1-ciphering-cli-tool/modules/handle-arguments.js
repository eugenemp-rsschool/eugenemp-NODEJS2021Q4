const { ValidationError } = require('./error-validation');
const { handleError } = require('./handle-errors');

// Handle ciphering config=====================================================
const validateCipher = (config) => {
  const configArr = config.split('-');

  try {
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
  try {
    if (!/^(.+)\/([^/]+)$/.test(file)) {
      if (fileType) throw new ValidationError('ERR_INP_PATH');
      else throw new ValidationError('ERR_OUT_PATH');
    }
  } catch (error) {
    handleError(error);
  }

  return file;
};

// Handle arguments and generate output config=================================
const getConfig = (args) => {
  const wrongIdx = [];
  const configIdx = [];
  const inputIdx = [];
  const outputIdx = [];

  try {
    // Parse arguments
    args.forEach((el, i) => {
      if (/^-(-)?([a-z]){1,}/.test(el)) {
        if (/^-c|--config$/.test(el)) configIdx.push(i);
        else if (/^-i|--input$/.test(el)) inputIdx.push(i);
        else if (/^-o|--output$/.test(el)) outputIdx.push(i);
        else wrongIdx.push(i);
      }
    });

    // Check for mandatory opts, duplication and wrong arguments
    if (wrongIdx[0]) throw new ValidationError('ERR_WRG_OPTS');
    if (configIdx[1]) throw new ValidationError('ERR_NO_CFG_OPT');
    if (configIdx[1] || inputIdx[1] || outputIdx[1])
      throw new ValidationError('ERR_DUP_OPTS');
    if (
      args.length > 6 ||
      (!inputIdx[0] && !outputIdx[0] && args.length > 2) ||
      ((!inputIdx[0] || !outputIdx[0]) && args.length > 4)
    )
      throw new ValidationError('ERR_WRG_OPTS');
  } catch (error) {
    handleError(error);
  }
  // Build config
  const config = {
    cipher: validateCipher(args[configIdx[0] + 1]),
    input: inputIdx[0] ? validateFile(args[inputIdx[0] + 1], 1) : null,
    output: outputIdx[0] ? validateFile(args[outputIdx[0] + 1], 0) : null,
  };

  return config;
};

module.exports = {
  getConfig,
};
