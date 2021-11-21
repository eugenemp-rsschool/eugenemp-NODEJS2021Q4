class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.exitCode = 1001;
  }
}

module.exports = { ValidationError };
