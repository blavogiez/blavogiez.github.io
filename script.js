class LanguageManager {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        const saved = localStorage.getItem('preferred-language');
        if (saved) return saved;
        
        const browserLang = navigator.language.slice(0, 2);
        return ['fr', 'en'].includes(browserLang) ? browserLang : 'fr';
    }

    init() {
        this.setupLanguageButtons();
        this.setLanguage(this.currentLang);
    }

    setupLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.id.replace('lang-', '');
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        
        document.documentElement.lang = lang;
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.id === `lang-${lang}`);
        });

        document.querySelectorAll('[data-fr][data-en]').forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });

        document.title = document.querySelector('title').getAttribute(`data-${lang}`);
    }
}

class AnimationManager {
    constructor() {
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.animateSkillBars();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        document.querySelectorAll('section, .project-card, .skill-category, .quick-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    animateSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        bar.style.transform = 'scaleX(1)';
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skills').forEach(section => {
            observer.observe(section);
        });
    }
}

class ThemeManager {
    constructor() {
        this.setupFloatingElements();
    }

    setupFloatingElements() {
        const floatingCard = document.querySelector('.floating-card');
        if (floatingCard) {
            this.animateFloatingCard(floatingCard);
        }
    }

    animateFloatingCard(element) {
        let mouseX = 0;
        let mouseY = 0;
        let elementX = 0;
        let elementY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            const speed = 0.1;
            elementX += (mouseX - elementX) * speed;
            elementY += (mouseY - elementY) * speed;

            element.style.transform = `translate(${elementX * 0.02}px, ${elementY * 0.02}px)`;
            requestAnimationFrame(animate);
        };

        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new AnimationManager();
    new ThemeManager();
});