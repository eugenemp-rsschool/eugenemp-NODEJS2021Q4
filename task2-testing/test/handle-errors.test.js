const { expect } = require('@jest/globals');
const { FileError } = require('../modules/error-file');
const { ValidationError } = require('../modules/error-validation');
const { handleError } = require('../modules/handle-errors');

describe('Custom error handler tests', () => {

  afterEach(() => {    
    jest.clearAllMocks();
  });

  const customError = new ValidationError('ERR_WRG_ARGS');
  const normlError = new Error('NORMAL_ERR');

  test('Should call process.exit with code specified in custom error', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

    handleError(customError);
    expect(mockExit).toHaveBeenCalledWith(1001);
  });

  test('Should call process.stderr with message specified in custom error', () => {
    const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});

    handleError(customError);
    expect(mockStderr).toHaveBeenCalledWith('ValidationError: Wrong arguments were passed!');
  });

  test('Should call process.stderr with message specified in non-custom error', () => {
    const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});

    handleError(normlError);
    expect(mockStderr).toHaveBeenCalledWith('Error: NORMAL_ERR');
  });
});
