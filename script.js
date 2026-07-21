// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar hide/show on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling DOWN
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling UP
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe section headings for animation
document.querySelectorAll('.section__heading').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.8s ease-out';
  observer.observe(el);
});

// Observe cards for staggered animation
document.querySelectorAll('.expertise-card').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
  observer.observe(el);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (scrollTop >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
