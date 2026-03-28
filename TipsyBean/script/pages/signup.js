/**
 * Signup Page Script
 * Handles user registration and email verification
 */

class SignupManager {
  constructor() {
    this.form = document.getElementById('signupForm');
    this.verificationModal = null;
    this.verificationCode = null;
    this.pendingUserData = null;
    
    this.initializeEventListeners();
    this.setupPasswordToggles();
    this.setupVerificationInputs();
  }

  /**
   * Initialize event listeners
   */
  initializeEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSignup(e));

    // Verification modal buttons
    const verifyBtn = document.getElementById('verifyCodeBtn');
    const resendBtn = document.getElementById('resendCodeBtn');
    const cancelBtn = document.getElementById('cancelVerificationBtn');

    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => this.verifyCode());
    }

    if (resendBtn) {
      resendBtn.addEventListener('click', () => this.resendVerificationCode());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.cancelVerification());
    }
  }

  /**
   * Setup password toggle functionality
   */
  setupPasswordToggles() {
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    }

    if (toggleConfirmPassword && confirmPasswordInput) {
      toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
        confirmPasswordInput.type = type;
        const icon = toggleConfirmPassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    }
  }

  /**
   * Setup verification code inputs
   */
  setupVerificationInputs() {
    const inputs = document.querySelectorAll('.verification-input');
    
    inputs.forEach((input, index) => {
      // Auto-focus next input
      input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Handle backspace
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
          inputs[index - 1].focus();
        }
      });

      // Only allow numbers
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });
    });
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
    if (!/^[a-zA-Z\s'-]+$/.test(firstName)) {
      return { valid: false, message: 'First name can only contain letters' };
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
    if (!/^[a-zA-Z\s'-]+$/.test(lastName)) {
      return { valid: false, message: 'Last name can only contain letters' };
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
   * Validate password strength
   */
  validatePassword(password) {
    if (!password || password.length === 0) {
      return { valid: false, message: 'Password is required' };
    }

    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }

    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }

    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }

    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }

    return { valid: true };
  }

  /**
   * Handle signup form submission
   */
  async handleSignup(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validate all fields
    const firstNameValidation = this.validateFirstName(firstName);
    if (!firstNameValidation.valid) {
      this.showError(firstNameValidation.message);
      return;
    }

    const lastNameValidation = this.validateLastName(lastName);
    if (!lastNameValidation.valid) {
      this.showError(lastNameValidation.message);
      return;
    }

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) {
      this.showError(emailValidation.message);
      return;
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.valid) {
      this.showError(passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      this.showError('Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      this.showError('You must agree to the Terms & Conditions');
      return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('tipsybeanUsers') || '[]');
    const emailExists = existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      this.showError('An account with this email already exists');
      return;
    }

    // Store pending user data
    this.pendingUserData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password: password, // In production, this would be hashed on the server
      createdAt: new Date().toISOString()
    };

    // Generate and send verification code
    this.sendVerificationCode();
  }

  /**
   * Generate and send verification code
   */
  sendVerificationCode() {
    // Generate random 6-digit code
    this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // In production, this would be sent via email through backend
    // For now, we'll show it in console for testing
    console.log('Verification Code:', this.verificationCode);

    // Show verification email in modal
    document.getElementById('verificationEmail').textContent = this.pendingUserData.email;

    // Clear any previous verification inputs
    document.querySelectorAll('.verification-input').forEach(input => {
      input.value = '';
    });
    document.getElementById('code1').focus();

    // Hide any error messages
    document.getElementById('verificationError').style.display = 'none';

    // Open verification modal
    this.verificationModal = new bootstrap.Modal(document.getElementById('verificationModal'));
    this.verificationModal.show();

    this.showSuccess('Verification code sent! (Check console for testing)');
  }

  /**
   * Verify entered code
   */
  verifyCode() {
    // Get entered code
    const code1 = document.getElementById('code1').value;
    const code2 = document.getElementById('code2').value;
    const code3 = document.getElementById('code3').value;
    const code4 = document.getElementById('code4').value;
    const code5 = document.getElementById('code5').value;
    const code6 = document.getElementById('code6').value;

    const enteredCode = code1 + code2 + code3 + code4 + code5 + code6;

    if (enteredCode.length !== 6) {
      this.showVerificationError('Please enter all 6 digits');
      return;
    }

    // Verify code
    if (enteredCode === this.verificationCode) {
      this.completeRegistration();
    } else {
      this.showVerificationError('Invalid verification code. Please try again.');
    }
  }

  /**
   * Complete user registration
   */
async completeRegistration() {
    const userData = this.formData || this.pendingUserData;

    if (!userData || !userData.firstName) {
        console.error("Error: No user data found to send!", this.formData);
        alert("Session expired. Please fill out the form again.");
        return;
    }

    try {
        console.log("Sending this data to server:", userData);
    
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password
            })
        });
    
        const result = await response.json();
    
        if (response.ok) {
            sessionManager.createSession(
                userData.email, 
                userData.firstName, 
                userData.lastName
            );
    
            alert("Account created successfully!");
            
            window.location.href = "./profile.html"; 
        } else {
            alert("Signup failed: " + (result.error || "Unknown error"));
        }
    } catch (error) {
        console.error("📡 Network error:", error);
        alert("Could not connect to the server. Is it running?");
    }
}


  /**
   * Resend verification code
   */
  resendVerificationCode() {
    this.sendVerificationCode();
    this.showSuccess('Verification code resent!');
  }

  /**
   * Cancel verification
   */
  cancelVerification() {
    if (this.verificationModal) {
      this.verificationModal.hide();
    }
    this.pendingUserData = null;
    this.verificationCode = null;
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    errorMsg.style.display = 'none';
    successMsg.style.display = 'block';
    successMsg.textContent = message;

    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }

  /**
   * Show error message
   */
  showError(message) {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    successMsg.style.display = 'none';
    errorMsg.style.display = 'block';
    errorMsg.textContent = message;

    setTimeout(() => {
      errorMsg.style.display = 'none';
    }, 5000);
  }

  /**
   * Show verification error
   */
  showVerificationError(message) {
    const verificationError = document.getElementById('verificationError');
    verificationError.textContent = message;
    verificationError.style.display = 'block';

    setTimeout(() => {
      verificationError.style.display = 'none';
    }, 5000);
  }
}

// Initialize signup manager on page load
document.addEventListener('DOMContentLoaded', () => {
  new SignupManager();
});
