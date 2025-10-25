// ===== Navbar Animation Script =====
const navbar = document.querySelector(".navbar");

// Fade-in navbar on load
window.addEventListener("load", () => {
  navbar.style.opacity = 0;
  navbar.style.transition = "opacity 2s ease";
  setTimeout(() => (navbar.style.opacity = 1), 200);
});

// Shrink navbar on scroll
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

// Link hover animation
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.transition = "color 0.3s ease";
    link.style.color = "#C59401";
  });
  link.addEventListener("mouseleave", () => {
    link.style.color = "#fff";
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

orderButtons.forEach(btn => {
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
});

window.addEventListener("scroll", () => revealOnScroll(orderSection, revealOrder));

// ===== Footer Section Animation =====
const footer = document.querySelector(".footer-section");
const footerIcons = document.querySelectorAll(".footer-icon-link");

footer.style.opacity = 0;
footer.style.transition = "opacity 1.2s ease-out";

function revealFooter() {
  footer.style.opacity = 1;
}

window.addEventListener("scroll", () => revealOnScroll(footer, revealFooter));

footerIcons.forEach(icon => {
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
});

// Utility function for error handling
function handleError(error, context) {
  console.error(`Error in ${context}:`, error);
  
  // Create and show a Bootstrap toast for user feedback
  const toastContainer = document.getElementById('toastContainer');
  if (toastContainer) {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-danger border-0';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          An error occurred. Please try again later.
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
      toast.remove();
    });
  }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  try {
    initializeNavbar();
    initializeModals();
    initializeSmoothScroll();
    initializeFormValidation();
    initializeTooltips();
    initializeImageLoading();
  } catch (error) {
    handleError(error, 'DOMContentLoaded');
  }
});

// Navbar functionality
function initializeNavbar() {
  try {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    
    if (!navbar) {
      throw new Error('Navbar element not found');
    }

    // Close navbar when clicking on a nav link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && window.innerWidth < 992) {
          bsCollapse.hide();
        }
      });
    });

    // Add active state to nav links based on scroll position
    window.addEventListener('scroll', function() {
      try {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
          const sectionHeight = section.offsetHeight;
          const sectionTop = section.offsetTop - 100;
          const sectionId = section.getAttribute('id');
          const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

          if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              navLink.classList.add('active');
            } else {
              navLink.classList.remove('active');
            }
          }
        });

        // Change navbar background on scroll
        if (scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      } catch (error) {
        handleError(error, 'scroll event');
      }
    });

    // Keyboard navigation for navbar toggler
    if (navbarToggler) {
      navbarToggler.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    }
  } catch (error) {
    handleError(error, 'initializeNavbar');
  }
}

// Modal functionality
function initializeModals() {
  try {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
      // Event listeners for modal lifecycle
      modal.addEventListener('show.bs.modal', function (event) {
        console.log('Modal opening:', modal.id);
      });

      modal.addEventListener('shown.bs.modal', function (event) {
        // Focus on first focusable element when modal opens
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      });

      modal.addEventListener('hidden.bs.modal', function (event) {
        console.log('Modal closed:', modal.id);
      });
    });

    // Error handling for modal triggers
    const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        try {
          const targetModal = document.querySelector(this.getAttribute('data-bs-target'));
          if (!targetModal) {
            throw new Error(`Modal target not found: ${this.getAttribute('data-bs-target')}`);
          }
        } catch (error) {
          e.preventDefault();
          handleError(error, 'modal trigger');
        }
      });
    });
  } catch (error) {
    handleError(error, 'initializeModals');
  }
}

// Smooth scroll functionality
function initializeSmoothScroll() {
  try {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        try {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (!targetElement) {
            throw new Error(`Target element not found: ${targetId}`);
          }

          e.preventDefault();
          
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } catch (error) {
          handleError(error, 'smooth scroll');
        }
      });
    });
  } catch (error) {
    handleError(error, 'initializeSmoothScroll');
  }
}

// Form validation (if forms are added later)
function initializeFormValidation() {
  try {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        try {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        } catch (error) {
          event.preventDefault();
          handleError(error, 'form validation');
        }
      }, false);
    });
  } catch (error) {
    handleError(error, 'initializeFormValidation');
  }
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
  try {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
      try {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      } catch (error) {
        handleError(error, 'tooltip initialization');
        return null;
      }
    });
  } catch (error) {
    handleError(error, 'initializeTooltips');
  }
}

// Image loading error handling
function initializeImageLoading() {
  try {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading state
      img.classList.add('loading');
      
      img.addEventListener('load', function() {
        this.classList.remove('loading');
        this.classList.add('loaded');
      });

      img.addEventListener('error', function() {
        this.classList.remove('loading');
        this.classList.add('error');
        console.error(`Failed to load image: ${this.src}`);
        
        // Optionally set a placeholder image
        // this.src = 'path/to/placeholder.jpg';
        this.alt = 'Image failed to load';
      });

      // Check if image is already loaded (cached)
      if (img.complete) {
        img.classList.remove('loading');
        img.classList.add('loaded');
      }
    });
  } catch (error) {
    handleError(error, 'initializeImageLoading');
  }
}

// External link handling
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function(e) {
    try {
      // Verify the link has a valid href
      if (!this.href || this.href === '#') {
        e.preventDefault();
        throw new Error('Invalid external link');
      }
    } catch (error) {
      handleError(error, 'external link');
    }
  });
});

// Keyboard accessibility improvements
document.addEventListener('keydown', function(e) {
  // ESC key closes modals
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal.show');
    openModals.forEach(modal => {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    });
  }
});

// Performance monitoring (optional)
if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Page load time:', entry.loadEventEnd - entry.fetchStart, 'ms');
        }
      }
    });
    observer.observe({ entryTypes: ['navigation'] });
  } catch (error) {
    console.error('Performance monitoring failed:', error);
  }
}
