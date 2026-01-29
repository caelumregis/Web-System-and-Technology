/**
 * Order History Page Script
 * Displays all user orders with filtering capabilities
 */

let orderHistoryManager;

class OrderHistoryManager {
  constructor() {
    this.allOrders = [];
    this.currentFilter = 'all';
    this.initializePage();
  }

  /**
   * Initialize the order history page
   */
  initializePage() {
    // Load all orders
    this.loadOrders();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Render orders
    this.renderOrders();
  }

  /**
   * Load orders from localStorage
   */
  loadOrders() {
    const ordersKey = 'tipsybeanOrders';
    const ordersData = localStorage.getItem(ordersKey);
    this.allOrders = ordersData ? JSON.parse(ordersData) : [];
    
    // Sort orders by date (newest first)
    this.allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        e.currentTarget.classList.add('active');
        
        // Update filter and re-render
        this.currentFilter = e.currentTarget.dataset.filter;
        this.renderOrders();
      });
    });
  }

  /**
   * Get filtered orders based on current filter
   */
  getFilteredOrders() {
    if (this.currentFilter === 'all') {
      return this.allOrders;
    }
    
    return this.allOrders.filter(order => order.status === this.currentFilter);
  }

  /**
   * Render orders in the page
   */
  renderOrders() {
    const container = document.getElementById('ordersContainer');
    const emptyState = document.getElementById('emptyState');
    const orders = this.getFilteredOrders();

    if (!orders || orders.length === 0) {
      container.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }

    container.style.display = 'block';
    emptyState.style.display = 'none';

    let ordersHTML = '';

    orders.forEach(order => {
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
            <button class="btn-track-order" onclick="orderHistoryManager.trackOrder('${order.id}')">
              <i class="fas fa-map-marker-alt"></i> Track Order
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = ordersHTML;
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
   * Get status text for display
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
    return statusTexts[status] || status;
  }

  /**
   * Track order
   */
  trackOrder(orderId) {
    const order = this.allOrders.find(o => o.id === orderId);
    
    if (!order) {
      alert('Order not found');
      return;
    }

    // Build tracking info message
    let trackingInfo = `Order #${orderId}\n\n`;
    trackingInfo += `Status: ${this.getStatusText(order.status)}\n\n`;
    trackingInfo += 'Tracking Progress:\n';
    
    const stages = [
      { key: 'pending', label: 'Order Placed', icon: '✓' },
      { key: 'confirmed', label: 'Order Confirmed', icon: order.status === 'pending' ? '○' : '✓' },
      { key: 'preparing', label: 'Preparing Your Order', icon: ['pending', 'confirmed'].includes(order.status) ? '○' : '✓' },
      { key: 'out-for-delivery', label: 'Out for Delivery', icon: ['pending', 'confirmed', 'preparing'].includes(order.status) ? '○' : '✓' },
      { key: 'delivered', label: 'Delivered', icon: order.status === 'delivered' ? '✓' : '○' }
    ];

    stages.forEach(stage => {
      trackingInfo += `${stage.icon} ${stage.label}\n`;
    });

    alert(trackingInfo);
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

  // Initialize order history manager
  orderHistoryManager = new OrderHistoryManager();
});
