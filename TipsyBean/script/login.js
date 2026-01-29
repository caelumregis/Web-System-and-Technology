/**
 * Login Module
 * Handles user authentication with client-side validation
 * Future: Integrate with backend for secure authentication
 */

class LoginManager {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.rememberMeCheckbox = document.getElementById('rememberMe');
    this.successMessage = document.getElementById('successMessage');
    this.errorMessage = document.getElementById('errorMessage');
    this.emailError = document.getElementById('emailError');
    this.passwordError = document.getElementById('passwordError');

    this.initializeEventListeners();
    this.loadSavedEmail();
  }

  /**
   * Initialize form event listeners
   */
  initializeEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.emailInput.addEventListener('blur', () => this.validateEmail());
    this.passwordInput.addEventListener('blur', () => this.validatePassword());
    this.emailInput.addEventListener('input', () => this.clearEmailError());
    this.passwordInput.addEventListener('input', () => this.clearPasswordError());
  }

  /**
   * Validate email format
   */
  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.setEmailError('Email address is required');
      return false;
    }

    if (!emailRegex.test(email)) {
      this.setEmailError('Please enter a valid email address');
      return false;
    }

    this.clearEmailError();
    return true;
  }

  /**
   * Validate password
   */
  validatePassword() {
    const password = this.passwordInput.value;

    if (!password) {
      this.setPasswordError('Password is required');
      return false;
    }

    if (password.length < 6) {
      this.setPasswordError('Password must be at least 6 characters long');
      return false;
    }

    this.clearPasswordError();
    return true;
  }

  /**
   * Set email error message
   */
  setEmailError(message) {
    this.emailInput.classList.add('is-invalid');
    this.emailError.textContent = message;
  }

  /**
   * Clear email error
   */
  clearEmailError() {
    this.emailInput.classList.remove('is-invalid');
    this.emailError.textContent = '';
  }

  /**
   * Set password error message
   */
  setPasswordError(message) {
    this.passwordInput.classList.add('is-invalid');
    this.passwordError.textContent = message;
  }

  /**
   * Clear password error
   */
  clearPasswordError() {
    this.passwordInput.classList.remove('is-invalid');
    this.passwordError.textContent = '';
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();

    // Clear previous messages
    this.errorMessage.style.display = 'none';
    this.successMessage.style.display = 'none';

    // Validate all fields
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Get form data
    const formData = {
      email: this.emailInput.value.trim(),
      password: this.passwordInput.value,
      rememberMe: this.rememberMeCheckbox.checked
    };

    // Simulate login (replace with actual backend call in future)
    this.performLogin(formData);
  }

  /**
   * Perform login
   * Authenticates against registered users in localStorage
   */
  performLogin(formData) {
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem('tipsybeanUsers') || '[]');

    // Find matching user
    const user = users.find(
      u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
    );

    if (!user) {
      this.showError('Invalid email or password. Please try again.');
      return;
    }

    // Save email if remember me is checked
    if (formData.rememberMe) {
      localStorage.setItem('rememberEmail', formData.email);
    } else {
      localStorage.removeItem('rememberEmail');
    }

    // Simulate successful login
    this.showSuccess();
    this.saveLoginSession(formData.email, user.firstName, user.lastName);

    // Redirect after 2 seconds to home page
    setTimeout(() => {
      window.location.href = '../../index.html';
    }, 2000);
  }

  /**
   * Save login session using SessionManager
   */
  saveLoginSession(email, firstName, lastName) {
    sessionManager.createSession(email, firstName, lastName);
  }

  /**
   * Show success message
   */
  showSuccess() {
    this.successMessage.style.display = 'block';
    this.successMessage.textContent = 'Login successful! Redirecting to your profile...';
  }

  /**
   * Show error message
   */
  showError(message) {
    this.errorMessage.style.display = 'block';
    this.errorMessage.textContent = message;
  }

  /**
   * Load saved email from localStorage if "remember me" was checked
   */
  loadSavedEmail() {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      this.emailInput.value = savedEmail;
      this.rememberMeCheckbox.checked = true;
    }
  }
}

/**
 * Initialize login manager when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new LoginManager();
});
