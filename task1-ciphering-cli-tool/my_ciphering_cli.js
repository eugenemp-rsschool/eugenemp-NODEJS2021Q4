const process = require('process');
const { pipeline } = require('stream');
const { getConfig } = require('./modules/handle-arguments');
const { handleError } = require('./modules/handle-errors');
const {
  getReadable,
  getWriteable,
  getTransform,
} = require('./modules/streams');

// Handle input arguments and get config if it validates successfully
const args = process.argv.slice(2);
const config = getConfig(args);

// Get read and write streams
const readable = getReadable(config.input);
const writeable = getWriteable(config.output);

// Get transform streams queue
const transformers = [];

config.cipher.forEach((el) => {
  transformers.push(getTransform(el));
});

// Construct pipeline
pipeline(readable, ...transformers, writeable, (err) => {
  if (err) handleError(err);
});
