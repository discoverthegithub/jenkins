/**
 * Unit Tests for Validation Functions
 * Testing email, password, and username validation logic
 */

const { expect } = require('chai');
const {
  emailValidator,
  passwordValidator,
  usernameValidator,
  isFieldEmpty,
  testDataProvider
} = require('../utils/helpers');

describe('Validation Functions - Unit Tests', function() {

  // ============================================
  // EMAIL VALIDATION TESTS
  // ============================================
  describe('Email Validation', function() {
    
    it('should accept valid email format: user@example.com', function() {
      expect(emailValidator('user@example.com')).to.be.true;
    });

    it('should accept valid email format: test.user@domain.co.uk', function() {
      expect(emailValidator('test.user@domain.co.uk')).to.be.true;
    });

    it('should accept email with plus sign: user+tag@example.com', function() {
      expect(emailValidator('user+tag@example.com')).to.be.true;
    });

    it('should reject email missing @ symbol', function() {
      expect(emailValidator('invalid.email')).to.be.false;
    });

    it('should reject email missing domain: user@', function() {
      expect(emailValidator('user@')).to.be.false;
    });

    it('should reject email with missing local part: @example.com', function() {
      expect(emailValidator('@nodomain.com')).to.be.false;
    });

    it('should reject empty email string', function() {
      expect(emailValidator('')).to.be.false;
    });

    it('should reject email with spaces', function() {
      expect(emailValidator('user @example.com')).to.be.false;
    });

    it('should reject all invalid emails from test data', function() {
      testDataProvider.invalidEmails.forEach(email => {
        expect(emailValidator(email)).to.be.false;
      });
    });

    it('should accept all valid emails from test data', function() {
      testDataProvider.validEmails.forEach(email => {
        expect(emailValidator(email)).to.be.true;
      });
    });
  });

  // ============================================
  // PASSWORD VALIDATION TESTS
  // ============================================
  describe('Password Validation', function() {
    
    it('should accept password with 6 characters: 123456', function() {
      expect(passwordValidator('123456')).to.be.true;
    });

    it('should accept password longer than 6 characters: Password123', function() {
      expect(passwordValidator('Password123')).to.be.true;
    });

    it('should accept password with special characters: Pass@123', function() {
      expect(passwordValidator('Pass@123')).to.be.true;
    });

    it('should reject password with less than 6 characters: pass', function() {
      expect(passwordValidator('pass')).to.be.false;
    });

    it('should reject short password: 123', function() {
      expect(passwordValidator('123')).to.be.false;
    });

    it('should handle empty password string appropriately', function() {
      // Empty string fails length check
      expect(passwordValidator('')).to.be.false;
    });

    it('should handle null password appropriately', function() {
      // Null fails the check
      expect(passwordValidator(null)).to.be.false;
    });

    it('should handle undefined password appropriately', function() {
      // Undefined fails the check
      expect(passwordValidator(undefined)).to.be.false;
    });

    it('should accept all valid passwords from test data', function() {
      testDataProvider.validPasswords.forEach(password => {
        expect(passwordValidator(password)).to.be.true;
      });
    });

    it('should reject short passwords from test data appropriately', function() {
      testDataProvider.invalidPasswords.forEach(password => {
        const result = passwordValidator(password);
        // Empty string and short strings should be rejected
        if (password === '' || password.length < 6) {
          expect(result).to.be.false;
        }
      });
    });

    it('should handle boundary: exactly 6 characters', function() {
      expect(passwordValidator('123456')).to.be.true;
    });

    it('should reject 5 character password: boundary', function() {
      expect(passwordValidator('12345')).to.be.false;
    });
  });

  // ============================================
  // USERNAME VALIDATION TESTS
  // ============================================
  describe('Username Validation', function() {
    
    it('should accept username with 3 characters: abc', function() {
      expect(usernameValidator('abc')).to.be.true;
    });

    it('should accept longer username: testuser123', function() {
      expect(usernameValidator('testuser123')).to.be.true;
    });

    it('should accept username with underscore: user_name', function() {
      expect(usernameValidator('user_name')).to.be.true;
    });

    it('should reject username with 2 characters: ab', function() {
      expect(usernameValidator('ab')).to.be.false;
    });

    it('should reject single character username: a', function() {
      expect(usernameValidator('a')).to.be.false;
    });

    it('should handle empty username string appropriately', function() {
      expect(usernameValidator('')).to.be.false;
    });

    it('should handle null username appropriately', function() {
      expect(usernameValidator(null)).to.be.false;
    });

    it('should handle undefined username appropriately', function() {
      expect(usernameValidator(undefined)).to.be.false;
    });

    it('should accept all valid usernames from test data', function() {
      testDataProvider.validUsernames.forEach(username => {
        expect(usernameValidator(username)).to.be.true;
      });
    });

    it('should reject short usernames from test data appropriately', function() {
      testDataProvider.invalidUsernames.forEach(username => {
        const result = usernameValidator(username);
        // Empty and short usernames should be rejected
        if (username === '' || username.length < 3) {
          expect(result).to.be.false;
        }
      });
    });

    it('should handle boundary: exactly 3 characters', function() {
      expect(usernameValidator('abc')).to.be.true;
    });

    it('should reject 2 character username: boundary', function() {
      expect(usernameValidator('ab')).to.be.false;
    });
  });

  // ============================================
  // FIELD EMPTY VALIDATION TESTS
  // ============================================
  describe('Field Empty Validation', function() {
    
    it('should return true for empty string', function() {
      expect(isFieldEmpty('')).to.be.true;
    });

    it('should return true for whitespace only', function() {
      expect(isFieldEmpty('   ')).to.be.true;
    });

    it('should return true for null', function() {
      expect(isFieldEmpty(null)).to.be.true;
    });

    it('should return true for undefined', function() {
      expect(isFieldEmpty(undefined)).to.be.true;
    });

    it('should return false for valid input', function() {
      expect(isFieldEmpty('validtext')).to.be.false;
    });

    it('should return false for text with numbers', function() {
      expect(isFieldEmpty('user123')).to.be.false;
    });
  });

  // ============================================
  // COMBINED VALIDATION SCENARIOS
  // ============================================
  describe('Combined Validation Scenarios', function() {
    
    it('should validate complete signup form with all valid data', function() {
      const formData = {
        username: 'validuser',
        email: 'user@example.com',
        password: 'Password123'
      };

      expect(usernameValidator(formData.username)).to.be.true;
      expect(emailValidator(formData.email)).to.be.true;
      expect(passwordValidator(formData.password)).to.be.true;
    });

    it('should fail form validation if email is invalid', function() {
      const formData = {
        username: 'validuser',
        email: 'invalidemail',
        password: 'Password123'
      };

      expect(usernameValidator(formData.username)).to.be.true;
      expect(emailValidator(formData.email)).to.be.false;
      expect(passwordValidator(formData.password)).to.be.true;
    });

    it('should fail form validation if password is too short', function() {
      const formData = {
        username: 'validuser',
        email: 'user@example.com',
        password: 'short'
      };

      expect(usernameValidator(formData.username)).to.be.true;
      expect(emailValidator(formData.email)).to.be.true;
      expect(passwordValidator(formData.password)).to.be.false;
    });

    it('should fail form validation if username is too short', function() {
      const formData = {
        username: 'ab',
        email: 'user@example.com',
        password: 'Password123'
      };

      expect(usernameValidator(formData.username)).to.be.false;
      expect(emailValidator(formData.email)).to.be.true;
      expect(passwordValidator(formData.password)).to.be.true;
    });
  });

});
