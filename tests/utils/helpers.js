/**
 * Test Utilities and Helpers
 * Common functions used across test suites
 */

/**
 * Validation helper for email
 */
const emailValidator = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length > 0;
};

/**
 * Validation helper for password
 */
const passwordValidator = (password) => {
  return !!(password && password.length >= 6);
};

/**
 * Validation helper for username
 */
const usernameValidator = (username) => {
  return !!(username && username.length >= 3);
};

/**
 * Check if field is empty
 */
const isFieldEmpty = (field) => {
  return !field || field.trim().length === 0;
};

/**
 * Generate random email for testing
 */
const generateRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(7);
  return `test${randomString}@example.com`;
};

/**
 * Generate random username for testing
 */
const generateRandomUsername = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `user${randomString}`;
};

/**
 * Generate test credentials
 */
const generateTestCredentials = () => {
  return {
    username: generateRandomUsername(),
    email: generateRandomEmail(),
    password: 'TestPass123',
    confirmPassword: 'TestPass123'
  };
};

/**
 * Validation result object
 */
const createValidationResult = (isValid, message = '') => {
  return { isValid, message };
};

/**
 * Test case data provider
 */
const testDataProvider = {
  validEmails: [
    'user@example.com',
    'test.user@domain.co.uk',
    'user+tag@example.com',
    'user123@test.org'
  ],
  invalidEmails: [
    'invalid.email',
    '@nodomain.com',
    'user@',
    'user @example.com',
    'user@.com',
    ''
  ],
  validPasswords: [
    'Password123',
    'SecurePass1',
    '123456',
    'MyPassword@123'
  ],
  invalidPasswords: [
    'pass',
    '123',
    'short',
    '',
    '12345'
  ],
  validUsernames: [
    'user',
    'john_doe',
    'testuser123',
    'admin'
  ],
  invalidUsernames: [
    'ab',
    'a',
    '',
    'u'
  ],
  specialCharacters: [
    'user@#$%',
    'pass!@#$',
    'name<script>',
    'sql\' or \'1\'=\'1'
  ],
  boundaryValues: {
    minUsername: 'abc',
    maxUsername: 'a'.repeat(100),
    minPassword: '123456',
    maxPassword: 'p'.repeat(200)
  }
};

module.exports = {
  emailValidator,
  passwordValidator,
  usernameValidator,
  isFieldEmpty,
  generateRandomEmail,
  generateRandomUsername,
  generateTestCredentials,
  createValidationResult,
  testDataProvider
};
