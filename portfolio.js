/**
 * PORTFOLIO - PRODUCTION READY
 * Minimaliste & SOLID
 * @author Baptiste Lavogiez
 * @version 3.0.0
 */

'use strict';

// ===== CONFIGURATION =====
const CONFIG = {
    LOADING_DURATION: 1200,
    ANIMATION_DURATION: 300,
    IMAGE_ROTATION_INTERVAL: 5000,
    PERFORMANCE_MODE: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// ===== UTILITIES =====
const DOM = {
    query: (selector) => document.querySelector(selector),
    queryAll: (selector) => document.querySelectorAll(selector),
    createElement: (tag, className = '', content = '') => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content) el.innerHTML = content;
        return el;
    }
};

const Utils = {
    detectLanguage: () => {
        const saved = localStorage.getItem('preferred-language');
        if (saved) return saved;
        const browserLang = navigator.language.slice(0, 2);
        return ['fr', 'en'].includes(browserLang) ? browserLang : 'fr';
    },
    
    debounce: (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};

// ===== LOADING SCREEN =====
class LoadingScreen {
    constructor() {
        this.create();
        this.init();
    }

    create() {
        const loader = DOM.createElement('div', 'loading-screen', `
            <div class="loader">
                <div class="loader-logo">BL</div>
                <div class="loader-text">Chargement...</div>
            </div>
        `);
        document.body.insertAdjacentElement('afterbegin', loader);
        this.element = loader;
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), CONFIG.LOADING_DURATION);
        });
    }

    hide() {
        this.element.classList.add('hidden');
        setTimeout(() => this.element.remove(), 500);
    }
}

// ===== LANGUAGE MANAGER =====
class LanguageManager {
    constructor() {
        this.currentLang = Utils.detectLanguage();
        this.init();
    }

    init() {
        this.setupButtons();
        this.setLanguage(this.currentLang);
    }

    setupButtons() {
        DOM.queryAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.id.replace('lang-', '');
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        if (!['fr', 'en'].includes(lang)) return;
        
        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        document.documentElement.lang = lang;
        
        // Update buttons
        DOM.queryAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.id === `lang-${lang}`);
        });

        // Update content
        DOM.queryAll('[data-fr][data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) element.textContent = text;
        });

        // Update title
        const titleEl = DOM.query('title');
        if (titleEl) {
            const title = titleEl.getAttribute(`data-${lang}`);
            if (title) document.title = title;
        }
    }
}

// ===== TECH ICONS =====
class TechIcons {
    static MAP = {
        'HTML/CSS': { icon: '🌐', class: 'html' },
        'HTML': { icon: '🌐', class: 'html' },
        'CSS': { icon: '🎨', class: 'css' },
        'JavaScript': { icon: '⚡', class: 'js' },
        'React': { icon: '⚛️', class: 'react' },
        'Python': { icon: '🐍', class: 'python' },
        'Node.js': { icon: '🟢', class: 'node' },
        'Flutter': { icon: '📱', class: 'flutter' },
        'Firebase': { icon: '🔥', class: 'firebase' },
        'PostgreSQL': { icon: '🐘', class: 'postgres' },
        'Redux': { icon: '🔄', class: 'redux' },
        'WebSocket': { icon: '🔌', class: 'websocket' },
        'Redis': { icon: '💎', class: 'redis' }
    };

    static generate(tags) {
        return tags.split(',')
            .map(tag => tag.trim())
            .map(tag => {
                const tech = this.MAP[tag] || { icon: '💻', class: 'default' };
                return `<div class="tech-icon ${tech.class}" title="${tag}">${tech.icon}</div>`;
            })
            .join('');
    }
}

// ===== PROJECT NAVIGATOR =====
class ProjectNavigator {
    constructor() {
        this.projects = [];
        this.currentIndex = 0;
        this.currentImageIndex = 0;
        this.imageTimer = null;
        this.init();
    }

    init() {
        this.bindElements();
        this.setupNavigation();
    }

    bindElements() {
        this.prevBtn = DOM.query('#prev-project');
        this.nextBtn = DOM.query('#next-project');
        this.projectCard = DOM.query('#current-project');
        this.counterCurrent = DOM.query('.project-counter .current');
        this.counterTotal = DOM.query('.project-counter .total');
    }

