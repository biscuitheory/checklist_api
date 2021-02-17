const { isNil } = require('lodash');

const listValidation = (name) => {
  if (isNil(name) || name === '') {
    return 'The list name field must not be empty';
  }
  if (typeof name !== 'string') {
    return 'The list name field must be a string';
  }
  return null;
};

module.exports = (data) => {
  const { name } = data;
  const errors = [];

  const listnameError = listValidation(name);
  if (listnameError) errors.push({ field: 'name', message: listnameError });

  return errors.length > 0 ? errors : null;
};
