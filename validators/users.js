const { isNil } = require('lodash');

const firstnameValidation = (firstname) => {
  if (isNil(firstname) || firstname === '') {
    return 'The firstname field must not be empty';
  }
  if (typeof username !== 'string') {
    return 'The firstname field must be a string';
  }
  return null;
};

module.exports = (data) => {
  const { firstname, lastname, email, password } = data;
  // const errors = [];

  const firstnameError = firstnameValidation(firstname);
  if (firstnameError)
    // return errors.push({ field: 'firstname ', message: firstnameError });
    console.log({ field: 'firstname ', message: firstnameError });
  return { field: 'firstname ', message: firstnameError };

  // return errors.length > 0 ? errors : null;
  // console.log(errors.length > 0 ? errors : null);
  return null;
};