    setupNavigation() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.navigate(-1));
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.navigate(1));
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
    }

    navigate(direction) {
        const newIndex = this.currentIndex + direction;
        if (newIndex >= 0 && newIndex < this.projects.length) {
            this.currentIndex = newIndex;
            this.showProject();
        }
    }

    loadProjects(projects) {
        this.projects = projects;
        if (this.projects.length > 0 && this.projectCard) {
            this.currentIndex = 0;
            this.showProject();
            this.updateControls();
        }
    }

    showProject() {
        if (!this.projectCard || !this.projects[this.currentIndex]) return;
        
        const project = this.projects[this.currentIndex];
        this.projectCard.innerHTML = this.createProjectCard(project);
        this.setupImageNavigation();
        this.updateControls();
        
        // Update language
        const currentLang = document.documentElement.lang;
        DOM.queryAll('[data-fr][data-en]', this.projectCard).forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) el.textContent = text;
        });
    }

    createProjectCard(project) {
        const techIcons = TechIcons.generate(project.tags);
        
        return `
            <div class="project-gallery">
                <img src="${project.image_main}" alt="${project.name_fr} - Image 1" class="gallery-image active" loading="lazy" />
                <img src="${project.image_gallery1}" alt="${project.name_fr} - Image 2" class="gallery-image" loading="lazy" />
                <img src="${project.image_gallery2}" alt="${project.name_fr} - Image 3" class="gallery-image" loading="lazy" />
                
                <div class="gallery-nav">
                    <span class="gallery-dot active" data-index="0"></span>
                    <span class="gallery-dot" data-index="1"></span>
                    <span class="gallery-dot" data-index="2"></span>
                </div>
                
                <div class="project-overlay">
                    <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                    <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                </div>
            </div>
            
            <div class="project-info">
                <div class="tech-icons">${techIcons}</div>
                <p class="project-description" data-fr="${project.description_fr}" data-en="${project.description_en}">${project.description_fr}</p>
                <div class="project-actions">
                    <a href="${project.github}" class="github-link" target="_blank" rel="noopener">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span data-fr="Voir le code" data-en="View code">Voir le code</span>
                    </a>
                </div>
            </div>
        `;
    }

    setupImageNavigation() {
        const images = DOM.queryAll('.gallery-image', this.projectCard);
        const dots = DOM.queryAll('.gallery-dot', this.projectCard);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showImage(index));
        });
        
        this.currentImageIndex = 0;
        this.startImageRotation();
    }

    showImage(index) {
        const images = DOM.queryAll('.gallery-image', this.projectCard);
        const dots = DOM.queryAll('.gallery-dot', this.projectCard);
        
        images.forEach((img, i) => img.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        
        this.currentImageIndex = index;
    }

    startImageRotation() {
        if (this.imageTimer) clearInterval(this.imageTimer);
        
        this.imageTimer = setInterval(() => {
            const images = DOM.queryAll('.gallery-image', this.projectCard);
            if (images.length > 1) {
                this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
                this.showImage(this.currentImageIndex);
            }
        }, CONFIG.IMAGE_ROTATION_INTERVAL);
    }

    updateControls() {
        if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
        if (this.nextBtn) this.nextBtn.disabled = this.currentIndex === this.projects.length - 1;
        if (this.counterCurrent) this.counterCurrent.textContent = this.currentIndex + 1;
        if (this.counterTotal) this.counterTotal.textContent = this.projects.length;
    }
}

