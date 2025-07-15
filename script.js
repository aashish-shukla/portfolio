// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header hide/show on scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hide');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
        // Scrolling down
        header.classList.add('hide');
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
        // Scrolling up
        header.classList.remove('hide');
    }
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileNavToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
});

// Add visible class animation
const style = document.createElement('style');
style.textContent = `
    section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.8s var(--animation-timing), transform 0.8s var(--animation-timing);
    }
`;
document.head.appendChild(style);

// Enhanced hover effects for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced project card animations
document.querySelectorAll('.project-item').forEach(project => {
    project.addEventListener('mouseenter', () => {
        const image = project.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });
    
    project.addEventListener('mouseleave', () => {
        const image = project.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Enhanced button ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Enhanced education section animations
document.addEventListener('DOMContentLoaded', () => {
    const educationItems = document.querySelectorAll('#education .education-item');
    
    educationItems.forEach((item, index) => {
        // Make items visible by default
        item.style.opacity = '1';
        item.style.transform = 'none';
        
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.education-icon');
            const highlights = item.querySelectorAll('.education-highlights li');
            
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1.1)';
            }
            
            highlights.forEach((li, i) => {
                li.style.transform = 'translateX(10px)';
                li.style.transition = `transform 0.3s ease ${i * 0.1}s`;
            });
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.education-icon');
            const highlights = item.querySelectorAll('.education-highlights li');
            
            if (icon) {
                icon.style.transform = 'rotate(-5deg)';
            }
            
            highlights.forEach(li => {
                li.style.transform = 'translateX(0)';
            });
        });
    });
    
    // Add floating animation to education icons
    const educationIcons = document.querySelectorAll('#education .education-icon');
    educationIcons.forEach(icon => {
        icon.style.animation = 'float 3s ease-in-out infinite';
    });
});

// Add glow effect on hover
document.querySelectorAll('#education .education-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'glow 2s infinite';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.animation = 'none';
    });
});

// Email functionality using EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("oZht58scim4dDKmFl");
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        statusMessage.style.display = 'none';
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            message: formData.get('message'),
            to_name: 'Aashish Kumar Shukla',
            to_email: 'shuklaaashish90@gmail.com',
            reply_to: formData.get('from_email')
        };
        
        // Send email using EmailJS with your service and template IDs
        emailjs.send('service_5lllftj', 'template_xzopund', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showStatusMessage('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Clear validation classes and character counter
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                    // Clear any error messages
                    const errorDiv = input.parentNode.querySelector('.field-error');
                    if (errorDiv) {
                        errorDiv.remove();
                    }
                });
                
                // Reset character counter
                const charCounter = contactForm.querySelector('.char-counter');
                if (charCounter) {
                    charCounter.textContent = '0/1000 characters';
                    charCounter.style.color = '#666';
                }
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showStatusMessage('❌ Failed to send message. Please try again or contact me directly at shuklaaashish90@gmail.com', 'error');
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
            });
    });
    
    // Enhanced status message function
    function showStatusMessage(message, type) {
        statusMessage.innerHTML = message;
        statusMessage.className = `status-message ${type}`;
        statusMessage.style.display = 'block';
        
        // Smooth scroll to message
        statusMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
        
        // Hide message after 7 seconds
        setTimeout(() => {
            statusMessage.style.opacity = '0';
            setTimeout(() => {
                statusMessage.style.display = 'none';
                statusMessage.style.opacity = '1';
            }, 300);
        }, 7000);
    }
    
    // Enhanced form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing validation classes and errors
        field.classList.remove('valid', 'invalid');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate based on field type
        if (field.name === 'from_name') {
            if (value.length < 2) {
                field.classList.add('invalid');
                showFieldError(field, 'Name must be at least 2 characters long');
            } else if (!/^[a-zA-Z\s\-']+$/.test(value)) {
                field.classList.add('invalid');
                showFieldError(field, 'Name should only contain letters, spaces, hyphens, and apostrophes');
            } else {
                field.classList.add('valid');
            }
        } else if (field.name === 'from_email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('invalid');
                showFieldError(field, 'Please enter a valid email address');
            } else {
                field.classList.add('valid');
            }
        } else if (field.name === 'message') {
            if (value.length < 10) {
                field.classList.add('invalid');
                showFieldError(field, 'Message must be at least 10 characters long');
            } else if (value.length > 1000) {
                field.classList.add('invalid');
                showFieldError(field, 'Message is too long (maximum 1000 characters)');
            } else {
                field.classList.add('valid');
            }
        }
    }
    
    function showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearValidation(e) {
        const field = e.target;
        field.classList.remove('valid', 'invalid');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Add character counter for message field
    const messageField = contactForm.querySelector('textarea[name="message"]');
    if (messageField) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.textContent = '0/1000 characters';
        messageField.parentNode.appendChild(charCounter);
        
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/1000 characters`;
            charCounter.style.color = length > 1000 ? '#dc3545' : '#666';
        });
    }
});