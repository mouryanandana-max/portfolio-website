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

// Professional Highlight Cursor Logic
const cursorCore = document.querySelector('.cursor-core');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0; let mouseY = 0;
let followerX = 0; let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if(cursorCore) {
        cursorCore.style.left = mouseX + 'px';
        cursorCore.style.top = mouseY + 'px';
    }
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    
    if(cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Pro Highlight Interaction System
const interactiveTargets = 'a, button, .stat-card, .skill-badge, .project-item, .social-links a, .nav-controls div';
const updateHighlightCursor = () => {
    document.querySelectorAll(interactiveTargets).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
};
updateHighlightCursor();

// Ensure dynamic elements (like expanded projects) also trigger the hover
const cursorObserver = new MutationObserver(updateHighlightCursor);
cursorObserver.observe(document.body, { childList: true, subtree: true });



// Typewriter Effect
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

// Particle Background Logic
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000); // Dynamic density
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLightMode = document.body.classList.contains('light-mode');
    ctx.strokeStyle = isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(61, 178, 255, 0.15)';
    ctx.fillStyle = isLightMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(61, 178, 255, 0.5)';

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });

    // Connect to mouse
    particles.forEach(p => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
            // Smoother opacity based on distance to prevent "crashing" lines
            const opacity = 1 - (distance / 200);
            ctx.strokeStyle = isLightMode ? 
                `rgba(61, 178, 255, ${opacity * 0.2})` : 
                `rgba(61, 178, 255, ${opacity * 0.5})`;
            
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    });

    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', initParticles);
initParticles();
drawParticles();