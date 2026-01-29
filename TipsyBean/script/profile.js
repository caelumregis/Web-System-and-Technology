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
    this.loadOrders();
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
      document.getElementById('street').value = profile.street || '';
      document.getElementById('city').value = profile.city || '';
      document.getElementById('province').value = profile.province || '';
      document.getElementById('postalCode').value = profile.postalCode || '';
      document.getElementById('country').value = profile.country || 'Philippines';
    } else {
      // Load from session if available
      const session = sessionStorage.getItem('userSession');
      if (session) {
        const userSession = JSON.parse(session);
        document.getElementById('email').value = userSession.email || '';
      }
      // Set default country
      document.getElementById('country').value = 'Philippines';
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
   * Validate street address
   */
  validateStreet(street) {
    if (!street || street.trim().length === 0) {
      return { valid: false, message: 'Street address is required' };
    }
    if (street.trim().length < 5) {
      return { valid: false, message: 'Street address must be at least 5 characters' };
    }
    return { valid: true };
  }

  /**
   * Validate city
   */
  validateCity(city) {
    if (!city || city.trim().length === 0) {
      return { valid: false, message: 'City is required' };
    }
    if (city.trim().length < 2) {
      return { valid: false, message: 'City must be at least 2 characters' };
    }
    return { valid: true };
  }

  /**
   * Validate province
   */
  validateProvince(province) {
    if (!province || province.trim().length === 0) {
      return { valid: false, message: 'Province is required' };
    }
    if (province.trim().length < 2) {
      return { valid: false, message: 'Province must be at least 2 characters' };
    }
    return { valid: true };
  }

  /**
   * Validate postal code
   */
  validatePostalCode(postalCode) {
    if (!postalCode || postalCode.trim().length === 0) {
      return { valid: false, message: 'Postal code is required' };
    }
    // Allow various postal code formats
    if (!/^[0-9A-Za-z\s\-]{3,}$/.test(postalCode)) {
      return { valid: false, message: 'Please enter a valid postal code' };
    }
    return { valid: true };
  }

  /**
   * Validate country
   */
  validateCountry(country) {
    if (!country || country.trim().length === 0) {
      return { valid: false, message: 'Country is required' };
    }
    return { valid: true };
  }
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
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const postalCode = document.getElementById('postalCode').value;
    const country = document.getElementById('country').value;

    // Validate all fields
    const firstNameValidation = this.validateFirstName(firstName);
    const lastNameValidation = this.validateLastName(lastName);
    const mobileValidation = this.validateMobileNumber(mobileNumber);
    const streetValidation = this.validateStreet(street);
    const cityValidation = this.validateCity(city);
    const provinceValidation = this.validateProvince(province);
    const postalCodeValidation = this.validatePostalCode(postalCode);
    const countryValidation = this.validateCountry(country);

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

    if (!streetValidation.valid) {
      this.showError(streetValidation.message);
      return;
    }

    if (!cityValidation.valid) {
      this.showError(cityValidation.message);
      return;
    }

    if (!provinceValidation.valid) {
      this.showError(provinceValidation.message);
      return;
    }

    if (!postalCodeValidation.valid) {
      this.showError(postalCodeValidation.message);
      return;
    }

    if (!countryValidation.valid) {
      this.showError(countryValidation.message);
      return;
    }

    // Save profile data
    const profile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: document.getElementById('email').value.trim(),
      street: street.trim(),
      city: city.trim(),
      province: province.trim(),
      postalCode: postalCode.trim(),
      country: country.trim(),
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
   * Load and display orders
   */
  loadOrders() {
    const ordersKey = 'tipsybeanOrders';
    const ordersData = localStorage.getItem(ordersKey);
    const orders = ordersData ? JSON.parse(ordersData) : [];

    this.renderOrders(orders);
  }

  /**
   * Render orders in the profile page
   */
  renderOrders(orders) {
    const container = document.getElementById('ordersContainer');

    if (!orders || orders.length === 0) {
      container.innerHTML = '<p class="text-muted">No orders yet. <a href="./menu.html">Start shopping!</a></p>';
      return;
    }

    // Sort orders by date (newest first)
    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Limit to 2 orders for profile page
    const limitedOrders = sortedOrders.slice(0, 2);

    let ordersHTML = '';

    limitedOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const formattedDate = orderDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const statusClass = this.getStatusClass(order.status);
      const statusText = this.getStatusText(order.status);

      ordersHTML += `
        <div class="order-card">
          <div class="order-header">
            <div class="order-info">
              <h5 class="order-id">Order #${order.id}</h5>
              <p class="order-date">${formattedDate}</p>
            </div>
            <div class="order-status">
              <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
          </div>

          <div class="order-body">
            <div class="order-items-list">
              <h6>Items:</h6>
              <ul>
                ${order.items.map(item => `
                  <li>${item.quantity}x ${item.name} - ₱${(item.price * item.quantity).toFixed(2)}</li>
                `).join('')}
              </ul>
            </div>

            <div class="order-details-row">
              <div class="order-detail">
                <span class="detail-label">Delivery Address:</span>
                <span class="detail-value">${order.address.street}, ${order.address.city}</span>
              </div>
              ${order.additionalNotes ? `
                <div class="order-detail">
                  <span class="detail-label">Notes:</span>
                  <span class="detail-value">${order.additionalNotes}</span>
                </div>
              ` : ''}
              <div class="order-detail">
                <span class="detail-label">Payment:</span>
                <span class="detail-value">${order.paymentMethod === 'cash' ? 'Cash on Delivery' : order.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div class="order-footer">
            <div class="order-total">
              <span class="total-label">Total Amount:</span>
              <span class="total-amount">₱${order.total.toFixed(2)}</span>
            </div>
            <button class="btn-track-order" onclick="profileManager.trackOrder('${order.id}')">
              <i class="fas fa-map-marker-alt"></i> Track Order
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = ordersHTML;
    
    // Add "View All Orders" button if there are more than 2 orders
    if (sortedOrders.length > 2) {
      const viewAllBtn = document.getElementById('viewAllOrdersBtn');
      if (viewAllBtn) {
        viewAllBtn.style.display = 'inline-block';
      }
    }
  }

  /**
   * Get status class for styling
   */
  getStatusClass(status) {
    const statusClasses = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'preparing': 'status-preparing',
      'out-for-delivery': 'status-delivering',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return statusClasses[status] || 'status-pending';
  }

  /**
   * Get status display text
   */
  getStatusText(status) {
    const statusTexts = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'preparing': 'Preparing',
      'out-for-delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statusTexts[status] || 'Pending';
  }

  /**
   * Track specific order
   */
  trackOrder(orderId) {
    // Find the order
    const ordersData = localStorage.getItem('tipsybeanOrders');
    const orders = ordersData ? JSON.parse(ordersData) : [];
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      this.showError('Order not found');
      return;
    }

    // Show order tracking info
    const trackingStages = [
      { stage: 'pending', label: 'Order Placed', completed: true },
      { stage: 'confirmed', label: 'Order Confirmed', completed: ['confirmed', 'preparing', 'out-for-delivery', 'delivered'].includes(order.status) },
      { stage: 'preparing', label: 'Preparing Order', completed: ['preparing', 'out-for-delivery', 'delivered'].includes(order.status) },
      { stage: 'out-for-delivery', label: 'Out for Delivery', completed: ['out-for-delivery', 'delivered'].includes(order.status) },
      { stage: 'delivered', label: 'Delivered', completed: order.status === 'delivered' }
    ];

    let trackingHTML = `
      <div class="tracking-modal-content">
        <h4>Order Tracking - #${orderId}</h4>
        <div class="tracking-timeline">
    `;

    trackingStages.forEach((stage, index) => {
      const isActive = order.status === stage.stage;
      const completedClass = stage.completed ? 'completed' : '';
      const activeClass = isActive ? 'active' : '';

      trackingHTML += `
        <div class="tracking-stage ${completedClass} ${activeClass}">
          <div class="stage-icon">
            <i class="fas ${stage.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
          </div>
          <div class="stage-label">${stage.label}</div>
        </div>
      `;

      if (index < trackingStages.length - 1) {
        trackingHTML += `<div class="stage-connector ${stage.completed && trackingStages[index + 1].completed ? 'completed' : ''}"></div>`;
      }
    });

    trackingHTML += `
        </div>
        <p class="tracking-info">Current Status: <strong>${this.getStatusText(order.status)}</strong></p>
      </div>
    `;

    // Show in a simple alert for now (could be enhanced with a modal)
    alert(`Order #${orderId}\nStatus: ${this.getStatusText(order.status)}\n\nTracking details displayed in the page.`);
    
    // You could create a modal here for better UX
    this.showSuccess(`Order tracking for #${orderId} - Status: ${this.getStatusText(order.status)}`);
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

// Make profileManager globally accessible for onclick handlers
let profileManager;

/**
 * Initialize profile manager when DOM is ready
 * Note: Initialization is now done in profile.html to ensure proper timing
 */
// Removed automatic initialization - now called from profile.html in DOMContentLoaded
