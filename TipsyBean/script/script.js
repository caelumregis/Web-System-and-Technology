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
