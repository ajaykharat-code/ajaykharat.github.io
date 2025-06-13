// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
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

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (barTop < triggerBottom) {
            bar.style.width = bar.parentElement.getAttribute('data-progress') + '%';
        }
    });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

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

// Project Carousel
const projectsGrid = document.querySelector('.projects-grid');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function scrollProjects(direction) {
    const scrollAmount = 370; // card width + gap
    const currentScroll = projectsGrid.scrollLeft;
    const newScroll = direction === 'next' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
    
    projectsGrid.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });
}

// Add event listeners for navigation buttons
prevBtn.addEventListener('click', () => scrollProjects('prev'));
nextBtn.addEventListener('click', () => scrollProjects('next'));

// Update button visibility based on scroll position
projectsGrid.addEventListener('scroll', () => {
    const isAtStart = projectsGrid.scrollLeft === 0;
    const isAtEnd = projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth;
    
    prevBtn.style.display = isAtStart ? 'none' : 'flex';
    nextBtn.style.display = isAtEnd ? 'none' : 'flex';
});

// Initialize button visibility
prevBtn.style.display = 'none';

// Update carousel on window resize
window.addEventListener('resize', () => {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
        cardsPerView = newCardsPerView;
        currentIndex = 0;
        initializeCards();
    }
});

// Initialize carousel
initializeCards(); 