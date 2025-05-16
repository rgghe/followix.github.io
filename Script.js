
// Intersection Observer for smooth animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Special case for hero section
      if (entry.target.classList.contains('hero')) {
        document.querySelector('.hero::before').style.transform = 'translateY(20px)';
      }
      
      // Stagger card animations
      if (entry.target.classList.contains('card')) {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.hero, .card').forEach(el => {
  observer.observe(el);
});

// Header scroll effects
let lastScroll = 0;
window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  const header = document.getElementById('header');
  
  if (currentScroll <= 0) {
    header.classList.remove('hidden', 'scrolled');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
    // Scroll down
    header.classList.add('hidden');
  } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
    // Scroll up
    header.classList.remove('hidden');
  }
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize hero animation after load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.hero').classList.add('visible');
  }, 300);
});
