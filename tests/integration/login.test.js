/**
 * Integration Tests - Login API Endpoint
 * Testing complete login flow and error handling
 */

const { expect } = require('chai');
const { loginRoute, users } = require('../../src/routes/auth');

describe('Login API Integration Tests', function() {

  // ============================================
  // SUCCESSFUL LOGIN SCENARIOS
  // ============================================
  describe('Successful Login Scenarios', function() {
    
    it('should successfully login with valid credentials', function() {
      const req = {
        body: {
          email: 'testuser@test.com',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.status).to.equal(200);
      expect(response.json.success).to.be.true;
      expect(response.json.message).to.include('successful');
      expect(response.json.username).to.equal('testuser');
    });

    it('should return username in response on successful login', function() {
      const req = {
        body: {
          email: 'testuser@test.com',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.json).to.have.property('username');
      expect(response.json.username).to.be.a('string');
    });
  });

  // ============================================
  // INVALID CREDENTIALS SCENARIOS
  // ============================================
  describe('Invalid Credentials Handling', function() {
    
    it('should reject login with wrong password', function() {
      const req = {
        body: {
          email: 'testuser@test.com',
          password: 'wrongpassword'
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

      loginRoute(req, res);

      expect(response.status).to.equal(401);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('password');
    });

    it('should reject login with non-existing user', function() {
      const req = {
        body: {
          email: 'nonexistent@test.com',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.status).to.equal(401);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('not found');
    });
  });

  // ============================================
  // EMPTY FIELD SCENARIOS
  // ============================================
  describe('Empty/Missing Field Handling', function() {
    
    it('should reject login with empty email', function() {
      const req = {
        body: {
          email: '',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('required');
    });

    it('should reject login with empty password', function() {
      const req = {
        body: {
          email: 'test@test.com',
          password: ''
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('required');
    });

    it('should reject login with missing email field', function() {
      const req = {
        body: {
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
    });

    it('should reject login with missing password field', function() {
      const req = {
        body: {
          email: 'test@test.com'
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
    });

    it('should reject login with both fields empty', function() {
      const req = {
        body: {
          email: '',
          password: ''
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
    });
  });

  // ============================================
  // INVALID EMAIL FORMAT SCENARIOS
  // ============================================
  describe('Invalid Email Format Handling', function() {
    
    it('should reject login with invalid email format: no @', function() {
      const req = {
        body: {
          email: 'invalidemail.com',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('Invalid');
    });

    it('should reject login with email missing domain', function() {
      const req = {
        body: {
          email: 'user@',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('Invalid');
    });

    it('should reject login with email missing local part', function() {
      const req = {
        body: {
          email: '@example.com',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('Invalid');
    });
  });

  // ============================================
  // PASSWORD LENGTH VALIDATION
  // ============================================
  describe('Password Length Validation', function() {
    
    it('should reject password shorter than 6 characters', function() {
      const req = {
        body: {
          email: 'test@test.com',
          password: 'short'
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

      loginRoute(req, res);

      expect(response.status).to.equal(400);
      expect(response.json.success).to.be.false;
      expect(response.json.message).to.include('6 characters');
    });

    it('should accept exactly 6 character password', function() {
      // First add test user with 6 char password
      const testEmail = 'test6char@test.com';
      users.set(testEmail, {
        username: 'test6char',
        email: testEmail,
        password: '123456'
      });

      const req = {
        body: {
          email: testEmail,
          password: '123456'
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

      loginRoute(req, res);

      expect(response.status).to.equal(200);
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
          email: 'testuser@test.com',
          password: 'password123'
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

      loginRoute(req, res);

      expect(response.json).to.have.property('success');
      expect(response.json).to.have.property('message');
      expect(response.json).to.have.property('username');
    });

    it('should return correct response structure on error', function() {
      const req = {
        body: {
          email: '',
          password: ''
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

      loginRoute(req, res);

      expect(response.json).to.have.property('success');
      expect(response.json).to.have.property('message');
      expect(response.json.success).to.be.false;
    });
  });

});
