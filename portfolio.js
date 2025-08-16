/**
 * PORTFOLIO - PRODUCTION READY
 * Minimaliste & SOLID
 * @author Baptiste Lavogiez
 * @version 3.0.0
 */

'use strict';

// ===== CONFIGURATION =====
const CONFIG = {
    LOADING_DURATION: 800,
    ANIMATION_DURATION: 200,
    IMAGE_ROTATION_INTERVAL: 4000,
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
            this.animateProjectTransition(() => {
                this.currentIndex = newIndex;
                this.showProject();
            });
        }
    }
    
    animateProjectTransition(callback) {
        if (!this.projectCard) return callback();
        
        // Add exit animation
        this.projectCard.classList.add('exiting');
        
        setTimeout(() => {
            callback();
            this.projectCard.classList.remove('exiting');
        }, CONFIG.ANIMATION_DURATION);
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
        this.setupLazyLoading();
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
                <img src="${project.image_main}" alt="${project.name_fr} - Image 1" class="gallery-image active" loading="lazy" decoding="async" />
                <img data-src="${project.image_gallery1}" alt="${project.name_fr} - Image 2" class="gallery-image lazy-load" loading="lazy" decoding="async" />
                <img data-src="${project.image_gallery2}" alt="${project.name_fr} - Image 3" class="gallery-image lazy-load" loading="lazy" decoding="async" />
                
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
        
        // Ajouter le clic sur image pour agrandissement
        images.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openLightbox(img.src, img.alt);
            });
            img.style.cursor = 'pointer';
        });
        
        this.currentImageIndex = 0;
        this.startImageRotation();
    }
    
    setupLazyLoading() {
        const lazyImages = DOM.queryAll('.lazy-load', this.projectCard);
        
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        lazyImageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => lazyImageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
            });
        }
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
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.projects.length - 1;
        }
        
        if (this.counterCurrent) this.counterCurrent.textContent = this.currentIndex + 1;
        if (this.counterTotal) this.counterTotal.textContent = this.projects.length;
    }

    openLightbox(imageSrc, imageAlt) {
        // Créer la lightbox
        const lightbox = DOM.createElement('div', 'lightbox', `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="${imageAlt}" />
                <button class="lightbox-close" aria-label="Fermer">✕</button>
            </div>
        `);

        document.body.appendChild(lightbox);

        // Gestion de la fermeture
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const closeLightbox = () => {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', handleKeydown);
        };

        const handleKeydown = (e) => {
            if (e.key === 'Escape') closeLightbox();
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', handleKeydown);

        // Animation d'entrée
        setTimeout(() => lightbox.classList.add('active'), 10);
    }
}

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
            // Essayer de charger depuis settings.ini
            const response = await fetch('settings.ini');
            if (!response.ok) throw new Error('Config not found');
            
            const text = await response.text();
            this.parse(text);
            this.apply();
        } catch (error) {
            console.warn('CORS error or config not found, using embedded config:', error.message);
            this.loadEmbeddedConfig();
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

    loadEmbeddedConfig() {
        this.config = {
            Personal: {
                name: 'Baptiste Lavogiez',
                title_fr: 'Étudiant en 2ème année - Développeur passionné',
                title_en: '2nd Year Student - Passionate Developer',
                email: 'baptiste.lavogiez@example.com',
                linkedin: 'https://linkedin.com/in/baptiste-lavogiez',
                github: 'https://github.com/baptiste-lavogiez',
                photo: 'photo.jpg'
            },
            Site: {
                year: '2025',
                logo_text_fr: 'Portfolio',
                logo_text_en: 'Portfolio'
            },
            About: {
                description_fr: 'Étudiant passionné en informatique, je développe des projets créatifs et techniques. Toujours en quête d\'apprentissage et d\'innovation.',
                description_en: 'Passionate computer science student, I develop creative and technical projects. Always seeking learning and innovation.',
                years_study: '2+',
                projects_completed: '8+'
            },
            Project1: {
                name_fr: 'Application Web Portfolio',
                name_en: 'Portfolio Web App',
                summary_fr: 'Site portfolio moderne et responsive avec animations CSS.',
                summary_en: 'Modern responsive portfolio website with CSS animations.',
                description_fr: 'Développement complet d\'un portfolio personnel utilisant HTML5, CSS3 et JavaScript vanilla. Fonctionnalités : système multilingue, animations fluides, design responsive optimisé pour tous les appareils.',
                description_en: 'Complete development of a personal portfolio using HTML5, CSS3 and vanilla JavaScript. Features: multilingual system, smooth animations, responsive design optimized for all devices.',
                github: 'https://github.com/baptiste-lavogiez/portfolio',
                image_main: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
                tags: 'HTML/CSS,JavaScript,Responsive'
            },
            Project2: {
                name_fr: 'API de Gestion de Tâches',
                name_en: 'Task Management API',
                summary_fr: 'API REST pour gestion de projets avec authentification JWT.',
                summary_en: 'REST API for project management with JWT authentication.',
                description_fr: 'API complète développée en Python/Flask avec base de données PostgreSQL. Système d\'authentification sécurisé, CRUD complet pour les tâches, tests unitaires et documentation Swagger.',
                description_en: 'Complete API developed in Python/Flask with PostgreSQL database. Secure authentication system, full CRUD for tasks, unit tests and Swagger documentation.',
                github: 'https://github.com/baptiste-lavogiez/task-api',
                image_main: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
                tags: 'Python,Flask,PostgreSQL'
            },
            Project3: {
                name_fr: 'Dashboard Analytique',
                name_en: 'Analytics Dashboard',
                summary_fr: 'Interface de visualisation de données temps réel avec React.',
                summary_en: 'Real-time data visualization interface with React.',
                description_fr: 'Application React complète avec Redux pour la gestion d\'état, intégration d\'APIs externes, graphiques interactifs avec Chart.js, et système de notifications en temps réel via WebSockets.',
                description_en: 'Complete React application with Redux for state management, external API integration, interactive charts with Chart.js, and real-time notification system via WebSockets.',
                github: 'https://github.com/baptiste-lavogiez/analytics-dashboard',
                image_main: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
                tags: 'React,Redux,Chart.js'
            },
            Project4: {
                name_fr: 'Application Mobile E-commerce',
                name_en: 'E-commerce Mobile App',
                summary_fr: 'App mobile cross-platform avec Flutter pour le shopping en ligne.',
                summary_en: 'Cross-platform mobile app with Flutter for online shopping.',
                description_fr: 'Application mobile complète développée avec Flutter, intégrant paiements sécurisés, gestion du panier, notifications push et synchronisation offline. Interface moderne avec animations fluides.',
                description_en: 'Complete mobile application developed with Flutter, integrating secure payments, cart management, push notifications and offline sync. Modern interface with smooth animations.',
                github: 'https://github.com/baptiste-lavogiez/ecommerce-app',
                image_main: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop',
                tags: 'Flutter,Dart,Firebase'
            },
            Project5: {
                name_fr: 'Système de Chat en Temps Réel',
                name_en: 'Real-time Chat System',
                summary_fr: 'Plateforme de messagerie instantanée avec WebSockets et Redis.',
                summary_en: 'Instant messaging platform with WebSockets and Redis.',
                description_fr: 'Système de chat moderne avec messages en temps réel, salles privées et publiques, partage de fichiers, émojis personnalisés et notifications desktop. Architecture scalable avec microservices.',
                description_en: 'Modern chat system with real-time messages, private and public rooms, file sharing, custom emojis and desktop notifications. Scalable architecture with microservices.',
                github: 'https://github.com/baptiste-lavogiez/chat-system',
                image_main: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop',
                tags: 'Node.js,WebSocket,Redis'
            },
            Project6: {
                name_fr: 'Intelligence Artificielle pour Images',
                name_en: 'AI Image Recognition',
                summary_fr: 'Modèle de deep learning pour classification et détection d\'objets.',
                summary_en: 'Deep learning model for classification and object detection.',
                description_fr: 'Développement d\'un modèle CNN avec TensorFlow pour la reconnaissance d\'images. Précision de 94% sur le dataset CIFAR-10, interface web pour tests en temps réel et API REST pour intégration.',
                description_en: 'Development of a CNN model with TensorFlow for image recognition. 94% accuracy on CIFAR-10 dataset, web interface for real-time testing and REST API for integration.',
                github: 'https://github.com/baptiste-lavogiez/ai-image-recognition',
                image_main: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop',
                tags: 'Python,TensorFlow,AI'
            },
            Project7: {
                name_fr: 'Plateforme de Streaming Vidéo',
                name_en: 'Video Streaming Platform',
                summary_fr: 'Netflix-like avec transcoding automatique et CDN optimisé.',
                summary_en: 'Netflix-like platform with automatic transcoding and optimized CDN.',
                description_fr: 'Plateforme complète de streaming vidéo avec upload, transcoding automatique multi-résolutions, système d\'abonnements, recommandations personnalisées et analytics détaillées.',
                description_en: 'Complete video streaming platform with upload, automatic multi-resolution transcoding, subscription system, personalized recommendations and detailed analytics.',
                github: 'https://github.com/baptiste-lavogiez/streaming-platform',
                image_main: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=200&fit=crop',
                tags: 'Vue.js,FFmpeg,AWS'
            },
            Project8: {
                name_fr: 'Blockchain et Cryptomonnaies',
                name_en: 'Blockchain & Cryptocurrency',
                summary_fr: 'Implémentation complète d\'une blockchain avec mining et wallet.',
                summary_en: 'Complete blockchain implementation with mining and wallet.',
                description_fr: 'Développement from scratch d\'une blockchain fonctionnelle avec proof-of-work, wallet sécurisé, transactions peer-to-peer et interface de mining. Étude approfondie des cryptomonnaies.',
                description_en: 'From-scratch development of a functional blockchain with proof-of-work, secure wallet, peer-to-peer transactions and mining interface. In-depth study of cryptocurrencies.',
                github: 'https://github.com/baptiste-lavogiez/blockchain-crypto',
                image_main: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
                image_gallery1: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=300&h=200&fit=crop',
                image_gallery2: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=300&h=200&fit=crop',
                tags: 'Go,Cryptography,P2P'
            }
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