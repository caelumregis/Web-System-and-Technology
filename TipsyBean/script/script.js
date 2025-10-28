// ===== TIPSY BEAN ENHANCED INTERACTIVE SCRIPT =====
// Enhanced with Bootstrap components and accessibility features

// ===== Navbar Animation Script =====
const navbar = document.querySelector(".navbar");

// Fade-in navbar on load
window.addEventListener("load", () => {
  navbar.style.opacity = 0;
  navbar.style.transition = "opacity 2s ease";
  setTimeout(() => (navbar.style.opacity = 1), 200);
});

// Shrink navbar on scroll with enhanced animation
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.padding = "0.4rem 2rem";
    navbar.style.background = "rgba(0, 0, 0, 0.9)";
    navbar.style.backdropFilter = "blur(6px)";
    navbar.style.transition = "all 0.3s ease";
  } else {
    navbar.style.padding = "0.8rem 2.5vw";
    navbar.style.background = "#000";
  }
});

// Enhanced link hover animation with accessibility
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  // Add focus outline for keyboard navigation
  link.addEventListener("focus", () => {
    link.style.outline = "2px solid #C59401";
    link.style.outlineOffset = "2px";
  });
  
  link.addEventListener("blur", () => {
    link.style.outline = "none";
  });
  
  link.addEventListener("mouseenter", () => {
    link.style.transition = "color 0.3s ease";
    link.style.color = "#C59401";
  });
  
  link.addEventListener("mouseleave", () => {
    link.style.color = "#fff";
  });
  
  // Smooth scroll to sections with offset for fixed navbar
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
        
        // Close mobile navbar if open
        const navbarCollapse = document.querySelector("#navbarNav");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
      }
    }
  });
});

// ===== Hero Banner Animation =====
const heroCaption = document.querySelector(".hero-caption");
const heroImage = document.querySelector(".hero-image");

window.addEventListener("load", () => {
  heroCaption.style.opacity = 0;
  heroCaption.style.transform = "translateY(20px)";
  heroCaption.style.transition = "opacity 1.2s ease, transform 1.2s ease";
  setTimeout(() => {
    heroCaption.style.opacity = 1;
    heroCaption.style.transform = "translateY(0)";
  }, 400);
});

// Subtle breathing effect
let floatUp = true;
setInterval(() => {
  heroCaption.style.transform = floatUp
    ? "translateY(-5px)"
    : "translateY(5px)";
  floatUp = !floatUp;
}, 3000);

// Parallax effect
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
  heroImage.style.transition = "transform 0.1s ease-out";
});

// ===== Reusable Scroll Reveal Function =====
function revealOnScroll(element, callback) {
  const elementTop = element.getBoundingClientRect().top;
  const screenHeight = window.innerHeight * 0.85;

  if (elementTop < screenHeight) {
    callback();
    window.removeEventListener("scroll", arguments.callee);
  }
}

// ===== About Section Animation =====
const aboutSection = document.querySelector(".about-section");
const aboutImage = document.querySelector(".about-image");
const aboutText = document.querySelector(".about-text");

aboutImage.style.opacity = 0;
aboutImage.style.transform = "translateX(-60px)";
aboutText.style.opacity = 0;
aboutText.style.transform = "translateX(60px)";
[aboutImage, aboutText].forEach(el => (el.style.transition = "all 1.2s ease-out"));

function revealAbout() {
  aboutImage.style.opacity = 1;
  aboutImage.style.transform = "translateX(0)";
  aboutText.style.opacity = 1;
  aboutText.style.transform = "translateX(0)";
}

window.addEventListener("scroll", () => revealOnScroll(aboutSection, revealAbout));

// ===== Location Section Animation =====
const locationSection = document.querySelector(".location-section");
const locationPin = document.querySelector(".location-pin");
const locationTitle = document.querySelector(".location-title");
const locationDesc = document.querySelector(".location-description");
const mapButton = document.querySelector(".google-map-btn");

[locationPin, locationTitle, locationDesc, mapButton].forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.9s ease-out";
});

function revealLocation() {
  locationPin.style.opacity = 1;
  locationPin.style.transform = "translateY(0)";

  setTimeout(() => {
    locationTitle.style.opacity = 1;
    locationTitle.style.transform = "translateY(0)";
  }, 200);

  setTimeout(() => {
    locationDesc.style.opacity = 1;
    locationDesc.style.transform = "translateY(0)";
  }, 400);

  setTimeout(() => {
    mapButton.style.opacity = 1;
    mapButton.style.transform = "translateY(0)";
  }, 600);
}

