class FileError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FileError';
    this.exitCode = 1000;
  }
}

module.exports = { FileError };
