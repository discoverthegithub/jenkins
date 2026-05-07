# Node.js Authentication App + Mocha/Chai + Jenkins Pipeline

## 📋 Project Overview

This project demonstrates a complete **Node.js Authentication Application** with an integrated testing framework using **Mocha** and **Chai**, and a **Jenkins CI/CD Pipeline** for automated testing and deployment.

### Objectives

- Build a secure authentication system with Login/Signup functionality
- Implement automated test suites using Mocha & Chai with Page Object Model (POM)
- Create a Jenkins CI/CD pipeline for continuous integration and deployment
- Demonstrate best practices in Test-Driven Development (TDD)
- Provide scalable and maintainable test architecture

---

## 🏗️ Application Architecture

### Folder Structure

```
nodejs-auth-app/
├── src/
│   ├── app.js                 # Express server configuration
│   └── routes/
│       └── auth.js            # Authentication routes & validation logic
├── public/
│   ├── index.html             # Home page
│   ├── login.html             # Login page
│   └── signup.html            # Signup page
├── tests/
│   ├── unit/
│   │   ├── validation.test.js # Unit tests for validation functions
│   │   └── edge-cases.test.js # Edge case and boundary testing
│   ├── integration/
│   │   ├── login.test.js      # Login API integration tests
│   │   └── signup.test.js     # Signup API integration tests
│   ├── pages/
│   │   ├── LoginPage.js       # Login Page Object Model
│   │   └── SignupPage.js      # Signup Page Object Model
│   └── utils/
│       └── helpers.js         # Test utilities and validators
├── test-reports/              # Generated test reports
├── Jenkinsfile                # Jenkins pipeline configuration
├── package.json               # Project dependencies & scripts
└── README.md                  # Project documentation
```

### Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | v18.x |
| **Framework** | Express.js | ^4.18.2 |
| **Test Runner** | Mocha | ^10.2.0 |
| **Assertion Library** | Chai | ^4.3.7 |
| **CI/CD** | Jenkins | Latest |
| **Test Reporter** | Mochawesome | ^7.1.3 |

---

## 🔐 Authentication Features

### 1. **Login System**
- Email and password validation
- User verification against database
- Error handling for invalid credentials
- Success response with username

### 2. **Signup System**
- Username, email, password validation
- Password confirmation matching
- Duplicate user prevention
- Email format validation
- Boundary testing for input lengths

### 3. **Validation Rules**
- **Email**: Valid format with @ and domain (e.g., user@example.com)
- **Username**: Minimum 3 characters
- **Password**: Minimum 6 characters
- All fields are required (non-empty)

---

## 🧪 Test Architecture

### Test Types & Coverage

| Test Type | Count | Status | Purpose |
|-----------|-------|--------|---------|
| **Unit Tests** | 45+ | ✅ Pass | Validation logic testing |
| **Integration Tests** | 60+ | ✅ Pass | API endpoint behavior |
| **Edge Cases** | 16+ | ✅ Pass | Boundary & special cases |
| **Total Tests** | **121** | ✅ **Pass** | Comprehensive coverage |

### Unit Tests (`tests/unit/`)

#### Validation Functions Test (`validation.test.js`)
Tests core validation logic:
- ✅ Email validation (valid/invalid formats, missing @, missing domain, empty)
- ✅ Password validation (length >= 6, special characters)
- ✅ Username validation (length >= 3, alphanumeric)
- ✅ Field empty checks
- ✅ Combined form validation

#### Edge Cases Test (`edge-cases.test.js`)
Advanced testing scenarios:
- ✅ Special characters handling
- ✅ Boundary value testing (min/max lengths)
- ✅ Security testing (SQL injection attempts)
- ✅ Whitespace and formatting validation
- ✅ Case sensitivity tests
- ✅ Unicode and international characters
- ✅ Null and undefined handling

### Integration Tests (`tests/integration/`)

#### Login API Tests (`login.test.js`)
API endpoint testing:
- ✅ Successful login with valid credentials
- ✅ Invalid password rejection
- ✅ Non-existing user handling
- ✅ Empty field validation
- ✅ Invalid email format detection
- ✅ Password length validation
- ✅ Response structure validation

#### Signup API Tests (`signup.test.js`)
Registration flow testing:
- ✅ Successful registration with valid data
- ✅ Missing fields rejection
- ✅ Username/email/password validation
- ✅ Password mismatch detection
- ✅ Duplicate user prevention
- ✅ Boundary value testing
- ✅ Special character handling
- ✅ Rapid multiple signup attempts
- ✅ Response structure validation

### Page Object Model (POM)

