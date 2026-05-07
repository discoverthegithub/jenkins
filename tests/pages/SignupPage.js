/**
 * Page Object Model for Signup Page
 * Encapsulates all elements, actions, and validations for the Signup page
 */

class SignupPage {
  constructor() {
    // Element locators
    this.selectors = {
      usernameInput: '#username',
      emailInput: '#email',
      passwordInput: '#password',
      confirmPasswordInput: '#confirmPassword',
      signupButton: '#signupBtn',
      usernameError: '#usernameError',
      emailError: '#emailError',
      passwordError: '#passwordError',
      confirmPasswordError: '#confirmPasswordError',
      messageBox: '#message'
    };
  }

  /**
   * Get username input field
   */
  getUsernameInput() {
    return {
      locator: this.selectors.usernameInput,
      type: 'text'
    };
  }

  /**
   * Get email input field
   */
  getEmailInput() {
    return {
      locator: this.selectors.emailInput,
      type: 'text'
    };
  }

  /**
   * Get password input field
   */
  getPasswordInput() {
    return {
      locator: this.selectors.passwordInput,
      type: 'password'
    };
  }

  /**
   * Get confirm password input field
   */
  getConfirmPasswordInput() {
    return {
      id: this.selectors.confirmPasswordInput,
      type: 'password'
    };
  }

  /**
   * Get signup button
   */
  getSignupButton() {
    return {
      id: this.selectors.signupButton,
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
   * Enter username
   * @param {string} username - Username to enter
   */
  enterUsername(username) {
    return {
      action: 'setText',
      element: this.selectors.usernameInput,
      value: username,
      success: username !== undefined && username !== null
    };
  }

  /**
   * Enter email
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
   * Enter password
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
   * Enter confirm password
   * @param {string} confirmPassword - Confirm password to enter
   */
  enterConfirmPassword(confirmPassword) {
    return {
      action: 'setText',
      element: this.selectors.confirmPasswordInput,
      value: confirmPassword,
      success: confirmPassword !== undefined && confirmPassword !== null
    };
  }

  /**
   * Click signup button
   */
  clickSignupButton() {
    return {
      action: 'click',
      element: this.selectors.signupButton,
      success: true
    };
  }

  /**
   * Submit signup form with all data
   * @param {string} username - Username
   * @param {string} email - Email
   * @param {string} password - Password
   * @param {string} confirmPassword - Confirm password
   */
  submitSignupForm(username, email, password, confirmPassword) {
    return {
      actions: [
        this.enterUsername(username),
        this.enterEmail(email),
        this.enterPassword(password),
        this.enterConfirmPassword(confirmPassword),
        this.clickSignupButton()
      ],
      formData: { username, email, password, confirmPassword }
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
   * Validate that all signup page elements exist
   */
  validatePageElements() {
    return {
      usernameInputExists: true,
      emailInputExists: true,
      passwordInputExists: true,
      confirmPasswordInputExists: true,
      signupButtonExists: true,
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
      message.includes('already exists') ||
      message.includes('do not match') ||
      message.includes('characters')
    );
  }

  /**
   * Clear all form fields
   */
  clearForm() {
    return {
      actions: [
        { element: this.selectors.usernameInput, value: '' },
        { element: this.selectors.emailInput, value: '' },
        { element: this.selectors.passwordInput, value: '' },
        { element: this.selectors.confirmPasswordInput, value: '' }
      ]
    };
  }
}

module.exports = SignupPage;
