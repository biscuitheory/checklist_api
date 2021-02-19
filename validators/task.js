const { isNil } = require('lodash');

const taskNameValidation = (name) => {
  if (isNil(name) || name === '') {
    return 'The list name field must not be empty';
  }
  if (typeof name !== 'string') {
    return 'The list name field must be a string';
  }
  return null;
};

const taskDescriptionValidation = (description) => {
  if (isNil(description) || description === '') {
    return 'The list description field must not be empty';
  }
  if (typeof description !== 'string') {
    return 'The list description field must be a string';
  }
  return null;
};

module.exports = (data) => {
  const { name, description } = data;
  const errors = [];

  const taskNameError = taskNameValidation(name);
  if (taskNameError) errors.push({ field: 'name', message: taskNameError });

  const taskDescriptionError = taskDescriptionValidation(description);
  if (taskDescriptionError)
    errors.push({ field: 'description', message: taskDescriptionError });

  return errors.length > 0 ? errors : null;
};
