// Animated Skill Bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Set the width and add animation class
                progressBar.style.width = width;
                progressBar.classList.add('animate');
                
                // Unobserve after animation
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Enhanced Project Carousel
function initializeProjectCarousel() {
    const projectsGrid = document.querySelector('.projects-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.project-dots');
    
    if (!projectsGrid || !prevBtn || !nextBtn) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    const totalProjects = projectCards.length;
    const projectsPerView = 3; // Always show 3 cards
    let currentIndex = 0;
    
    // Calculate total slides (groups of 3)
    const totalSlides = Math.ceil(totalProjects / projectsPerView);
    
    // Create dots for each group of 3 projects
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        // Calculate which projects to show
        const startIndex = currentIndex * projectsPerView;
        
        // Hide all projects first
        projectCards.forEach((card, i) => {
            if (i >= startIndex && i < startIndex + projectsPerView) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateDots();
        updateButtonStates();
    }
    
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }
    
    function updateButtonStates() {
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
        
        // Hide/show buttons based on position
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex === totalSlides - 1 ? 'none' : 'flex';
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    projectsGrid.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    projectsGrid.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initialize
    goToSlide(0);
    updateButtonStates();
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0);
            }
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play and stop on user interaction
    startAutoPlay();
    
    projectsGrid.addEventListener('mouseenter', stopAutoPlay);
    projectsGrid.addEventListener('mouseleave', startAutoPlay);
    prevBtn.addEventListener('mouseenter', stopAutoPlay);
    nextBtn.addEventListener('mouseenter', stopAutoPlay);
}

// Interactive Particles for Hero Section
function initializeCosmicParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
        `;
        
        particlesContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 100 + 50
        });
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateParticles() {
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse attraction
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -0.8;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -0.8;
            
            // Update element position
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            
            // Life cycle
            particle.life--;
            if (particle.life <= 0) {
                particle.life = Math.random() * 100 + 50;
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Parallax effect for floating elements
function initializeParallax() {
    const floatingElements = document.querySelectorAll('.planet, .asteroid, .comet');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform += `translateY(${rate * speed}px)`;
        });
    });
}

// Enhanced typing effect for hero text
function initializeTypingEffect() {
    const titleElement = document.querySelector('.cosmic-text');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        titleElement.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
            // Add final glow effect
            titleElement.style.animation = 'cosmic-shift 3s ease-in-out infinite, text-glow 2s ease-in-out infinite alternate';
        }
    }, 100);
}

// Enhanced Timeline Functionality
function initializeEnhancedTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for timeline animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
        // Pause animation initially
        item.style.animationPlayState = 'paused';
    });
    
    // Add click interactions for timeline items
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        
        if (content) {
            // Add click effect with ripple
            content.addEventListener('click', (event) => {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                content.appendChild(ripple);
                
                // Position ripple at click point
                const rect = content.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    });
}

// Enhanced About Section Functionality
function initializeEnhancedAbout() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statCard = entry.target.closest('.stat-card');
                const statNumber = statCard.querySelector('.stat-number');
                const progressBar = statCard.querySelector('.progress-fill');
                
                // Animate number counting
                animateNumber(statNumber);
                
                // Animate progress bar
                animateProgressBar(progressBar, statNumber.dataset.target);
                
                // Unobserve after animation
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Number counting animation
    function animateNumber(element) {
        const target = parseFloat(element.dataset.target);
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on target
            if (target >= 100) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = current.toFixed(1) + '+';
            }
        }, 16);
    }
    
    // Progress bar animation
    function animateProgressBar(element, target) {
        const maxValue = target >= 100 ? 100 : 10; // Scale for progress bar
        const percentage = (target / maxValue) * 100;
        
        setTimeout(() => {
            element.style.width = percentage + '%';
        }, 500); // Delay to sync with number animation
    }
    
    // Add hover effects for floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.opacity = '1';
            icon.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.5)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.opacity = '0.7';
            icon.style.boxShadow = '';
        });
    });
    
    // Add text highlight effects
    const highlightTexts = document.querySelectorAll('.highlight-text');
    
    highlightTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.transform = 'scale(1.05)';
        });
        
        text.addEventListener('mouseleave', () => {
            text.style.transform = 'scale(1)';
        });
    });
}

// Enhanced Contact Section Functionality
function initializeEnhancedContact() {
    // Form input animations
    const formInputs = document.querySelectorAll('.input-container input, .input-container textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            const container = input.closest('.input-container');
            const icon = container.querySelector('i');
            const line = container.querySelector('.input-line');
            
            if (icon) icon.style.color = '#764ba2';
            if (line) line.style.width = '100%';
        });
        
        input.addEventListener('blur', () => {
            const container = input.closest('.input-container');
            const icon = container.querySelector('i');
            const line = container.querySelector('.input-line');
            
            if (icon) icon.style.color = '#667eea';
            if (line) line.style.width = '0%';
        });
        
        // Add typing effect for labels
        input.addEventListener('input', () => {
            const label = input.nextElementSibling;
            if (input.value.length > 0) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    });
    
    // Submit button ripple effect
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'btn-ripple';
            
            const rect = submitBtn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            submitBtn.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate form submission
            simulateFormSubmission();
        });
    }
    
    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    

    
    // Form validation and submission
    function simulateFormSubmission() {
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // Change button state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate API call
        setTimeout(() => {
            btnText.textContent = 'Message Sent!';
            btnIcon.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            // Reset form
            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                
                // Clear form inputs
                formInputs.forEach(input => {
                    input.value = '';
                    const label = input.nextElementSibling;
                    label.classList.remove('active');
                });
            }, 2000);
        }, 1500);
    }
    
    // Add scroll-triggered animations for contact section
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate contact items
                    const contactItems = entry.target.querySelectorAll('.contact-item');
                    contactItems.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-30px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.6s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                    
                    // Animate form elements
                    const formGroups = entry.target.querySelectorAll('.form-group');
                    formGroups.forEach((group, index) => {
                        group.style.opacity = '0';
                        group.style.transform = 'translateY(30px)';
                        
                        setTimeout(() => {
                            group.style.transition = 'all 0.6s ease';
                            group.style.opacity = '1';
                            group.style.transform = 'translateY(0)';
                        }, (index + 3) * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(contactSection);
    }
}

// Add ripple animation CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    initSmoothScrolling();
    initMobileNav();
    initializeProjectCarousel();
    initializeCosmicParticles();
    initializeParallax();
    initializeTypingEffect();
    initializeEnhancedTimeline();
    initializeEnhancedAbout();
    initializeEnhancedContact();
    addRippleStyles();
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) rotateX(5deg) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim()) {
        showError('name', 'Name is required');
        isValid = false;
    }
    
    if (!emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    
    if (!data.message.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        showSuccessMessage();
        contactForm.reset();
    }
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error');
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Thank you for your message! I will get back to you soon.';
    
    contactForm.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Typing animation for hero section
const heroTitle = document.querySelector('.hero-content h1');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';

let charIndex = 0;
const typeWriter = () => {
    if (charIndex < originalText.length) {
        heroTitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else {
        // Add cursor blink effect after typing
        heroTitle.classList.add('typing-complete');
    }
};

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add placeholder text to form inputs
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.setAttribute('placeholder', ' ');
});

// Experience section animation
const timelineItems = document.querySelectorAll('.timeline-item');
const animateTimeline = () => {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (itemTop < triggerBottom) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
};

// Initialize timeline items
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.5s ease-out';
});

window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', animateTimeline); 