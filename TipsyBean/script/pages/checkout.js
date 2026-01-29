/**
 * Checkout Page Script
 * Manages checkout functionality including order review and placement
 */

const DELIVERY_FEE = 50;
const SERVICE_FEE = 10;

class CheckoutManager {
  constructor() {
    this.cart = [];
    this.profile = {};
    this.initializeCheckout();
  }

  /**
   * Initialize checkout page on load
   */
  initializeCheckout() {
    // Load cart and profile data
    this.loadCartData();
    this.loadProfileData();
    
    // Render order items and totals
    this.renderOrderItems();
    this.displayAddress();
    this.calculateTotals();
    
    // Setup event listeners
    this.setupEventListeners();
  }

  /**
   * Load cart data from localStorage
   */
  loadCartData() {
    const cartKey = 'tipsybeanCart';
    const cartData = localStorage.getItem(cartKey);
    this.cart = cartData ? JSON.parse(cartData) : [];
  }

  /**
   * Load profile data from localStorage
   */
  loadProfileData() {
    const profileKey = 'userProfile';
    const profileData = localStorage.getItem(profileKey);
    this.profile = profileData ? JSON.parse(profileData) : {};
  }

  /**
   * Render order items in the checkout page
   */
  renderOrderItems() {
    const container = document.getElementById('orderItemsContainer');
    
    if (!this.cart || this.cart.length === 0) {
      container.innerHTML = '<p class="text-muted">No items in cart</p>';
      return;
    }

    let itemsHTML = '<div class="order-items">';
    
    this.cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      itemsHTML += `
        <div class="order-item">
          <div class="item-details">
            <h5 class="item-name">${item.name}</h5>
            <p class="item-quantity">${item.quantity} x ₱${item.price.toFixed(2)}</p>
          </div>
          <div class="item-price">
            <p class="price-value">₱${itemTotal.toFixed(2)}</p>
          </div>
        </div>
      `;
    });
    
    itemsHTML += '</div>';
    container.innerHTML = itemsHTML;
  }

  /**
   * Display delivery address
   */
  displayAddress() {
    const addressDisplay = document.getElementById('addressDisplay');
    
    if (!this.profile.street || !this.profile.city) {
      addressDisplay.innerHTML = '<p class="text-danger">No address on file. Please edit address.</p>';
      return;
    }

    const addressHTML = `
      <div class="address-info">
        <p><strong>${this.profile.street}</strong></p>
        <p>${this.profile.city}, ${this.profile.province} ${this.profile.postalCode}</p>
        <p>${this.profile.country}</p>
      </div>
    `;
    
    addressDisplay.innerHTML = addressHTML;
  }

  /**
   * Calculate and display order totals
   */
  calculateTotals() {
    const subtotal = this.getSubtotal();
    const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

    document.getElementById('subtotalAmount').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `₱${total.toFixed(2)}`;
  }

  /**
   * Get cart subtotal
   */
  getSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Edit address button
    const editAddressBtn = document.getElementById('editAddressBtn');
    if (editAddressBtn) {
      editAddressBtn.addEventListener('click', () => this.openEditAddressModal());
    }

    // Save address button
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    if (saveAddressBtn) {
      saveAddressBtn.addEventListener('click', () => this.saveAddress());
    }

    // Place order button
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', () => this.placeOrder());
    }

    // Logout button
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    if (confirmLogoutBtn) {
      confirmLogoutBtn.addEventListener('click', () => {
        sessionManager.logout();
        cartManager.clearCart();
        window.location.href = '../../../index.html';
      });
    }
  }

  /**
   * Open edit address modal and populate with current address
   */
  openEditAddressModal() {
    // Populate modal fields with current profile data
    document.getElementById('modalStreet').value = this.profile.street || '';
    document.getElementById('modalCity').value = this.profile.city || '';
    document.getElementById('modalProvince').value = this.profile.province || '';
    document.getElementById('modalPostalCode').value = this.profile.postalCode || '';
    document.getElementById('modalCountry').value = this.profile.country || 'Philippines';

    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('editAddressModal'));
    modal.show();
  }

  /**
   * Save updated address
   */
  saveAddress() {
    const street = document.getElementById('modalStreet').value.trim();
    const city = document.getElementById('modalCity').value.trim();
    const province = document.getElementById('modalProvince').value.trim();
    const postalCode = document.getElementById('modalPostalCode').value.trim();
    const country = document.getElementById('modalCountry').value.trim();

    // Validation
    if (!street || street.length < 5) {
      this.showError('Street address must be at least 5 characters');
      return;
    }
    if (!city || city.length < 2) {
      this.showError('City is required');
      return;
    }
    if (!province || province.length < 2) {
      this.showError('Province is required');
      return;
    }
    if (!postalCode || !/^[0-9A-Za-z\s\-]{3,}$/.test(postalCode)) {
      this.showError('Please enter a valid postal code');
      return;
    }
    if (!country) {
      this.showError('Country is required');
      return;
    }

    // Update profile
    this.profile.street = street;
    this.profile.city = city;
    this.profile.province = province;
    this.profile.postalCode = postalCode;
    this.profile.country = country;
    this.profile.updatedAt = new Date().toISOString();

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(this.profile));

    // Update display
    this.displayAddress();

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editAddressModal'));
    if (modal) {
      modal.hide();
    }

    this.showSuccess('Address updated successfully!');
  }

  /**
   * Place order
   */
  placeOrder() {
    // Validate cart
    if (!this.cart || this.cart.length === 0) {
      this.showError('Your cart is empty');
      return;
    }

    // Validate address
    if (!this.profile.street || !this.profile.city) {
      this.showError('Please add a delivery address');
      return;
    }

    // Get form data
    const additionalNotes = document.getElementById('additionalNotes').value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Create order object
    const order = {
      id: 'ORD-' + Date.now(),
      items: this.cart,
      address: {
        street: this.profile.street,
        city: this.profile.city,
        province: this.profile.province,
        postalCode: this.profile.postalCode,
        country: this.profile.country
      },
      additionalNotes: additionalNotes,
      paymentMethod: paymentMethod,
      subtotal: this.getSubtotal(),
      deliveryFee: DELIVERY_FEE,
      serviceFee: SERVICE_FEE,
      total: this.getSubtotal() + DELIVERY_FEE + SERVICE_FEE,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save order to localStorage (temporary - will use database later)
    const ordersKey = 'tipsybeanOrders';
    const existingOrders = localStorage.getItem(ordersKey);
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.push(order);
    localStorage.setItem(ordersKey, JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('tipsybeanCart');

    // Show success and redirect to order confirmation
    this.showSuccess('Order placed successfully! Redirecting to confirmation...');
    
    setTimeout(() => {
      window.location.href = `./order-confirmation.html?orderId=${order.id}`;
    }, 1500);
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
}

// Initialize checkout manager on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  if (!sessionManager.isLoggedIn()) {
    window.location.href = './login.html';
  }

  // Initialize checkout
  new CheckoutManager();
});
