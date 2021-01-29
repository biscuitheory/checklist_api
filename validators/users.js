const { isNil } = require('lodash');

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const firstnameValidation = (firstname) => {
  if (isNil(firstname) || firstname === '') {
    return 'The firstname field must not be empty';
  }
  if (typeof firstname !== 'string') {
    return 'The firstname field must be a string';
  }
  return null;
};

const lastnameValidation = (lastname) => {
  if (isNil(lastname) || lastname === '') {
    return 'The lastname field must not be empty';
  }
  if (typeof lastname !== 'string') {
    return 'The lastname field must be a string';
  }
  return null;
};

const emailValidation = (email) => {
  if (isNil(email) || email === '') {
    return 'The email field must not be empty';
  }
  if (typeof email !== 'string') {
    return 'The email field must be a string';
  }
  if (!EMAIL_REGEX.test(email)) {
    return "The email format must be 'name@domain.com'";
  }
  return null;
};

const passwordValidation = (password) => {
  if (isNil(password) || password === '') {
    return 'The password field must not be empty';
  }
  if (!PWD_REGEX.test(password)) {
    return 'The password should contain at least 8 characters, a capital letter, a number and a special character';
  }
  return null;
};

module.exports = (data) => {
  const { firstname, lastname, email, password } = data;
  const errors = [];

  const firstnameError = firstnameValidation(firstname);
  if (firstnameError)
    errors.push({ field: 'firstname', message: firstnameError });

  const lastnameError = lastnameValidation(lastname);
  if (lastnameError) errors.push({ field: 'lastname', message: lastnameError });

  const emailError = emailValidation(email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const passwordError = passwordValidation(password);
  if (passwordError) errors.push({ field: 'password', message: passwordError });

  return errors.length > 0 ? errors : null;
};
