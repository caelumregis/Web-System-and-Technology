/**
 * Menu Page Script
 * Handles session management and navbar display for the menu page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in and update navbar accordingly
  const isLoggedIn = sessionManager.isLoggedIn();
  const authLinks = document.getElementById('authLinks');
  const signupLink = document.getElementById('signupLink');
  const profileLink = document.getElementById('profileLink');
  const logoutLink = document.getElementById('logoutLink');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

  if (isLoggedIn) {
    // Hide login/signup, show profile/logout
    authLinks.style.display = 'none';
    signupLink.style.display = 'none';
    profileLink.style.display = 'block';
    logoutLink.style.display = 'block';

    // Show floating cart for logged in users
    const floatingCartContainer = document.querySelector('.floating-cart-container');
    if (floatingCartContainer) {
      floatingCartContainer.style.display = 'block';
    }

    // Handle logout confirmation
    if (confirmLogoutBtn) {
      confirmLogoutBtn.addEventListener('click', () => {
        sessionManager.logout();
        cartManager.clearCart();
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('logoutConfirmModal'));
        if (modal) {
          modal.hide();
        }
        // Refresh page to show Login/Sign Up buttons
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  } else {
    // Show login/signup, hide profile/logout
    authLinks.style.display = 'block';
    signupLink.style.display = 'block';
    profileLink.style.display = 'none';
    logoutLink.style.display = 'none';

    // Hide floating cart for logged out users
    const floatingCartContainer = document.querySelector('.floating-cart-container');
    if (floatingCartContainer) {
      floatingCartContainer.style.display = 'none';
    }
  }

  // Scroll to anchor if present in URL
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
});
