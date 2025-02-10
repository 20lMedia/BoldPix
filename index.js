// Enhanced Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Mobile Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const overlay = document.querySelector('.nav-overlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Reset scroll position when menu opens
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    }
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking nav items
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking overlay
overlay.addEventListener('click', toggleMenu);

// Prevent menu close when clicking menu content
navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close menu on resize (if open)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});


// Enhance the active section detection
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add throttled scroll listener
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Enhanced Particle System
function createParticles() {
    if (window.innerWidth <= 768) return; // Don't create particles on mobile
    
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth <= 1024 ? 15 : 30; // Reduce particles on smaller screens

    // Clear existing particles
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Simplified animation for better performance
        const size = Math.random() * 3 + 2; // Smaller particles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        
        // Longer duration for smoother animation
        const duration = Math.random() * 5 + 15;
        particle.style.setProperty('--duration', `${duration}s`);
        
        particlesContainer.appendChild(particle);
    }
}

// Debounced window resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createParticles();
    }, 250);
});

// Optimize performance with requestAnimationFrame
function optimizeAnimations() {
    if (window.innerWidth <= 768) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.transform = 'translateZ(0)';
        }
    }
}

// Call on load and resize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    optimizeAnimations();
});

// Add interactive card effect
document.querySelectorAll('.about-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
        
        const rotateY = (x - 50) * 0.1;
        const rotateX = (y - 50) * -0.1;
        
        card.style.transform = `
            perspective(1000px)
            translateZ(50px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) translateZ(0)';
    });
});

// Create floating particles for About section
function createAboutParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'about-particles';
    document.querySelector('.about').appendChild(particlesContainer);

    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'about-particle';
        
        // Random initial position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * -20;
        particle.style.animation = `particleFloat ${duration}s ${delay}s infinite linear`;
        
        particlesContainer.appendChild(particle);
    }
}

// Call when document is loaded
document.addEventListener('DOMContentLoaded', createAboutParticles);

// Add service section particles
function createServiceParticles() {
    const particlesContainer = document.querySelector('.services-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'service-particle';
        
        // Enhanced random size
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position and initial rotation
        particle.style.left = `${Math.random() * 100}%`;
        
        // Variable speed and delay
        const duration = Math.random() * 15 + 20;
        const delay = Math.random() * -30;
        
        // Add some randomness to the animation
        const randomOffset = Math.random() * 20 - 10;
        particle.style.transform = `translateX(${randomOffset}px)`;
        
        particle.style.animation = `serviceParticleFloat ${duration}s ${delay}s infinite cubic-bezier(0.4, 0, 0.2, 1)`;
        
        particlesContainer.appendChild(particle);
    }
}

// Call when document is loaded
document.addEventListener('DOMContentLoaded', createServiceParticles);

// Add this function to create money particles
function createMoneyParticles() {
    const container = document.querySelector('.money-particles');
    const symbols = ['$', '€', '£', '¥', '₿'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'money-particle';
        
        // Random symbol
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 15 + 's';
        const delay = -Math.random() * 20 + 's';
        particle.style.setProperty('--duration', duration);
        particle.style.setProperty('--delay', delay);
        
        container.appendChild(particle);
    }
}

// Add this function to create floating currency symbols
function createCurrencySymbols() {
    const container = document.querySelector('.currency-symbols');
    const symbols = ['$', '€', '£', '¥', '₿'];
    const symbolCount = 10;
    
    for (let i = 0; i < symbolCount; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'currency-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Random position
        symbol.style.left = `${Math.random() * 100}%`;
        symbol.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        symbol.style.animationDelay = `${Math.random() * 4}s`;
        
        container.appendChild(symbol);
    }
}

// Initialize money animations
document.addEventListener('DOMContentLoaded', () => {
    createMoneyParticles();
    createCurrencySymbols();
});

// Contact form handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    // Handle floating labels
    inputs.forEach(input => {
        // Check initial state
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }

        // Handle input changes
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00f0ff)';
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send';
            submitBtn.style.background = 'linear-gradient(45deg, #ff3366, #ff6633)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Initialize contact form when document is loaded
document.addEventListener('DOMContentLoaded', initContactForm);

// Scroll Animations for About Section
function initAboutAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const aboutContent = document.querySelector('.about-content');
    const aboutStats = document.querySelector('.about-stats');
    const aboutCards = document.querySelectorAll('.about-card');

    if (aboutContent) observer.observe(aboutContent);
    if (aboutStats) observer.observe(aboutStats);
    aboutCards.forEach(card => observer.observe(card));
}

// Initialize animations when document is loaded
document.addEventListener('DOMContentLoaded', initAboutAnimations);

// Scroll Animations for Services Section
function initServiceAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-50px', // Adjust when animation triggers
        threshold: 0.1 // Lower threshold for earlier trigger
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay before adding the animate class
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe title and subtitle
    const servicesSection = document.querySelector('.services');
    const servicesTitle = servicesSection.querySelector('h2');
    const servicesSubtitle = servicesSection.querySelector('.subtitle');
    
    // Reset any existing animations
    servicesTitle?.classList.remove('animate');
    servicesSubtitle?.classList.remove('animate');
    
    if (servicesTitle) observer.observe(servicesTitle);
    if (servicesSubtitle) observer.observe(servicesSubtitle);

    // Observe service cards with staggered delay
    const serviceCards = servicesSection.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.remove('animate'); // Reset animation
        card.style.setProperty('--card-index', index);
        observer.observe(card);
    });
}

// Initialize service animations and re-initialize on scroll
document.addEventListener('DOMContentLoaded', initServiceAnimations);
window.addEventListener('scroll', () => {
    requestAnimationFrame(initServiceAnimations);
});

// Scroll Animations for Testimonials Section
function initTestimonialAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe title and subtitle
    const testimonialsSection = document.querySelector('.testimonials');
    const testimonialsTitle = testimonialsSection.querySelector('h2');
    const testimonialsSubtitle = testimonialsSection.querySelector('.subtitle');
    
    // Reset any existing animations
    testimonialsTitle?.classList.remove('animate');
    testimonialsSubtitle?.classList.remove('animate');
    
    if (testimonialsTitle) observer.observe(testimonialsTitle);
    if (testimonialsSubtitle) observer.observe(testimonialsSubtitle);

    // Observe testimonial cards with staggered delay
    const testimonialCards = testimonialsSection.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.classList.remove('animate'); // Reset animation
        card.style.setProperty('--card-index', index);
        observer.observe(card);
    });
}

// Initialize testimonial animations and re-initialize on scroll
document.addEventListener('DOMContentLoaded', initTestimonialAnimations);
window.addEventListener('scroll', () => {
    requestAnimationFrame(initTestimonialAnimations);
});
