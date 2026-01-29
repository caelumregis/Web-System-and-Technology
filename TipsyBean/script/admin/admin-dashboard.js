/**
 * Admin Dashboard Script
 * Manages admin panel functionality
 */

class AdminDashboard {
  constructor() {
    this.checkAdminAuth();
    this.loadAdminInfo();
    this.initializeNavigation();
    this.initializeEventListeners();
    this.loadDashboardData();
  }

  /**
   * Check if admin is authenticated
   */
  checkAdminAuth() {
    const adminSession = sessionStorage.getItem('adminSession');
    if (!adminSession) {
      window.location.href = './admin-login.html';
      return;
    }
  }

  /**
   * Load admin information
   */
  loadAdminInfo() {
    const adminSession = JSON.parse(sessionStorage.getItem('adminSession'));
    if (adminSession) {
      document.getElementById('adminName').textContent = `${adminSession.firstName} ${adminSession.lastName}`;
    }
  }

  /**
   * Initialize sidebar navigation
   */
  initializeNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
          section.classList.remove('active');
        });
        
        // Show selected section
        const sectionId = link.dataset.section + '-section';
        document.getElementById(sectionId).classList.add('active');
        
        // Load section data
        this.loadSectionData(link.dataset.section);
      });
    });
  }

  /**
   * Initialize event listeners
   */
  initializeEventListeners() {
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.logout();
    });

    // Add product button
    document.getElementById('saveProductBtn').addEventListener('click', () => {
      this.addProduct();
    });

    // Update order status button
    document.getElementById('updateStatusBtn').addEventListener('click', () => {
      this.updateOrderStatus();
    });
  }

  /**
   * Load dashboard data
   */
  loadDashboardData() {
    this.loadOverviewStats();
    this.loadRecentOrders();
  }

  /**
   * Load section-specific data
   */
  loadSectionData(section) {
    switch(section) {
      case 'overview':
        this.loadOverviewStats();
        this.loadRecentOrders();
        break;
      case 'products':
        this.loadProducts();
        break;
      case 'orders':
        this.loadAllOrders();
        break;
      case 'users':
        this.loadUsers();
        break;
    }
  }

  /**
   * Load overview statistics
   */
  loadOverviewStats() {
    const orders = JSON.parse(localStorage.getItem('tipsybeanOrders') || '[]');
    const users = JSON.parse(localStorage.getItem('tipsybeanUsers') || '[]');

    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    const pendingOrders = orders.filter(o => ['pending', 'confirmed', 'preparing', 'out-for-delivery'].includes(o.status)).length;

    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('completedOrders').textContent = completedOrders;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('totalUsers').textContent = users.length;
  }

  /**
   * Load recent orders
   */
  loadRecentOrders() {
    const orders = JSON.parse(localStorage.getItem('tipsybeanOrders') || '[]');
    const recentOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    const container = document.getElementById('recentOrdersList');
    
    if (recentOrders.length === 0) {
      container.innerHTML = '<p class="text-muted">No orders yet</p>';
      return;
    }

    container.innerHTML = recentOrders.map(order => `
      <div class="order-item mb-3 p-3 border rounded">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <strong>${order.id}</strong>
            <p class="mb-1 text-muted">${new Date(order.createdAt).toLocaleString()}</p>
            <p class="mb-0">Total: ₱${order.total.toFixed(2)}</p>
          </div>
          <span class="status-badge status-${order.status}">${this.getStatusText(order.status)}</span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Load all products
   */
  loadProducts() {
    // For demo purposes, showing message that products are in menu.html
    const container = document.getElementById('productsGrid');
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info">
          <h5><i class="fas fa-info-circle"></i> Product Management</h5>
          <p>Products are currently managed in the menu page HTML structure.</p>
          <p>In a production environment, this section would allow you to:</p>
          <ul>
            <li>Add new products with images</li>
            <li>Edit existing product details</li>
            <li>Delete products</li>
            <li>Manage product categories</li>
          </ul>
          <p class="mb-0"><strong>Current products can be viewed at:</strong> <a href="./menu.html" target="_blank">Menu Page</a></p>
        </div>
      </div>
    `;
  }

  /**
   * Load all orders
   */
  loadAllOrders() {
    const orders = JSON.parse(localStorage.getItem('tipsybeanOrders') || '[]');
    const users = JSON.parse(localStorage.getItem('tipsybeanUsers') || '[]');
    const tbody = document.getElementById('ordersTableBody');

    if (orders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No orders found</td></tr>';
      return;
    }

    tbody.innerHTML = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => {
      const user = users.find(u => u.email === order.userEmail) || {};
      const customerName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Guest';
      
      return `
        <tr>
          <td><strong>${order.id}</strong></td>
          <td>${customerName}</td>
          <td>${new Date(order.createdAt).toLocaleString()}</td>
          <td>₱${order.total.toFixed(2)}</td>
          <td><span class="status-badge status-${order.status}">${this.getStatusText(order.status)}</span></td>
          <td>
            <button class="action-btn btn-view" onclick="adminDashboard.viewOrder('${order.id}')">
              <i class="fas fa-eye"></i> View
            </button>
            <button class="action-btn btn-update" onclick="adminDashboard.openUpdateStatus('${order.id}')">
              <i class="fas fa-edit"></i> Update
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Load all users
   */
  loadUsers() {
    const users = JSON.parse(localStorage.getItem('tipsybeanUsers') || '[]');
    const orders = JSON.parse(localStorage.getItem('tipsybeanOrders') || '[]');
    const tbody = document.getElementById('usersTableBody');

    if (users.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No users found</td></tr>';
      return;
    }

    tbody.innerHTML = users.map(user => {
      const userOrders = orders.filter(o => o.userEmail === user.email).length;
      
      return `
        <tr>
          <td><strong>${user.firstName} ${user.lastName}</strong></td>
          <td>${user.email}</td>
          <td>${new Date(user.createdAt).toLocaleDateString()}</td>
          <td>${userOrders}</td>
          <td>
            <button class="action-btn btn-view" onclick="adminDashboard.viewUser('${user.email}')">
              <i class="fas fa-eye"></i> View
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Add new product (demo)
   */
  addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;

    if (!name || !price) {
      alert('Please fill in all required fields');
      return;
    }

    alert('Product feature is for demonstration. In production, this would add the product to the database.');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    
    // Reset form
    document.getElementById('addProductForm').reset();
  }

  /**
   * Open update status modal
   */
  openUpdateStatus(orderId) {
    const orders = JSON.parse(localStorage.getItem('tipsybeanOrders') || '[]');
    const order = orders.find(o => o.id === orderId);

    if (order) {
      document.getElementById('modalOrderId').textContent = orderId;
      document.getElementById('orderStatus').value = order.status;
      
      // Store current order id for update
      this.currentOrderId = orderId;
      
      const modal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
      modal.show();
    }
  }

  /**
   * Update order status
   */
  updateOrderStatus() {
    const newStatus = document.getElementById('orderStatus').value;
    const orders = JSON.parse(localStorage.getItem('tipsybeanOrders') || '[]');
    
    const orderIndex = orders.findIndex(o => o.id === this.currentOrderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = newStatus;
      localStorage.setItem('tipsybeanOrders', JSON.stringify(orders));
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('updateStatusModal'));
      modal.hide();
      
      // Reload orders
      this.loadAllOrders();
      this.loadOverviewStats();
      
      alert('Order status updated successfully!');
    }
  }

  /**
   * View order details
   */
  viewOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('tipsybeanOrders') || '[]');
    const order = orders.find(o => o.id === orderId);

    if (order) {
      const items = order.items.map(item => `${item.quantity}x ${item.name}`).join(', ');
      alert(`Order Details:\n\nID: ${order.id}\nItems: ${items}\nTotal: ₱${order.total.toFixed(2)}\nStatus: ${this.getStatusText(order.status)}\nAddress: ${order.address.street}, ${order.address.city}`);
    }
  }

  /**
   * View user details
   */
  viewUser(email) {
    const users = JSON.parse(localStorage.getItem('tipsybeanUsers') || '[]');
    const user = users.find(u => u.email === email);

    if (user) {
      alert(`User Details:\n\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nRegistered: ${new Date(user.createdAt).toLocaleDateString()}`);
    }
  }

  /**
   * Get status text
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
   * Logout
   */
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      sessionStorage.removeItem('adminSession');
      window.location.href = './admin-login.html';
    }
  }
}

// Initialize dashboard
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
  adminDashboard = new AdminDashboard();
});
