// ===== ANIMATIONS =====
class AnimationManager {
    constructor() {
        if (!CONFIG.PERFORMANCE_MODE) {
            this.setupIntersectionObserver();
            this.setupSmoothScrolling();
            this.setupSkillBars();
            this.setupHeaderAnimation();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        DOM.queryAll('section, .skill-category, .timeline-item').forEach(el => observer.observe(el));
    }

    setupSmoothScrolling() {
        DOM.queryAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = DOM.query(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    setupSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    DOM.queryAll('.skill-progress', entry.target).forEach(bar => {
                        bar.style.transform = 'scaleX(1)';
                    });
                }
            });
        }, { threshold: 0.5 });

        DOM.queryAll('.skills').forEach(section => observer.observe(section));
    }
    
    setupHeaderAnimation() {
        const header = DOM.query('header');
        const navLinks = DOM.queryAll('.nav-links a');
        
        // Section observer for header animation
        const sectionObserver = new IntersectionObserver((entries) => {
            let activeSection = null;
            
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    activeSection = entry.target;
                }
            });
            
            // Update header state
            if (activeSection && activeSection.id !== 'hero') {
                header.classList.add('section-active');
            } else {
                header.classList.remove('section-active');
            }
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (activeSection && link.getAttribute('href') === `#${activeSection.id}`) {
                    link.classList.add('active');
                }
            });
            
        }, { 
            threshold: [0.2, 0.4, 0.6],
            rootMargin: '-10% 0px -10% 0px'
        });

        // Observe all sections
        DOM.queryAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Smooth scroll with header animation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = DOM.query(`#${targetId}`);
                
                if (targetSection) {
                    // Add temporary active state during navigation
                    header.classList.add('section-active');
                    
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });
    }
}