window.addEventListener("scroll", () => revealOnScroll(locationSection, revealLocation));

// ===== Menu Section Animation =====
const menuSection = document.querySelector(".menu-section");
const menuCards = document.querySelectorAll(".menu-card");

menuCards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.9s ease-out";
});

function revealMenu() {
  menuCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, index * 150);
  });
}

menuCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" }
      ],
      { duration: 500, easing: "ease-in-out" }
    );
  });
});

window.addEventListener("scroll", () => revealOnScroll(menuSection, revealMenu));

// ===== Order Section Animation =====
const orderSection = document.querySelector(".order-section");
const orderText = document.querySelector(".order-text");
const orderImage = document.querySelector(".order-image");
const orderButtons = document.querySelectorAll(".order-btn");

orderText.style.opacity = 0;
orderText.style.transform = "translateX(-60px)";
orderImage.style.opacity = 0;
orderImage.style.transform = "translateX(60px)";
[orderText, orderImage].forEach(el => (el.style.transition = "all 1.2s ease-out"));

function revealOrder() {
  orderText.style.opacity = 1;
  orderText.style.transform = "translateX(0)";
  orderImage.style.opacity = 1;
  orderImage.style.transform = "translateX(0)";
}

// ===== Enhanced Button Interactions =====
// Enhanced order buttons with user feedback and accessibility

// Add keyboard accessibility and feedback for order buttons
orderButtons.forEach(btn => {
  // Enhanced hover and focus effects
  btn.addEventListener("mouseenter", () => {
    btn.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.07)" },
        { transform: "scale(1)" }
      ],
      { duration: 600, easing: "ease-in-out" }
    );
  });
  
  // Keyboard focus accessibility
  btn.addEventListener("focus", () => {
    btn.style.outline = "3px solid #fff";
    btn.style.outlineOffset = "3px";
  });
  
  btn.addEventListener("blur", () => {
    btn.style.outline = "none";
  });
  
  // Click feedback with success notification
  btn.addEventListener("click", (e) => {
    // Create success toast notification
    showToast(`Redirecting to ${btn.textContent.trim()}...`, 'success');
    
    // Visual click feedback
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);
  });
});

// Enhanced map button with loading state
if (mapButton) {
  mapButton.addEventListener("focus", () => {
    mapButton.style.outline = "3px solid #fff";
    mapButton.style.outlineOffset = "3px";
  });
  
  mapButton.addEventListener("blur", () => {
    mapButton.style.outline = "none";
  });
  
  mapButton.addEventListener("click", (e) => {
    // Show loading feedback
    const originalText = mapButton.textContent;
    mapButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Opening Maps...';
    mapButton.disabled = true;
    
    // Restore button after delay
    setTimeout(() => {
      mapButton.textContent = originalText;
      mapButton.disabled = false;
    }, 2000);
    
    showToast('Opening Google Maps...', 'info');
  });
}

