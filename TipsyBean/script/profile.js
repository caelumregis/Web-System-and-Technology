/**
 * Profile Module
 * Handles user profile management
 * Future: Integrate with backend for data persistence
 */

class ProfileManager {
  constructor() {
    this.profileForm = document.getElementById('profileForm');
    this.emailForm = document.getElementById('emailForm');
    this.confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    this.successMessage = document.getElementById('successMessage');
    this.errorMessage = document.getElementById('errorMessage');

    this.initializeEventListeners();
    this.loadProfileData();
  }

  /**
   * Initialize form event listeners
   */
  initializeEventListeners() {
    this.profileForm.addEventListener('submit', (e) => this.handleProfileSubmit(e));
    this.emailForm.addEventListener('submit', (e) => this.handleEmailSubmit(e));
    this.confirmDeleteBtn.addEventListener('click', () => this.handleDeleteAccount());
  }

  /**
   * Load profile data from localStorage
   */
  loadProfileData() {
    const savedProfile = localStorage.getItem('userProfile');

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      document.getElementById('firstName').value = profile.firstName || '';
      document.getElementById('lastName').value = profile.lastName || '';
      document.getElementById('mobileNumber').value = profile.mobileNumber || '';
      document.getElementById('email').value = profile.email || '';
    } else {
      // Load from session if available
      const session = sessionStorage.getItem('userSession');
      if (session) {
        const userSession = JSON.parse(session);
        document.getElementById('email').value = userSession.email || '';
      }
    }
  }

  /**
   * Validate first name
   */
  validateFirstName(firstName) {
    if (!firstName || firstName.trim().length === 0) {
      return { valid: false, message: 'First name is required' };
    }
    if (firstName.trim().length < 2) {
      return { valid: false, message: 'First name must be at least 2 characters' };
    }
    return { valid: true };
  }

  /**
   * Validate last name
   */
  validateLastName(lastName) {
    if (!lastName || lastName.trim().length === 0) {
      return { valid: false, message: 'Last name is required' };
    }
    if (lastName.trim().length < 2) {
      return { valid: false, message: 'Last name must be at least 2 characters' };
    }
    return { valid: true };
  }

  /**
   * Validate mobile number
   */
  validateMobileNumber(mobileNumber) {
    if (!mobileNumber || mobileNumber.trim().length === 0) {
      return { valid: true }; // Optional field
    }

    // Remove common phone number formatting characters
    const cleanNumber = mobileNumber.replace(/[\s\-\(\)\+]/g, '');

    if (!/^\d{10,}$/.test(cleanNumber)) {
      return {
        valid: false,
        message: 'Please enter a valid mobile number (at least 10 digits)'
      };
    }

    return { valid: true };
  }

  /**
   * Validate email
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim().length === 0) {
      return { valid: false, message: 'Email address is required' };
    }

    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }

    return { valid: true };
  }

  /**
   * Handle profile form submission
   */
  handleProfileSubmit(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;

    // Validate all fields
    const firstNameValidation = this.validateFirstName(firstName);
    const lastNameValidation = this.validateLastName(lastName);
    const mobileValidation = this.validateMobileNumber(mobileNumber);

    if (!firstNameValidation.valid) {
      this.showError(firstNameValidation.message);
      return;
    }

    if (!lastNameValidation.valid) {
      this.showError(lastNameValidation.message);
      return;
    }

    if (!mobileValidation.valid) {
      this.showError(mobileValidation.message);
      return;
    }

    // Save profile data
    const profile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: document.getElementById('email').value.trim(),
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    this.showSuccess('Profile updated successfully!');
  }

  /**
   * Handle email form submission
   */
  handleEmailSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    // Validate email
    const emailValidation = this.validateEmail(email);

    if (!emailValidation.valid) {
      this.showError(emailValidation.message);
      return;
    }

    // Get existing profile
    const savedProfile = localStorage.getItem('userProfile');
    const profile = savedProfile ? JSON.parse(savedProfile) : {};

    // Update email
    profile.email = email.trim();
    profile.updatedAt = new Date().toISOString();

    localStorage.setItem('userProfile', JSON.stringify(profile));
    this.showSuccess('Email updated successfully!');
  }

  /**
   * Handle account deletion
   */
  handleDeleteAccount() {
    // Clear all user data
    localStorage.removeItem('userProfile');
    localStorage.removeItem('rememberEmail');
    sessionManager.clearSession();

    // Show success message and redirect
    this.showSuccess('Account deleted successfully. Redirecting to login...');

    setTimeout(() => {
      window.location.href = './login.html';
    }, 2000);
  }

  /**
   * Handle logout - kept for reference but handled in inline script
   */
  handleLogout() {
    console.log('Logout handler called');
    
    // Clear session
    sessionManager.logout();
    console.log('Session cleared, redirecting...');
    
    // Redirect to home page
    window.location.href = '../../index.html';
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    this.errorMessage.style.display = 'none';
    this.successMessage.style.display = 'block';
    this.successMessage.textContent = message;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.successMessage.style.display = 'none';
    }, 5000);
  }

  /**
   * Show error message
   */
  showError(message) {
    this.successMessage.style.display = 'none';
    this.errorMessage.style.display = 'block';
    this.errorMessage.textContent = message;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.errorMessage.style.display = 'none';
    }, 5000);
  }
}

/**
 * Initialize profile manager when DOM is ready
 * Note: Initialization is now done in profile.html to ensure proper timing
 */
// Removed automatic initialization - now called from profile.html in DOMContentLoaded
