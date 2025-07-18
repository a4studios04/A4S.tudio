// Particle Background Effect
function createParticles() {
  const particlesContainer = document.getElementById('particles-bg');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#ff3d3d';
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particlesContainer.appendChild(particle);

    anime({
      targets: particle,
      translateX: () => anime.random(-50, 50),
      translateY: () => anime.random(-50, 50),
      scale: [0.5, 1.5],
      opacity: [0.2, 0.8],
      duration: () => anime.random(2000, 4000),
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate',
      delay: () => anime.random(0, 2000)
    });
  }
}

// Initialize particles
createParticles();

// Hero animations
anime.timeline({ easing: 'easeOutExpo', duration: 1000 })
  .add({
    targets: '.hero-title',
    translateX: [50, 0],
    opacity: [0, 1]
  })
  .add({
    targets: '.hero-desc',
    translateX: [30, 0],
    opacity: [0, 1]
  }, '-=700')
  .add({
    targets: '.hero-actions',
    translateX: [20, 0],
    opacity: [0, 1]
  }, '-=500');

// SVG Animations
anime({
  targets: '.hero-orb circle:first-child',
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 3000,
  loop: true,
  easing: 'easeInOutSine'
});

anime({
  targets: '#animatedLine',
  strokeDashoffset: [0, -628],
  duration: 2000,
  loop: true,
  easing: 'linear'
});

anime({
  targets: '#waveform',
  stroke: [
    { value: '#ff414d' },
    { value: '#ff8a00' },
    { value: '#e52e71' },
    { value: '#38ff7a' },
    { value: '#ff414d' }
  ],
  duration: 3000,
  loop: true,
  easing: 'easeInOutSine'
});

// Floating particles in hero SVG
const floatingParticles = document.getElementById('floatingParticles');
for (let i = 0; i < 20; i++) {
  const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  particle.setAttribute('cx', Math.random() * 400);
  particle.setAttribute('cy', Math.random() * 400);
  particle.setAttribute('r', Math.random() * 3 + 1);
  particle.setAttribute('fill', '#ff3d3d');
  particle.setAttribute('opacity', Math.random() * 0.7 + 0.3);
  floatingParticles.appendChild(particle);

  anime({
    targets: particle,
    cx: () => anime.random(0, 400),
    cy: () => anime.random(0, 400),
    r: [1, 4],
    opacity: [0.3, 1],
    duration: () => anime.random(3000, 6000),
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate',
    delay: () => anime.random(0, 3000)
  });
}

// Animated dots
const dotsContainer = document.getElementById('animatedDots');
for (let i = 0; i < 24; i++) {
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const angle = (2 * Math.PI / 24) * i;
  const radius = 120;
  const x = 200 + radius * Math.cos(angle);
  const y = 200 + radius * Math.sin(angle);
  
  dot.setAttribute('cx', x);
  dot.setAttribute('cy', y);
  dot.setAttribute('r', 4);
  dot.setAttribute('fill', '#ff8a00');
  dot.setAttribute('opacity', 0.8);
  dotsContainer.appendChild(dot);

  anime({
    targets: dot,
    scale: [0.5, 1.5],
    opacity: [0.4, 1],
    duration: 1500,
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate',
    delay: i * 100
  });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

document.querySelectorAll('.section-reveal').forEach(section => {
  observer.observe(section);
});

// Sponsor button heart animation
const sponsorBtn = document.querySelector('.sponsor-btn');
const heartIcon = sponsorBtn.querySelector('.heart-icon path');

function createFloatingHearts() {
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '1rem';
    heart.style.zIndex = '1000';
    sponsorBtn.appendChild(heart);

    anime({
      targets: heart,
      translateY: -50,
      translateX: () => anime.random(-30, 30),
      scale: [0.5, 1],
      opacity: [1, 0],
      duration: 1500,
      easing: 'easeOutCubic',
      delay: i * 200,
      complete: () => heart.remove()
    });
  }
}

sponsorBtn.addEventListener('mouseenter', createFloatingHearts);

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  // Simple search implementation - you can enhance this
  if (query.length > 2) {
    console.log('Searching for:', query);
    // Add your search logic here
  }
});

// Form validation
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  let isValid = true;
  
  // Clear previous errors
  document.querySelectorAll('.form-error').forEach(error => {
    error.textContent = '';
  });
  
  // Name validation
  if (!name || name.length < 2) {
    document.querySelector('#name').nextElementSibling.textContent = 'Name must be at least 2 characters';
    isValid = false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.querySelector('#email').nextElementSibling.textContent = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Message validation
  if (!message || message.length < 10) {
    document.querySelector('#message').nextElementSibling.textContent = 'Message must be at least 10 characters';
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    
    setTimeout(() => {
      submitBtn.innerHTML = 'Message Sent! <svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>';
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>';
      }, 3000);
    }, 1500);
  }
});

// Testimonials slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Auto-advance testimonials
setInterval(nextTestimonial, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add loading animation to action buttons
document.querySelectorAll('.action-dark, .action-light').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const originalContent = button.innerHTML;
    button.innerHTML = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.disabled = false;
    }, 2000);
  });
});

// Enhanced hover effects
document.querySelectorAll('.hover-lift').forEach(element => {
  element.addEventListener('mouseenter', () => {
    anime({
      targets: element,
      translateY: -10,
      scale: 1.02,
      duration: 300,
      easing: 'easeOutCubic'
    });
  });
  
  element.addEventListener('mouseleave', () => {
    anime({
      targets: element,
      translateY: 0,
      scale: 1,
      duration: 300,
      easing: 'easeOutCubic'
    });
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 100) {
    nav.style.background = 'rgba(10, 10, 10, 0.95)';
    nav.style.backdropFilter = 'blur(20px)';
  } else {
    nav.style.background = 'rgba(10, 10, 10, 0.9)';
    nav.style.backdropFilter = 'blur(10px)';
  }
});

// Add social media integration placeholders
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Social media integration would go here');
    // Add actual social media sharing/linking logic
  });
});
