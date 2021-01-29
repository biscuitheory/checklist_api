const { isNil } = require('lodash');

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

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
  const { email, password } = data;
  const errors = [];

  const emailError = emailValidation(email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const passwordError = passwordValidation(password);
  if (passwordError) errors.push({ field: 'password', message: passwordError });

  return errors.length > 0 ? errors : null;
};