#### LoginPage.js
Encapsulates:
- Element locators (email input, password input, login button)
- Actions (enterEmail, enterPassword, submitForm)
- Validations (verifySuccessMessage, verifyErrorMessage)

#### SignupPage.js
Encapsulates:
- Element locators for all signup form fields
- Actions for form interaction (enter data, submit)
- Validations for error messages and success states
- Form clearing utility

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.x or higher
- **npm** v9.x or higher
- **Jenkins** (for CI/CD pipeline)

### Installation

1. **Clone/Download Repository**
```bash
cd nodejs-auth-app
```

2. **Install Dependencies**
```bash
npm install
```

This installs:
- Express.js framework
- Mocha test runner
- Chai assertion library
- Mochawesome reporter

3. **Verify Installation**
```bash
npm test
```

---

## 📝 Running Tests

### Run All Tests
```bash
npm test
```
Output: All 121 tests with spec reporter

### Run Unit Tests Only
```bash
npm run test:unit
```
Tests validation functions and edge cases

### Run Integration Tests Only
```bash
npm run test:integration
```
Tests API endpoints and flows

### Run Verbose Output
```bash
npm run test:verbose
```
Detailed test execution with spec reporter

### Generate HTML Report
```bash
npm run test:report
```
Generates beautiful HTML report in `test-reports/` directory

---

## 🌐 Running the Application

### Start the Server
```bash
npm start
```

Server runs on: **http://localhost:3000**

### Available Pages
- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Signup**: http://localhost:3000/signup

### API Endpoints
- **POST** `/api/login` - User login
- **POST** `/api/signup` - User registration

---

## 🔄 Jenkins CI/CD Pipeline

### Pipeline Stages

```
┌─────────────────────────────────────────┐
│  1. Checkout Code                       │
│     └─ Pull code from repository        │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  2. Install Dependencies                │
│     └─ npm install                      │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  3. Lint & Code Quality                 │
│     └─ Run code quality checks          │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  4. Unit Tests                          │
│     └─ npm run test:unit (45+ tests)    │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  5. Integration Tests                   │
│     └─ npm run test:integration         │
│        (60+ tests)                      │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  6. Run All Tests                       │
│     └─ npm test (121 total tests)       │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  7. Generate Test Report                │
│     └─ Mochawesome HTML report          │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  8. Archive Artifacts                   │
│     └─ Store test reports               │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  9. Publish Results                     │
│     └─ Display in Jenkins UI            │
└─────────────────────────────────────────┘
```

### Setup Jenkins

#### Step 1: Launch Jenkins
```bash
java -jar jenkins.war
```
Access: http://localhost:8080

#### Step 2: Initial Configuration
1. Unlock Jenkins with secret key
2. Install suggested plugins
3. Create admin user
4. Configure system settings

#### Step 3: Install Required Plugins
- **NodeJS Plugin**: Manage Node.js installations
- **HTML Publisher Plugin**: Publish test reports
- **Git Plugin**: Source code management

Navigate to: **Manage Jenkins** → **Manage Plugins**

#### Step 4: Configure Node.js
1. Go to **Manage Jenkins** → **Tools**
2. Add Node.js installation
3. Set version: **v18.x**
4. Enable automatic installation

#### Step 5: Create Pipeline Job

**Option A: Freestyle Job**
1. New Item → Freestyle Project
2. Source Code Management: Git (your repo)
3. Build Steps:
   ```
   npm install
   npm test
   ```
4. Post-build Actions: Archive artifacts

**Option B: Pipeline Job** (Recommended)
1. New Item → Pipeline
2. Pipeline script from SCM: Git
3. Script path: `Jenkinsfile`
4. Build triggers: Poll SCM or webhooks

#### Step 6: Run Pipeline
1. Click "Build Now"
2. Monitor console output
3. View test results in Jenkins UI
4. Check generated HTML reports

---

## 📊 Test Summary

### Test Breakdown

```
Total Tests: 121
├── Unit Tests: 45+
│   ├── Email Validation: 10
│   ├── Password Validation: 11
│   ├── Username Validation: 11
│   ├── Field Empty Checks: 6
│   └── Combined Scenarios: 4
├── Integration Tests: 60+
│   ├── Login Scenarios: 16
│   ├── Signup Scenarios: 40+
│   └── Advanced Scenarios: 2
└── Edge Cases: 16+
    ├── Special Characters: 9
    ├── Boundary Values: 7
    └── Security: 3

Pass Rate: 100% ✅
Execution Time: ~170ms
```

### Coverage Areas

