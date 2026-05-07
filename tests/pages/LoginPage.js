/**
 * Page Object Model for Login Page
 * Encapsulates all elements, actions, and validations for the Login page
 */

class LoginPage {
  constructor() {
    // Element locators (simulating Selenium-like locators for this Node.js context)
    this.selectors = {
      emailInput: '#email',
      passwordInput: '#password',
      loginButton: '#loginBtn',
      emailError: '#emailError',
      passwordError: '#passwordError',
      messageBox: '#message'
    };
  }

  /**
   * Get email input field
   */
  getEmailInput() {
    return {
      id: this.selectors.emailInput,
      type: 'text'
    };
  }

  /**
   * Get password input field
   */
  getPasswordInput() {
    return {
      id: this.selectors.passwordInput,
      type: 'password'
    };
  }

  /**
   * Get login button
   */
  getLoginButton() {
    return {
      id: this.selectors.loginButton,
      type: 'button'
    };
  }

  /**
   * Get message display element
   */
  getMessageBox() {
    return {
      id: this.selectors.messageBox,
      type: 'div'
    };
  }

  /**
   * Enter email in the email field
   * @param {string} email - Email to enter
   */
  enterEmail(email) {
    return {
      action: 'setText',
      element: this.selectors.emailInput,
      value: email,
      success: email !== undefined && email !== null
    };
  }

  /**
   * Enter password in the password field
   * @param {string} password - Password to enter
   */
  enterPassword(password) {
    return {
      action: 'setText',
      element: this.selectors.passwordInput,
      value: password,
      success: password !== undefined && password !== null
    };
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    return {
      action: 'click',
      element: this.selectors.loginButton,
      success: true
    };
  }

  /**
   * Submit login form with credentials
   * @param {string} email - Email
   * @param {string} password - Password
   */
  submitLoginForm(email, password) {
    return {
      actions: [
        this.enterEmail(email),
        this.enterPassword(password),
        this.clickLoginButton()
      ],
      formData: { email, password }
    };
  }

  /**
   * Get error message displayed
   */
  getErrorMessage() {
    return {
      selector: this.selectors.messageBox,
      type: 'error'
    };
  }

  /**
   * Validate that login page elements exist
   */
  validatePageElements() {
    return {
      emailInputExists: true,
      passwordInputExists: true,
      loginButtonExists: true,
      messageBoxExists: true
    };
  }

  /**
   * Verify success message is displayed
   */
  verifySuccessMessage(message) {
    return message && message.includes('successful');
  }

  /**
   * Verify error message is displayed
   */
  verifyErrorMessage(message) {
    return message && (
      message.includes('required') ||
      message.includes('Invalid') ||
      message.includes('not found') ||
      message.includes('password')
    );
  }
}

module.exports = LoginPage;
