const { expect } = require('@jest/globals');
const { ValidationError } = require('../modules/error-validation');
const { handleError } = require('../modules/handle-errors');

describe('Custom error handler tests', () => {
  const mockFns = {
    mockExit: jest.spyOn(process, 'exit').mockImplementation(() => {}),
    mockStderr: jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {}),
  };

  const errors = {
    customError: new ValidationError('ERR_WRG_ARGS'),
    normlError: new Error('NORMAL_ERR'),
  };

  test('Should call process.exit with code specified in custom error', () => {
    handleError(errors.customError);
    expect(mockFns.mockExit).toHaveBeenCalledWith(1001);
  });

  test('Should call process.stderr with message specified in custom error', () => {
    handleError(errors.customError);
    expect(mockFns.mockStderr).toHaveBeenCalledWith(
      'ValidationError: Wrong arguments were passed!'
    );
  });

  test('Should call process.stderr with message specified in non-custom error', () => {
    handleError(errors.normlError);
    expect(mockFns.mockStderr).toHaveBeenCalledWith('Error: NORMAL_ERR');
  });
});
