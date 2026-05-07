/**
 * Integration Tests - Signup API Endpoint
 * Testing complete signup flow and error handling
 */

const { expect } = require('chai');
const { signupRoute, users } = require('../../src/routes/auth');
const { generateRandomEmail, generateRandomUsername } = require('../utils/helpers');

describe('Signup API Integration Tests', function() {

  // Clear test users before each test
  beforeEach(function() {
    // Keep only the default test user
    const defaultUsers = new Map([['testuser@test.com', {
      username: 'testuser',
      email: 'testuser@test.com',
      password: 'password123'
    }]]);
    users.clear();
    users.set('testuser@test.com', defaultUsers.get('testuser@test.com'));
  });

  // ============================================
  // SUCCESSFUL SIGNUP SCENARIOS
  // ============================================
  describe('Successful Signup Scenarios', function() {
    
    it('should successfully register with valid credentials', function() {
      const req = {
        body: {
          username: 'newuser',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(201);
      expect(response.json.success).to.be.true;
      expect(response.json.message).to.include('successful');
    });

    it('should register user with different valid email domains', function() {
      const req = {
        body: {
          username: 'user123',
          email: 'user@company.co.uk',
          password: 'SecurePass123',
          confirmPassword: 'SecurePass123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(201);
      expect(response.json.success).to.be.true;
    });

    it('should accept exactly minimum username length (3 chars)', function() {
      const req = {
        body: {
          username: 'abc',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(201);
      expect(response.json.success).to.be.true;
    });

    it('should accept exactly minimum password length (6 chars)', function() {
      const req = {
        body: {
          username: generateRandomUsername(),
          email: generateRandomEmail(),
          password: '123456',
          confirmPassword: '123456'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(201);
      expect(response.json.success).to.be.true;
    });
  });

  // ============================================
  // MISSING FIELDS SCENARIOS
  // ============================================
  describe('Missing Fields Handling', function() {
    
    it('should reject signup with missing username', function() {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('required');
    });

    it('should reject signup with missing email', function() {
      const req = {
        body: {
          username: 'testuser',
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('required');
    });

    it('should reject signup with missing password', function() {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('required');
    });

    it('should reject signup with missing confirmPassword', function() {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('required');
    });

    it('should reject signup with all empty fields', function() {
      const req = {
        body: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
    });
  });

  // ============================================
  // USERNAME VALIDATION SCENARIOS
  // ============================================
  describe('Username Validation', function() {
    
    it('should reject username shorter than 3 characters', function() {
      const req = {
        body: {
          username: 'ab',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('3 characters');
    });

    it('should reject single character username', function() {
      const req = {
        body: {
          username: 'a',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('3 characters');
    });
  });

  // ============================================
  // EMAIL VALIDATION SCENARIOS
  // ============================================
  describe('Email Validation', function() {
    
    it('should reject invalid email format: no @', function() {
      const req = {
        body: {
          username: 'testuser',
          email: 'invalidemail.com',
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('Invalid');
    });

    it('should reject email without domain', function() {
      const req = {
        body: {
          username: 'testuser',
          email: 'user@',
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('Invalid');
    });
  });

  // ============================================
  // PASSWORD VALIDATION SCENARIOS
  // ============================================
  describe('Password Validation', function() {
    
    it('should reject password shorter than 6 characters', function() {
      const req = {
        body: {
          username: 'testuser',
          email: generateRandomEmail(),
          password: 'short',
          confirmPassword: 'short'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('6 characters');
    });

    it('should reject 5 character password (boundary)', function() {
      const req = {
        body: {
          username: 'testuser',
          email: generateRandomEmail(),
          password: '12345',
          confirmPassword: '12345'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
    });
  });

  // ============================================
  // PASSWORD MISMATCH SCENARIOS
  // ============================================
  describe('Password Mismatch Handling', function() {
    
    it('should reject signup when passwords do not match', function() {
      const req = {
        body: {
          username: 'testuser',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: 'DifferentPass123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('do not match');
    });

    it('should reject when confirm password is empty but password is not', function() {
      const req = {
        body: {
          username: 'testuser',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: ''
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
    });
  });

  // ============================================
  // DUPLICATE USER SCENARIOS
  // ============================================
  describe('Duplicate User Prevention', function() {
    
    it('should reject signup with existing email', function() {
      const req = {
        body: {
          username: 'newuser',
          email: 'testuser@test.com',
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(409);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('already exists');
    });

    it('should allow same username with different email', function() {
      const req = {
        body: {
          username: 'testuser',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(201);
      expect(response.json.success).to.be.true;
    });
  });

  // ============================================
  // RESPONSE STRUCTURE VALIDATION
  // ============================================
  describe('Response Structure', function() {
    
    it('should return correct response structure on success', function() {
      const req = {
        body: {
          username: 'testuser',
          email: generateRandomEmail(),
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.json).to.have.property('success');
      expect(response.json).to.have.property('message');
      expect(response.json.success).to.be.true;
    });

    it('should return correct response structure on error', function() {
      const req = {
        body: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.json).to.have.property('success');
      expect(response.json).to.have.property('message');
      expect(response.json.success).to.be.false;
    });
  });

  // ============================================
  // ADVANCED SCENARIOS
  // ============================================
  describe('Advanced Interaction Scenarios', function() {
    
    it('should handle rapid multiple signup attempts', function() {
      const testEmail = generateRandomEmail();
      const req = {
        body: {
          username: 'rapiduser',
          email: testEmail,
          password: 'Password123',
          confirmPassword: 'Password123'
        }
      };
      
      // First signup
      let response1 = {};
      let res1 = {
        status: function(code) {
          response1.status = code;
          return this;
        },
        json: function(data) {
          response1.json = data;
          return this;
        }
      };

      signupRoute(req, res1);
      expect(response1.status).to.equal(201);

      // Duplicate attempt
      let response2 = {};
      let res2 = {
        status: function(code) {
          response2.status = code;
          return this;
        },
        json: function(data) {
          response2.json = data;
          return this;
        }
      };

      signupRoute(req, res2);
      expect(response2.status).to.equal(409);
    });

    it('should handle special characters in input', function() {
      const req = {
        body: {
          username: 'user@123_test',
          email: 'user+tag@example.com',
          password: 'Pass@word#123',
          confirmPassword: 'Pass@word#123'
        }
      };
      
      const response = {};
      const res = {
        status: function(code) {
          response.status = code;
          return this;
        },
        json: function(data) {
          response.json = data;
          return this;
        }
      };

      signupRoute(req, res);

      expect(response.status).to.equal(201);
      expect(response.json.success).to.be.true;
    });
  });

});
