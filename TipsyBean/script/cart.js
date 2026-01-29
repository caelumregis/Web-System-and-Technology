/**
 * Cart Manager
 * Manages shopping cart functionality using localStorage
 */
class CartManager {
  constructor() {
    this.cartKey = 'tipsybeanCart';
    this.initializeCart();
  }

  /**
   * Initialize cart from localStorage
   */
  initializeCart() {
    if (!localStorage.getItem(this.cartKey)) {
      localStorage.setItem(this.cartKey, JSON.stringify([]));
    }
  }

  /**
   * Setup cart sidebar event listeners
   */
  setupCartSidebar() {
    // Open cart when floating button is clicked
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    if (floatingCartBtn) {
      floatingCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCart();
      });
    }

    // Close cart when close button is clicked
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    if (cartCloseBtn) {
      cartCloseBtn.addEventListener('click', () => {
        this.closeCart();
      });
    }

    // Close cart when overlay is clicked
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
      cartOverlay.addEventListener('click', () => {
        this.closeCart();
      });
    }
  }

  /**
   * Toggle cart sidebar open/close
   */
  toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.toggle('open');
      cartOverlay.classList.toggle('active');
      
      if (cartSidebar.classList.contains('open')) {
        this.renderCartItems();
      }
    }
  }

  /**
   * Close cart sidebar
   */
  closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.remove('open');
      cartOverlay.classList.remove('active');
    }
  }

  /**
   * Render cart items in sidebar
   */
  renderCartItems() {
    const cart = this.getCart();
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      if (cartTotalAmount) cartTotalAmount.textContent = '₱0';
      return;
    }

    const cartHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-qty">${item.quantity}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
        </div>
        <button class="cart-item-remove" onclick="cartManager.removeFromCart('${item.id}')" title="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');

    cartItemsContainer.innerHTML = cartHTML;

    const total = this.getCartTotal();
    if (cartTotalAmount) {
      cartTotalAmount.textContent = `₱${total.toFixed(2)}`;
    }
  }

  /**
   * Get all cart items
   */
  getCart() {
    return JSON.parse(localStorage.getItem(this.cartKey)) || [];
  }

  /**
   * Get cart item count
   */
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get cart total price
   */
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Add item to cart
   * @param {string} itemId - Unique item identifier
   * @param {string} itemName - Name of the item
   * @param {number} price - Price of the item
   * @param {number} quantity - Quantity to add (default: 1)
   */
  addToCart(itemId, itemName, price, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
      // Increase quantity if item already exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        id: itemId,
        name: itemName,
        price: parseFloat(price),
        quantity: quantity
      });
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartUI();
    this.renderCartItems();
    return true;
  }

  /**
   * Remove item from cart
   * @param {string} itemId - Unique item identifier
   */
  removeFromCart(itemId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartUI();
    this.renderCartItems();
    return true;
  }

  /**
   * Update item quantity
   * @param {string} itemId - Unique item identifier
   * @param {number} quantity - New quantity
   */
  updateQuantity(itemId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === itemId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.updateCartUI();
        this.renderCartItems();
      }
    }
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    localStorage.setItem(this.cartKey, JSON.stringify([]));
    this.updateCartUI();
  }

  /**
   * Update cart UI badge and counter
   */
  updateCartUI() {
    const count = this.getCartCount();
    const cartBadge = document.getElementById('cartBadge');
    const floatingCartBadge = document.getElementById('floatingCartBadge');
    const cartCount = document.getElementById('cartCount');

    if (cartBadge) {
      if (count > 0) {
        cartBadge.textContent = count;
        cartBadge.style.display = 'inline-block';
      } else {
        cartBadge.style.display = 'none';
      }
    }

    if (floatingCartBadge) {
      if (count > 0) {
        floatingCartBadge.textContent = count;
        floatingCartBadge.style.display = 'flex';
      } else {
        floatingCartBadge.style.display = 'none';
      }
    }

    if (cartCount) {
      cartCount.textContent = count;
    }
  }
}

// Initialize cart manager globally
const cartManager = new CartManager();

// Update cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
  cartManager.setupCartSidebar();
  cartManager.updateCartUI();
});
