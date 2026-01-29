/**
 * Order Confirmation Page Script
 * Displays order confirmation details after successful checkout
 */

class OrderConfirmationManager {
  constructor() {
    this.order = null;
    this.orderId = null;
    this.initializePage();
  }

  /**
   * Initialize the confirmation page
   */
  initializePage() {
    // Get order ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    this.orderId = urlParams.get('orderId');

    if (!this.orderId) {
      // No order ID, redirect to menu
      console.error('No order ID provided');
      setTimeout(() => {
        window.location.href = './menu.html';
      }, 2000);
      return;
    }

    // Load and display order details
    this.loadOrderDetails();
    this.displayOrderDetails();
  }

  /**
   * Load order details from localStorage
   */
  loadOrderDetails() {
    const ordersKey = 'tipsybeanOrders';
    const ordersData = localStorage.getItem(ordersKey);
    
    if (!ordersData) {
      console.error('No orders found');
      return;
    }

    const orders = JSON.parse(ordersData);
    this.order = orders.find(order => order.id === this.orderId);

    if (!this.order) {
      console.error('Order not found:', this.orderId);
    }
  }

  /**
   * Display all order details on the page
   */
  displayOrderDetails() {
    if (!this.order) {
      return;
    }

    // Display order number
    this.displayOrderNumber();
    
    // Display estimated delivery time
    this.displayEstimatedDelivery();
    
    // Display order items
    this.displayOrderItems();
    
    // Display delivery address
    this.displayDeliveryAddress();
    
    // Display additional notes if any
    this.displayAdditionalNotes();
    
    // Display payment method
    this.displayPaymentMethod();
    
    // Display order totals
    this.displayOrderTotals();
  }

  /**
   * Display order number
   */
  displayOrderNumber() {
    const orderNumberEl = document.getElementById('orderNumber');
    if (orderNumberEl) {
      orderNumberEl.textContent = this.order.id;
    }
  }

  /**
   * Calculate and display estimated delivery time
   */
  displayEstimatedDelivery() {
    const estimateEl = document.getElementById('estimatedDelivery');
    if (!estimateEl) return;

    // Calculate delivery time (30-45 minutes from order creation)
    const orderDate = new Date(this.order.createdAt);
    const minDeliveryTime = new Date(orderDate.getTime() + 30 * 60000); // +30 minutes
    const maxDeliveryTime = new Date(orderDate.getTime() + 45 * 60000); // +45 minutes

    // Format time as "HH:MM AM/PM"
    const formatTime = (date) => {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    const minTime = formatTime(minDeliveryTime);
    const maxTime = formatTime(maxDeliveryTime);

    estimateEl.textContent = `${minTime} - ${maxTime}`;
  }

  /**
   * Display order items
   */
  displayOrderItems() {
    const itemsContainer = document.getElementById('orderItems');
    if (!itemsContainer) return;

    itemsContainer.innerHTML = this.order.items.map(item => `
      <div class="order-item">
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-quantity">x${item.quantity}</span>
        </div>
        <div class="item-price">₱${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }

  /**
   * Display delivery address
   */
  displayDeliveryAddress() {
    const addressEl = document.getElementById('deliveryAddress');
    if (!addressEl || !this.order.address) return;

    const addr = this.order.address;
    const addressLines = [
      addr.street,
      `${addr.city}, ${addr.province || ''} ${addr.postalCode || ''}`,
      addr.country
    ].filter(line => line && line.trim());

    addressEl.innerHTML = addressLines.join('<br>');
  }

  /**
   * Display additional notes if provided
   */
  displayAdditionalNotes() {
    const notesSection = document.getElementById('notesSection');
    const notesEl = document.getElementById('additionalNotes');
    
    if (!notesEl || !this.order.additionalNotes) return;

    if (this.order.additionalNotes.trim()) {
      notesSection.style.display = 'block';
      notesEl.textContent = this.order.additionalNotes;
    }
  }

  /**
   * Display payment method
   */
  displayPaymentMethod() {
    const paymentEl = document.getElementById('paymentMethod');
    if (!paymentEl) return;

    const paymentText = this.order.paymentMethod === 'cash' 
      ? 'Cash on Delivery' 
      : this.order.paymentMethod;

    paymentEl.textContent = paymentText;
  }

  /**
   * Display order totals
   */
  displayOrderTotals() {
    // Subtotal
    const subtotalEl = document.getElementById('subtotal');
    if (subtotalEl) {
      subtotalEl.textContent = `₱${this.order.subtotal.toFixed(2)}`;
    }

    // Delivery Fee
    const deliveryFeeEl = document.getElementById('deliveryFee');
    if (deliveryFeeEl) {
      deliveryFeeEl.textContent = `₱${this.order.deliveryFee.toFixed(2)}`;
    }

    // Service Fee
    const serviceFeeEl = document.getElementById('serviceFee');
    if (serviceFeeEl) {
      serviceFeeEl.textContent = `₱${this.order.serviceFee.toFixed(2)}`;
    }

    // Total
    const totalEl = document.getElementById('totalAmount');
    if (totalEl) {
      totalEl.textContent = `₱${this.order.total.toFixed(2)}`;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const sessionManager = new SessionManager();
  if (!sessionManager.isLoggedIn()) {
    window.location.href = './login.html';
    return;
  }

  // Setup logout
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      sessionManager.logout();
      window.location.href = '../../../index.html';
    });
  }

  // Initialize order confirmation
  new OrderConfirmationManager();
});
