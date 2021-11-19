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
