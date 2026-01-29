/**
 * Admin Login Script
 * Handles admin authentication
 */

class AdminLoginManager {
  constructor() {
    this.form = document.getElementById('adminLoginForm');
    this.initializeAdminAccount();
    this.initializeEventListeners();
    this.setupPasswordToggle();
    this.loadRememberedEmail();
  }

  /**
   * Initialize default admin account
   */
  initializeAdminAccount() {
    const adminsKey = 'tipsybeanAdmins';
    const existingAdmins = localStorage.getItem(adminsKey);
    
    if (!existingAdmins) {
      // Create default admin account
      const defaultAdmin = {
        id: 'admin-1',
        email: 'admin@tipsybean.com',
        password: 'Admin@123', // In production, this should be hashed
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(adminsKey, JSON.stringify([defaultAdmin]));
    }
  }

  /**
   * Initialize event listeners
   */
  initializeEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleLogin(e));
  }

  /**
   * Setup password toggle
   */
  setupPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    }
  }

  /**
   * Load remembered email if exists
   */
  loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem('rememberAdminEmail');
    if (rememberedEmail) {
      document.getElementById('email').value = rememberedEmail;
      document.getElementById('rememberMe').checked = true;
    }
  }

  /**
   * Handle login form submission
   */
  handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate inputs
    if (!email || !password) {
      this.showError('Please enter both email and password');
      return;
    }

    // Authenticate admin
    const admin = this.authenticateAdmin(email, password);

    if (admin) {
      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberAdminEmail', email);
      } else {
        localStorage.removeItem('rememberAdminEmail');
      }

      // Create admin session
      this.createAdminSession(admin);

      // Show success and redirect
      this.showSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = './admin-dashboard.html';
      }, 1500);
    } else {
      this.showError('Invalid email or password');
    }
  }

  /**
   * Authenticate admin credentials
   */
  authenticateAdmin(email, password) {
    const adminsKey = 'tipsybeanAdmins';
    const adminsData = localStorage.getItem(adminsKey);
    
    if (!adminsData) return null;

    const admins = JSON.parse(adminsData);
    return admins.find(admin => 
      admin.email.toLowerCase() === email.toLowerCase() && 
      admin.password === password
    );
  }

  /**
   * Create admin session
   */
  createAdminSession(admin) {
    const session = {
      adminId: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: 'admin',
      loginTime: new Date().toISOString()
    };

    sessionStorage.setItem('adminSession', JSON.stringify(session));
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.style.display = 'none';
  }

  /**
   * Show error message
   */
  showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'none';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new AdminLoginManager();
});
