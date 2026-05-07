/**
 * Boundary Value Tests extracted from edge-cases.test.js
 */

const { expect } = require('chai');
const {
  emailValidator,
  passwordValidator,
  usernameValidator
} = require('../utils/helpers');

describe('Boundary Value Testing', function() {
  it('should accept username at minimum boundary: exactly 3 chars', function() {
    expect(usernameValidator('abc')).to.be.true;
  });

  it('should reject username below minimum boundary: 2 chars', function() {
    expect(usernameValidator('ab')).to.be.false;
  });

  it('should accept password at minimum boundary: exactly 6 chars', function() {
    expect(passwordValidator('123456')).to.be.true;
  });

  it('should reject password below minimum boundary: 5 chars', function() {
    expect(passwordValidator('12345')).to.be.false;
  });

  it('should accept very long username: 50+ characters', function() {
    const longUsername = 'a'.repeat(50);
    expect(usernameValidator(longUsername)).to.be.true;
  });

  it('should accept very long password: 100+ characters', function() {
    const longPassword = 'P'.repeat(100);
    expect(passwordValidator(longPassword)).to.be.true;
  });

  it('should accept very long email: valid format with length', function() {
    const longEmail = 'verylongusernameemail@subdomain.example.co.uk';
    expect(emailValidator(longEmail)).to.be.true;
  });
});
