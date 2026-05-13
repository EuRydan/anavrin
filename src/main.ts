import './style.css'

// FAQ Accordion Logic
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const isExpanded = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        if (!isExpanded) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-link, .btn').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
});

// Reveal Animations on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .service-card, .hero-content, .about-content').forEach(el => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.opacity = '0';
    htmlEl.style.transform = 'translateY(40px)';
    htmlEl.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
});

// Add a helper class for the reveal
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Simple Mouse Parallax for floating elements
window.addEventListener('mousemove', (e) => {
    const amount = 30;
    const x = (e.clientX / window.innerWidth - 0.5) * amount;
    const y = (e.clientY / window.innerHeight - 0.5) * amount;
    
    document.querySelectorAll('.floating').forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${x}px, ${y}px)`;
    });
});
