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

// Navbar and Frame background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    const frameSection = document.getElementById('frame');
    const sobreSection = document.getElementById('sobre');
    const contatoSection = document.getElementById('contato');
    
    if (window.scrollY > 50) {
        nav?.classList.add('scrolled');
        frameSection?.classList.add('scrolled-section');
    } else {
        nav?.classList.remove('scrolled');
        frameSection?.classList.remove('scrolled-section');
    }

    if (sobreSection) {
        const rect = sobreSection.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
            sobreSection.classList.add('scrolled-section');
        } else {
            sobreSection.classList.remove('scrolled-section');
        }
    }

    if (contatoSection) {
        const rect = contatoSection.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
            contatoSection.classList.add('scrolled-section');
        } else {
            contatoSection.classList.remove('scrolled-section');
        }
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

// Custom Cursor Logic for Sobre Section
const sobreSectionEl = document.getElementById('sobre');
const customCursor = document.getElementById('sobre-cursor');

if (sobreSectionEl && customCursor) {
    // Only apply on desktop devices where hover is supported
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        sobreSectionEl.addEventListener('mousemove', (e) => {
            // Center the cursor (140px width/height -> 70px offset)
            customCursor.style.transform = `translate3d(${e.clientX - 70}px, ${e.clientY - 70}px, 0)`;

            // Check background context to change '+' color
            const target = document.elementFromPoint(e.clientX, e.clientY);
            const isRightSide = target?.closest('.sobre-right');
            const isScrolled = sobreSectionEl.classList.contains('scrolled-section');

            if (isRightSide || isScrolled) {
                customCursor.style.color = '#000000';
            } else {
                customCursor.style.color = '#FFFFFF';
            }
        });

        sobreSectionEl.addEventListener('mouseenter', () => {
            customCursor.classList.add('active');
        });

        sobreSectionEl.addEventListener('mouseleave', () => {
            customCursor.classList.remove('active');
        });
    }
}