// ===== ANIMATIONS =====
class AnimationManager {
    constructor() {
        if (!CONFIG.PERFORMANCE_MODE) {
            this.setupIntersectionObserver();
            this.setupSmoothScrolling();
            this.setupSkillBars();
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

        DOM.queryAll('section, .skill-category').forEach(el => observer.observe(el));
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
}

// ===== PARTICLES =====
class ParticleSystem {
    constructor() {
        this.init();
    }

    init() {
        const container = DOM.query('#particles');
        if (!container) return;

        for (let i = 0; i < 10; i++) {
            this.createParticle(container);
        }
    }

    createParticle(container) {
        const particle = DOM.createElement('div', 'particle');
        const size = Math.random() * 4 + 2;
        
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`
        });
        
        container.appendChild(particle);
    }
}

// ===== CONFIG LOADER =====
class ConfigLoader {
    constructor() {
        this.config = {};
        this.projectNavigator = new ProjectNavigator();
        this.load();
    }

    async load() {
        try {
            const response = await fetch('settings.ini');
            if (!response.ok) throw new Error('Config not found');
            
            const text = await response.text();
            this.parse(text);
            this.apply();
        } catch (error) {
            console.warn('Using defaults:', error.message);
            this.loadDefaults();
            this.apply();
        }
    }

    parse(text) {
        const lines = text.split('\n');
        let section = '';
        
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('[') && line.endsWith(']')) {
                section = line.slice(1, -1);
                this.config[section] = {};
            } else if (line.includes('=') && section) {
                const [key, ...parts] = line.split('=');
                this.config[section][key.trim()] = parts.join('=').trim();
            }
        });
    }

    apply() {
        this.applyPersonal();
        this.applyAbout();
        this.applyProjects();
        this.applySite();
    }

    applyPersonal() {
        const personal = this.config.Personal;
        if (!personal) return;

        // Update name
        DOM.queryAll('.name').forEach(el => {
            if (personal.name) el.textContent = personal.name;
        });

        // Update photo
        if (personal.photo) {
            const img = DOM.query('.profile-photo img');
            if (img) {
                img.src = personal.photo;
                img.alt = `${personal.name} - Photo de profil`;
            }
        }

        // Update contacts
        if (personal.email) {
            DOM.queryAll('a[href^="mailto:"]').forEach(el => {
                el.href = `mailto:${personal.email}`;
                el.textContent = personal.email;
            });
        }

        if (personal.linkedin) {
            DOM.queryAll('a[href*="linkedin"]').forEach(el => {
                el.href = personal.linkedin;
            });
        }

        if (personal.github) {
            DOM.queryAll('a[href*="github"]').forEach(el => {
                el.href = personal.github;
            });
        }
    }

    applyAbout() {
        const about = this.config.About;
        if (!about) return;

        const aboutText = DOM.query('.about-text p');
        if (aboutText && about.description_fr && about.description_en) {
            aboutText.setAttribute('data-fr', about.description_fr);
            aboutText.setAttribute('data-en', about.description_en);
        }

        const stats = DOM.queryAll('.stat-number');
        if (stats[0] && about.years_study) stats[0].textContent = about.years_study;
        if (stats[1] && about.projects_completed) stats[1].textContent = about.projects_completed;
    }

    applyProjects() {
        const projects = [];
        
        for (let i = 1; i <= 8; i++) {
            const project = this.config[`Project${i}`];
            if (project) projects.push(project);
        }
        
        if (projects.length === 0) {
            projects.push(this.getDefaultProject());
        }
        
        this.projectNavigator.loadProjects(projects);
    }

    applySite() {
        const site = this.config.Site;
        if (site?.year) {
            const footer = DOM.query('footer p');
            if (footer) {
                footer.innerHTML = footer.innerHTML.replace(/\d{4}/, site.year);
            }
        }
    }

    loadDefaults() {
        this.config = {
            Personal: {
                name: 'Baptiste Lavogiez',
                email: 'baptiste.lavogiez@example.com',
                photo: 'photo.jpg'
            },
            Project1: this.getDefaultProject()
        };
    }

    getDefaultProject() {
        return {
            name_fr: 'Portfolio Web',
            name_en: 'Web Portfolio',
            summary_fr: 'Site portfolio moderne et responsive',
            summary_en: 'Modern responsive portfolio website',
            description_fr: 'Développement complet d\'un portfolio avec HTML, CSS et JavaScript',
            description_en: 'Complete portfolio development with HTML, CSS and JavaScript',
            github: 'https://github.com/baptiste-lavogiez/portfolio',
            image_main: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
            image_gallery1: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop',
            image_gallery2: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
            tags: 'HTML/CSS,JavaScript,Responsive'
        };
    }
}

// ===== APPLICATION =====
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize loading screen
        new LoadingScreen();
        
        // Initialize core systems
        new LanguageManager();
        new AnimationManager();
        new ParticleSystem();
        new ConfigLoader();
        
        console.log('🚀 Portfolio initialized');
    }
}

// ===== STARTUP =====
document.addEventListener('DOMContentLoaded', () => new Portfolio());

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => console.error('Error:', e.error));
window.addEventListener('unhandledrejection', (e) => console.error('Promise rejection:', e.reason));