/**
 * Profile Page Script
 * Handles session management, profile initialization, and logout for the profile page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in, redirect to login if not
  if (!sessionManager.isLoggedIn()) {
    window.location.href = './login.html';
  }

  // Initialize profile manager
  profileManager = new ProfileManager();

  // Show floating cart for logged in users (already guaranteed by redirect above)
  const floatingCartContainer = document.querySelector('.floating-cart-container');
  if (floatingCartContainer) {
    floatingCartContainer.style.display = 'block';
  }

  // Handle logout button click: only show native fallback if Bootstrap isn't loaded
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      // If Bootstrap is available, let the data-bs-toggle modal handle confirmation
      if (window.bootstrap) {
        return;
      }
      // Otherwise prevent default and show native confirm fallback
      e.preventDefault();
      const confirmed = confirm('Are you sure you want to logout?');
      if (confirmed) {
        sessionManager.logout();
        cartManager.clearCart();
        window.location.href = '/index.html';
      }
    });
  }

  // Confirm button inside modal
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener('click', () => {
      sessionManager.logout();
      cartManager.clearCart();
      // Close modal if bootstrap is available
      const modalEl = document.getElementById('logoutConfirmModal');
      if (window.bootstrap && modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 300);
    });
  }
});
