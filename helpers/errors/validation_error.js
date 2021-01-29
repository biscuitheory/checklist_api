const { BAD_REQUEST } = require('../status_codes');

module.exports = class ValidationError extends Error {
  constructor(errors, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = `ValidationError`;
    this.status = BAD_REQUEST;
    this.errors = errors;
  }
};