| Category | Tests | Coverage |
|----------|-------|----------|
| Email Validation | 10 | Format, domain, special chars |
| Password Validation | 11 | Length, complexity, matching |
| Username Validation | 11 | Length, characters, special chars |
| Form Validation | 40+ | Missing fields, combinations |
| API Responses | 20+ | Success, errors, structure |
| Boundary Testing | 15+ | Min/max values, edge cases |
| Security Testing | 3+ | SQL injection, XSS attempts |
| **Total** | **121** | **Comprehensive** |

---

## 🎯 Advanced Test Scenarios

### 1. Boundary Testing
- Exactly 3-character username (minimum)
- Exactly 6-character password (minimum)
- Very long inputs (100+ characters)

### 2. Special Character Handling
- Emails with dots, hyphens, plus signs
- Passwords with @, #, $, ! symbols
- Usernames with underscores, numbers, hyphens

### 3. Security Testing
- SQL injection attempt detection
- XSS attempt handling
- Input sanitization verification

### 4. Rapid Testing
- Multiple signup attempts
- Button spam handling
- Concurrent request simulation

### 5. Data Validation
- Empty field detection
- Whitespace-only input rejection
- Type checking (null, undefined, NaN, arrays, objects)

---

## 📈 Jenkins Pipeline Features

### Build Parameters
- `RUN_INTEGRATION_TESTS`: Toggle integration tests
- `GENERATE_REPORT`: Generate HTML report

### Post-Build Actions
- **Success**: Show "All tests passed, Ready for deployment"
- **Failure**: Alert with error logs
- **Unstable**: Warning status
- **Always**: Summary with build details

### Artifact Management
- Archive test reports
- Store coverage metrics
- Retain 10 most recent builds

### Logging & Monitoring
- Timestamped logs
- Build status display
- Detailed console output

---

## 🛠️ Troubleshooting

### Test Failures
1. Check Node.js version: `node --version`
2. Verify all dependencies: `npm install`
3. Run individual test file: `mocha tests/unit/validation.test.js`
4. Check console for specific error messages

### Jenkins Issues
1. Verify Node.js plugin installation
2. Check Jenkins system logs
3. Ensure Git repository is accessible
4. Verify build environment variables

### Port Conflicts
If port 3000 is in use:
```bash
# Change port in src/app.js
const PORT = 3001; // or any available port
```

---

## 📚 Additional Resources

### Test Reports Location
- Full reports: `test-reports/report.html`
- Spec output: Console terminal
- Jenkins UI: Build > Test Results

### Documentation Files
- **Jenkinsfile**: Pipeline configuration
- **package.json**: Dependencies & scripts
- **test files**: Self-documenting test cases

### Key Files Reference
- `src/app.js`: Server entry point
- `src/routes/auth.js`: Validation & API logic
- `tests/utils/helpers.js`: Test utilities
- `tests/pages/LoginPage.js`: POM for login
- `tests/pages/SignupPage.js`: POM for signup

---

## ✅ Checkpoint Verification

### Local Development
- [ ] Application runs on localhost:3000
- [ ] Login page accessible and styled
- [ ] Signup page accessible and styled
- [ ] All 121 tests passing
- [ ] Test execution time < 200ms

### Jenkins Integration
- [ ] Jenkins server running on localhost:8080
- [ ] Node.js plugin installed and configured
- [ ] Pipeline job created from Jenkinsfile
- [ ] Manual build execution successful
- [ ] All stages completed without errors
- [ ] Test reports generated and archived

---

## 📝 Author Information

**Project**: Node.js Authentication App with CI/CD Pipeline  
**Submission Date**: May 5, 2026  
**Tech Stack**: Node.js, Express, Mocha, Chai, Jenkins  
**Test Framework**: POM-based with unit & integration tests  
**Total Test Coverage**: 121 tests, 100% passing

---

## 📄 License

This project is provided for educational purposes.

---

## 🎓 Learning Outcomes

By completing this project, students will learn:

✅ **Backend Development**: Express.js server setup and API routing  
✅ **Test Automation**: Mocha & Chai testing framework  
✅ **Test Design**: Page Object Model and test organization  
✅ **Input Validation**: Secure validation patterns  
✅ **CI/CD Pipelines**: Jenkins automation and orchestration  
✅ **Best Practices**: Clean code, comprehensive testing, documentation  
✅ **Security**: Validation and error handling  
✅ **Scalability**: Modular test architecture for growth  

---

**Happy Testing! 🚀**

---
> ✅ CI/CD Poll SCM Verified — Auto-trigger test commit (May 7, 2026 1:51 PM)
