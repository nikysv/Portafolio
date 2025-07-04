// ───────── EFECTO TYPEWRITER ─────────
const texts = [
  "Tech is my runway,",
  "code is my strut.",
  "Fashion meets function.",
  "Creativity through code.",
];

let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeWriter() {
  const typewriterElement = document.querySelector(".typewriter-text");
  const fullText = texts[textIndex];

  if (isDeleting) {
    currentText = fullText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentText = fullText.substring(0, charIndex + 1);
    charIndex++;
  }

  typewriterElement.textContent = currentText;

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === fullText.length) {
    speed = 2000; // Pausa al final
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 500; // Pausa antes del siguiente texto
  }

  setTimeout(typeWriter, speed);
}

// ───────── EFECTO PARALLAX PARA FONDO ─────────
let ticking = false;

function updateBackgroundPosition() {
  const scrollY = window.scrollY;
  const body = document.body;

  // Crear múltiples capas de movimiento basado en scroll
  const parallaxOffset1 = scrollY * 0.3;
  const parallaxOffset2 = scrollY * -0.2;
  const parallaxOffset3 = scrollY * 0.15;

  // Aplicar transformaciones dinámicas al pseudo-elemento
  body.style.setProperty("--scroll-y", scrollY + "px");
  body.style.setProperty("--parallax-1", parallaxOffset1 + "px");
  body.style.setProperty("--parallax-2", parallaxOffset2 + "px");
  body.style.setProperty("--parallax-3", parallaxOffset3 + "px");

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateBackgroundPosition);
    ticking = true;
  }
}

// ───────── MENÚ HAMBURGUESA RESPONSIVE ─────────
function initHamburgerMenu() {
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");
  const navLinks = document.querySelectorAll(".nav__link");

  // Toggle del menú
  navToggle.addEventListener("click", function () {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

    // Cambiar el estado
    navToggle.setAttribute("aria-expanded", !isExpanded);
    navToggle.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("active");
      navList.classList.remove("active");
    });
  });

  // Cerrar menú al redimensionar la ventana (si se vuelve a escritorio)
  window.addEventListener("resize", function () {
    if (window.innerWidth > 600) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("active");
      navList.classList.remove("active");
    }
  });
}

// ───────── ANIMACIONES DE SCROLL ─────────
function initScrollAnimations() {
  // Intersection Observer para animaciones de scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px", // Se activa cuando el elemento está 100px dentro del viewport
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Una vez que el elemento es visible, no necesitamos seguir observándolo
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todos los elementos con animaciones de scroll
  const animatedElements = document.querySelectorAll(".scroll-animate");

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// ───────── ANIMACIONES INICIALES HERO ─────────
function initHeroAnimations() {
  const heroTitle = document.querySelector(".hero__title");
  const heroPortrait = document.querySelector(".hero__portrait");
  const heroTagline = document.querySelector(".hero__tagline");
  const heroSocial = document.querySelector(".hero__social");

  // Animación inicial del hero
  setTimeout(() => {
    heroTitle.style.opacity = "1";
    heroTitle.style.transform = "translateY(0)";
  }, 300);

  setTimeout(() => {
    heroPortrait.style.opacity = "1";
    heroPortrait.style.transform = "translateY(0) scale(1)";
  }, 600);

  setTimeout(() => {
    heroTagline.style.opacity = "1";
    heroTagline.style.transform = "translateY(0)";
  }, 900);

  // Animación de las redes sociales
  setTimeout(() => {
    if (heroSocial) {
      heroSocial.style.opacity = "1";
      heroSocial.style.transform = "translateY(0)";

      // Animar cada card social individualmente
      const socialCards = heroSocial.querySelectorAll(".social-card");
      socialCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0) scale(1)";
        }, index * 150);
      });
    }
  }, 1200);
}

// ───────── INICIALIZACIÓN ─────────
document.addEventListener("DOMContentLoaded", function () {
  // Iniciar el efecto typewriter
  setTimeout(typeWriter, 1000);

  // Inicializar animaciones de scroll
  initScrollAnimations();

  // Inicializar animaciones del hero
  initHeroAnimations();

  // Inicializar menú hamburguesa
  initHamburgerMenu();
});

// Inicializar parallax
window.addEventListener("scroll", requestTick);