// ===== Bootstrap Toast Notification System =====
// Create toast container if it doesn't exist
function createToastContainer() {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

// Enhanced toast notification function
function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = createToastContainer();
  
  // Create toast element
  const toastElement = document.createElement('div');
  toastElement.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'primary'} border-0`;
  toastElement.setAttribute('role', 'alert');
  toastElement.setAttribute('aria-live', 'assertive');
  toastElement.setAttribute('aria-atomic', 'true');
  
  toastElement.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  
  toastContainer.appendChild(toastElement);
  
  // Initialize and show toast
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: duration
  });
  
  toast.show();
  
  // Remove element after it's hidden
  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}

window.addEventListener("scroll", () => revealOnScroll(orderSection, revealOrder));

// ===== Enhanced Menu Card Interactions =====
// Add accessibility and visual feedback for menu cards

menuCards.forEach(card => {
  // Keyboard accessibility for menu cards
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'View menu category');
  
  // Enhanced hover animation
  card.addEventListener("mouseenter", () => {
    card.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" }
      ],
      { duration: 500, easing: "ease-in-out" }
    );
  });
  
  // Keyboard focus for accessibility
  card.addEventListener("focus", () => {
    card.style.outline = "3px solid #C59401";
    card.style.outlineOffset = "5px";
  });
  
  card.addEventListener("blur", () => {
    card.style.outline = "none";
  });
  
  // Click interaction with feedback
  card.addEventListener("click", () => {
    const categoryName = card.querySelector(".menu-item-title").textContent;
    showToast(`${categoryName} menu coming soon!`, 'info');
    
    // Visual feedback
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 150);
  });
  
  // Keyboard activation (Enter/Space)
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

// ===== Footer Section Animation Setup =====
const footer = document.querySelector(".footer-section");

footer.style.opacity = 0;
footer.style.transition = "opacity 1.2s ease-out";

function revealFooter() {
  footer.style.opacity = 1;
}

window.addEventListener("scroll", () => revealOnScroll(footer, revealFooter));

// ===== Enhanced Footer Social Links =====

footerIcons.forEach(icon => {
  // Enhanced hover animation with accessibility
  icon.addEventListener("mouseenter", () => {
    icon.animate(
      [
        { transform: "scale(1)", filter: "drop-shadow(0 0 0px #C59401)" },
        { transform: "scale(1.15)", filter: "drop-shadow(0 0 8px #C59401)" },
        { transform: "scale(1)", filter: "drop-shadow(0 0 0px #C59401)" }
      ],
      { duration: 800, easing: "ease-in-out" }
    );
  });
  
  // Keyboard focus accessibility
  icon.addEventListener("focus", () => {
    icon.style.outline = "3px solid #C59401";
    icon.style.outlineOffset = "3px";
  });
  
  icon.addEventListener("blur", () => {
    icon.style.outline = "none";
  });
  
  // Click feedback
  icon.addEventListener("click", () => {
    const platform = icon.getAttribute('aria-label') || 'social media';
    showToast(`Opening ${platform}...`, 'info');
  });
});

// ===== Scroll Progress Indicator =====
// Add a subtle scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #C59401 0%, #a67c52 100%);
    z-index: 9998;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// ===== Error Handling and Fallbacks =====
// Add error handling for external links
function addLinkErrorHandling() {
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      try {
        // Check if the link might fail (basic validation)
        if (!link.href || link.href === '#') {
          e.preventDefault();
          showToast('Link is currently unavailable. Please try again later.', 'error');
          return;
        }
        
        // Add loading state
        const originalText = link.textContent;
        link.style.opacity = '0.7';
        link.style.pointerEvents = 'none';
        
        // Restore link after short delay
        setTimeout(() => {
          link.style.opacity = '1';
          link.style.pointerEvents = 'auto';
        }, 1000);
        
      } catch (error) {
        console.error('Link error:', error);
        showToast('Unable to open link. Please try again.', 'error');
      }
    });
  });
}

// ===== Intersection Observer for Better Performance =====
// Enhanced scroll reveal with Intersection Observer for better performance
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add visible class for CSS animations
        element.classList.add('visible');
        
        // Trigger existing reveal functions based on element class
        if (element.classList.contains('about-section')) {
          revealAbout();
        } else if (element.classList.contains('location-section')) {
          revealLocation();
        } else if (element.classList.contains('menu-section')) {
          revealMenu();
        } else if (element.classList.contains('order-section')) {
          revealOrder();
        } else if (element.classList.contains('footer-section')) {
          revealFooter();
        }
        
        // Stop observing once revealed
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observe all main sections
  const sections = document.querySelectorAll('.about-section, .location-section, .menu-section, .order-section, .footer-section');
  sections.forEach(section => observer.observe(section));
}

// ===== Initialize Enhanced Features =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll progress indicator
  createScrollProgress();
  
  // Setup link error handling
  addLinkErrorHandling();
  
  // Setup intersection observer for better performance
  if ('IntersectionObserver' in window) {
    setupIntersectionObserver();
  }
  
  // Add keyboard navigation announcement
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
});

// ===== Accessibility Enhancements =====
// Add skip link functionality
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link position-absolute';
  skipLink.style.cssText = `
    top: -40px;
    left: 10px;
    background: #000;
    color: #fff;
    padding: 10px;
    text-decoration: none;
    z-index: 10000;
    border-radius: 4px;
    transition: top 0.3s ease;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '10px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize skip link
addSkipLink();
