/**
 * Checks the validity of email and password.
 * @param {string} email - The email to be validated.
 * @param {string} password - The password to be validated.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
exports.checkValidData = (email, password) => {
  /**
   * Regular expression to validate email format.
   * @type {RegExp}
   */
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  /**
   * Regular expression to validate password format.
   * Requires at least one digit, one lowercase letter, one uppercase letter, and minimum length of 8 characters.
   * @type {RegExp}
   */
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  /**
   * Checks if the email is valid.
   * @type {boolean}
   */
  const isEmailValid = emailRegex.test(email);

  /**
   * Checks if the password is valid.
   * @type {boolean}
   */
  const isPasswordValid = passwordRegex.test(password);

  /**
   * Returns an error message if validation fails, otherwise returns null.
   * @type {string|null}
   */
  if (!isEmailValid) return 'Email ID is not valid.';
  if (!isPasswordValid) return 'Password is not valid.';

  return null;
};

// exports.PROD_API_URL = 'https://api.udayteja.com/v1';
exports.PROD_API_URL = 'http://18.207.217.9:4000/v1';

exports.DEV_API_URL = 'http://localhost:4000/v1';