// =============================================
// Scroll-Triggered Swipe-In Animations
// =============================================
const swipeSelector = '.swipe-left, .swipe-right, .swipe-up, .swipe-down, .swipe-scale';

function triggerAnimation(el, delay) {
    setTimeout(() => el.classList.add('animate'), delay);
}

// IntersectionObserver for elements below the fold
const swipeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            swipeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

// Wait a tiny moment for CSS to fully apply, then trigger
window.addEventListener('load', () => {
    let staggerIndex = 0;
    document.querySelectorAll(swipeSelector).forEach(el => {
        const rect = el.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (visible) {
            triggerAnimation(el, staggerIndex * 130);
            staggerIndex++;
        } else {
            swipeObserver.observe(el);
        }
    });
});

// smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetEl = document.querySelector(targetId);

        targetEl.scrollIntoView({
            behavior: "smooth"
        });
    });
});

// View Projects Button logic (from Hero section)
const viewProjectsBtn = document.getElementById('view-projects-btn');
if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', () => {
        const projectsSec = document.getElementById('projects');
        if (projectsSec) {
            projectsSec.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Modern Project Detail Toggle
document.querySelectorAll('.toggle-detail').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.project-item');
        const expandable = item.querySelector('.project-expandable');
        const summary = item.querySelector('.project-summary');
        const info = summary.dataset.info;
        
        const isOpening = !item.classList.contains('active');
        
        // Close others
        document.querySelectorAll('.project-item').forEach(other => {
            other.classList.remove('active');
            other.querySelector('.project-expandable').textContent = '';
        });
        
        if (isOpening) {
            item.classList.add('active');
            expandable.textContent = info;
            this.innerHTML = '<i class="fas fa-times"></i> Close';
        } else {
            this.innerHTML = '<i class="fas fa-info-circle"></i> Details';
        }
        
        // Reset other buttons
        document.querySelectorAll('.toggle-detail').forEach(otherBtn => {
            if (otherBtn !== this) {
                otherBtn.innerHTML = '<i class="fas fa-info-circle"></i> Details';
            }
        });
    });
});

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

if (themeBtn) {
    const icon = themeBtn.querySelector('i');
    
    // Set initial icon based on current mode
    if (body.classList.contains('light-mode')) {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // If it's light mode now, show moon icon (to switch to dark)
        if (body.classList.contains('light-mode')) {
            icon.className = 'fas fa-moon';
        } 
        // If it's dark mode now, show sun icon (to switch to light)
        else {
            icon.className = 'fas fa-sun';
        }
    });
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Add a click rotation effect to hamburger icon
        hamburger.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.style.transform = 'rotate(0deg)';
        });
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// // Typewriter Effect
const roles = ["Frontend Developer", "Web Developer", "Data Analyst"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter');

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // If word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } 
    // If word is fully deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before starting new word
    }

    setTimeout(type, typeSpeed);
}

if (typewriterElement) {
    type();
}