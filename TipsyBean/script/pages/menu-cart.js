/**
 * Menu Page Cart Integration
 */

class MenuCartManager {
  constructor() {
    this.initializeMenuItems();
    this.setupEventListeners();
  }

  /**
   * Initialize all menu items with cart functionality
   */
  initializeMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
      const itemId = item.getAttribute('data-item-id');
      if (!itemId) return;

      // Check if item is in cart
      const cart = cartManager.getCart();
      const cartItem = cart.find(ci => ci.id === itemId);
      
      if (cartItem) {
        this.showQuantityControls(item, cartItem.quantity);
      }
    });
  }

  /**
   * Setup event listeners for cart buttons
   */
  setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn')) {
        const menuItem = e.target.closest('.menu-item');
        this.handleAddToCart(menuItem);
      }

      // Increase quantity
      if (e.target.closest('.qty-increase-btn')) {
        const menuItem = e.target.closest('.menu-item');
        this.handleIncreaseQuantity(menuItem);
      }

      // Decrease quantity
      if (e.target.closest('.qty-decrease-btn')) {
        const menuItem = e.target.closest('.menu-item');
        this.handleDecreaseQuantity(menuItem);
      }

      // Remove from cart
      if (e.target.closest('.remove-from-cart-btn')) {
        const menuItem = e.target.closest('.menu-item');
        this.handleRemoveFromCart(menuItem);
      }
    });

    // Listen for cart item removal events from cart sidebar
    document.addEventListener('cartItemRemoved', (e) => {
      const itemId = e.detail.itemId;
      const menuItem = document.querySelector(`[data-item-id="${itemId}"]`);
      if (menuItem) {
        this.showAddToCartButton(menuItem);
      }
    });
  }

  /**
   * Handle adding item to cart
   */
  handleAddToCart(menuItem) {
    const itemId = menuItem.getAttribute('data-item-id');
    const itemName = menuItem.getAttribute('data-item-name');
    const itemPrice = parseFloat(menuItem.getAttribute('data-item-price'));

    cartManager.addToCart(itemId, itemName, itemPrice, 1);
    this.showQuantityControls(menuItem, 1);
  }

  /**
   * Handle increasing quantity
   */
  handleIncreaseQuantity(menuItem) {
    const itemId = menuItem.getAttribute('data-item-id');
    const itemName = menuItem.getAttribute('data-item-name');
    const itemPrice = parseFloat(menuItem.getAttribute('data-item-price'));

    cartManager.addToCart(itemId, itemName, itemPrice, 1);
    
    const cart = cartManager.getCart();
    const cartItem = cart.find(ci => ci.id === itemId);
    if (cartItem) {
      this.updateQuantityDisplay(menuItem, cartItem.quantity);
    }
  }

  /**
   * Handle decreasing quantity
   */
  handleDecreaseQuantity(menuItem) {
    const itemId = menuItem.getAttribute('data-item-id');
    const cart = cartManager.getCart();
    const cartItem = cart.find(ci => ci.id === itemId);

    if (cartItem) {
      const newQuantity = cartItem.quantity - 1;
      if (newQuantity <= 0) {
        this.handleRemoveFromCart(menuItem);
      } else {
        cartManager.updateQuantity(itemId, newQuantity);
        this.updateQuantityDisplay(menuItem, newQuantity);
      }
    }
  }

  /**
   * Handle removing item from cart
   */
  handleRemoveFromCart(menuItem) {
    const itemId = menuItem.getAttribute('data-item-id');
    cartManager.removeFromCart(itemId);
    this.showAddToCartButton(menuItem);
  }

  /**
   * Show quantity controls
   */
  showQuantityControls(menuItem, quantity) {
    const controlsContainer = menuItem.querySelector('.menu-item-cart-controls');
    if (!controlsContainer) return;

    controlsContainer.innerHTML = `
      <div class="quantity-controls">
        <button class="qty-btn qty-decrease-btn">
          <i class="fas fa-minus"></i>
        </button>
        <span class="qty-display">${quantity}</span>
        <button class="qty-btn qty-increase-btn">
          <i class="fas fa-plus"></i>
        </button>
        <button class="remove-from-cart-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }

  /**
   * Show add to cart button
   */
  showAddToCartButton(menuItem) {
    const controlsContainer = menuItem.querySelector('.menu-item-cart-controls');
    if (!controlsContainer) return;

    controlsContainer.innerHTML = `
      <button class="add-to-cart-btn">
        <i class="fas fa-plus"></i>
      </button>
    `;
  }

  /**
   * Update quantity display
   */
  updateQuantityDisplay(menuItem, quantity) {
    const qtyDisplay = menuItem.querySelector('.qty-display');
    if (qtyDisplay) {
      qtyDisplay.textContent = quantity;
    }
  }
}

// Initialize menu cart manager after DOM and cart are loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure cartManager is fully loaded
  setTimeout(() => {
    new MenuCartManager();
  }, 100);
});
