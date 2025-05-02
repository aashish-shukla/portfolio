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