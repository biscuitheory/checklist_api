const { isNil } = require('lodash');

const taskNameValidation = (name) => {
  if (isNil(name) || name === '') {
    return 'The task name field must not be empty';
  }
  if (typeof name !== 'string') {
    return 'The list name field must be a string';
  }
  return null;
};

const taskDescriptionValidation = (description) => {
  if (isNil(description) || description === '') {
    return 'The task description field must not be empty';
  }
  if (typeof description !== 'string') {
    return 'The task description field must be a string';
  }
  return null;
};

const taskListIdValidation = (list_id) => {
  if (isNil(list_id) || list_id === '') {
    return 'The list_id field must not be empty';
  }
  if (typeof list_id !== 'string') {
    return 'The list_id field must be a string';
  }
  return null;
};

module.exports = (data) => {
  const { name, description, list_id } = data;
  const errors = [];

  const taskNameError = taskNameValidation(name);
  if (taskNameError) errors.push({ field: 'name', message: taskNameError });

  const taskDescriptionError = taskDescriptionValidation(description);
  if (taskDescriptionError)
    errors.push({ field: 'description', message: taskDescriptionError });

  const taskListIdError = taskListIdValidation(list_id);
  if (taskListIdError)
    errors.push({ field: 'list_id', message: taskListIdError });

  return errors.length > 0 ? errors : null;
};
