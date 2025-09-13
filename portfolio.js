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

// ===== INSTANT LOAD =====
class InstantLoad {
    constructor() {
        this.init();
    }

    showSlide(index) {
        const wrappers = DOM.queryAll('.project-gallery .image-wrapper', this.projectCard);
        const images = DOM.queryAll('.gallery-image', this.projectCard);
        const dots = DOM.queryAll('.gallery-dot', this.projectCard);

        // Pause any playing video when changing slides
        this.videoManager.pauseAll();

        wrappers.forEach((wrapper, i) => {
            wrapper.style.display = i === index ? 'block' : 'none';
        });
        images.forEach((img) => img.classList.remove('active'));
        const currentWrapper = wrappers[index];
        const currentImg = currentWrapper ? currentWrapper.querySelector('.gallery-image') : null;
        if (currentImg) currentImg.classList.add('active');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

        this.currentImageIndex = index;
        if (typeof this.updateGalleryUI === 'function') this.updateGalleryUI();
    }

    updateGalleryUI() {
        const dots = DOM.queryAll('.gallery-dot', this.projectCard);
        dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentImageIndex));

        const zoomBtn = DOM.query('.gallery-zoom', this.projectCard);
        if (zoomBtn) {
            const wrappers = DOM.queryAll('.project-gallery .image-wrapper', this.projectCard);
            const current = wrappers[this.currentImageIndex];
            const isImage = current && current.getAttribute('data-type') === 'image';
            zoomBtn.disabled = !isImage;
            zoomBtn.setAttribute('aria-disabled', String(!isImage));
        }
    }

    init() {
        // Immediate reveal with smooth entry animations
        document.body.classList.add('loaded');
        
        // Stagger animations for visual appeal
        this.animateElements();
    }
    
    animateElements() {
        const elements = DOM.queryAll('.hero-content > *');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 100}ms`;
            el.classList.add('fade-in-up');
        });
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
        
        // Update meta tags and image alt for language change
        const ui = window.SETTINGS_CONFIG?.UI;
        if (ui) {
            // Update meta tags
            const metaDesc = DOM.query('meta[name="description"]');
            if (metaDesc && ui.meta_description_fr && ui.meta_description_en) {
                metaDesc.content = lang === 'en' ? ui.meta_description_en : ui.meta_description_fr;
            }
            
            const metaKeywords = DOM.query('meta[name="keywords"]');
            if (metaKeywords && ui.meta_keywords_fr && ui.meta_keywords_en) {
                metaKeywords.content = lang === 'en' ? ui.meta_keywords_en : ui.meta_keywords_fr;
            }
            
            const ogTitle = DOM.query('meta[property="og:title"]');
            if (ogTitle && ui.og_title_fr && ui.og_title_en) {
                ogTitle.content = lang === 'en' ? ui.og_title_en : ui.og_title_fr;
            }
            
            const ogDesc = DOM.query('meta[property="og:description"]');
            if (ogDesc && ui.og_description_fr && ui.og_description_en) {
                ogDesc.content = lang === 'en' ? ui.og_description_en : ui.og_description_fr;
            }
            
            const twitterTitle = DOM.query('meta[property="twitter:title"]');
            if (twitterTitle && ui.og_title_fr && ui.og_title_en) {
                twitterTitle.content = lang === 'en' ? ui.og_title_en : ui.og_title_fr;
            }
            
            const twitterDesc = DOM.query('meta[property="twitter:description"]');
            if (twitterDesc && ui.og_description_fr && ui.og_description_en) {
                twitterDesc.content = lang === 'en' ? ui.og_description_en : ui.og_description_fr;
            }
            
            // Update image alt
            const profileImg = DOM.query('[data-ui="profile_image_alt"]');
            if (profileImg && ui.profile_image_alt_fr && ui.profile_image_alt_en) {
                profileImg.alt = lang === 'en' ? ui.profile_image_alt_en : ui.profile_image_alt_fr;
            }
        }
    }
}

// ===== TECH ICONS =====
class TechIcons {
    static MAP = {
        'HTML/CSS': { icon: '<img src="https://img.icons8.com/color/32/html-5--v1.png" alt="HTML/CSS"/>', class: 'html' },
        'HTML': { icon: '<img src="https://img.icons8.com/color/32/html-5--v1.png" alt="HTML"/>', class: 'html' },
        'CSS': { icon: '<img src="https://img.icons8.com/color/32/css3.png" alt="CSS"/>', class: 'css' },
        'JavaScript': { icon: '<img src="https://img.icons8.com/color/32/javascript--v1.png" alt="JavaScript"/>', class: 'js' },
        'React': { icon: '<img src="https://img.icons8.com/color/32/react-native.png" alt="React"/>', class: 'react' },
        'Python': { icon: '<img src="https://img.icons8.com/color/32/python--v1.png" alt="Python"/>', class: 'python' },
        'Node.js': { icon: '<img src="https://img.icons8.com/color/32/nodejs.png" alt="Node.js"/>', class: 'node' },
        'Flutter': { icon: '<img src="https://img.icons8.com/color/32/flutter.png" alt="Flutter"/>', class: 'flutter' },
        'Firebase': { icon: '<img src="https://img.icons8.com/color/32/firebase.png" alt="Firebase"/>', class: 'firebase' },
        'PostgreSQL': { icon: '<img src="https://img.icons8.com/color/32/postgreesql.png" alt="PostgreSQL"/>', class: 'postgres' },
        'Redux': { icon: '<img src="https://img.icons8.com/color/32/redux.png" alt="Redux"/>', class: 'redux' },
        'WebSocket': { icon: '<img src="https://img.icons8.com/color/32/api-settings.png" alt="WebSocket"/>', class: 'websocket' },
        'Redis': { icon: '<img src="https://img.icons8.com/color/32/redis.png" alt="Redis"/>', class: 'redis' },
        'Flask': { icon: '<img src="https://img.icons8.com/color/32/flask.png" alt="Flask"/>', class: 'flask' },
        'Express': { icon: '<img src="https://img.icons8.com/office/32/express-js.png" alt="Express"/>', class: 'express' },
        'Vue.js': { icon: '<img src="https://img.icons8.com/color/32/vue-js.png" alt="Vue.js"/>', class: 'vue' },
        'MongoDB': { icon: '<img src="https://img.icons8.com/color/32/mongodb.png" alt="MongoDB"/>', class: 'mongodb' },
        'AWS': { icon: '<img src="https://img.icons8.com/color/32/amazon-web-services.png" alt="AWS"/>', class: 'aws' },
        'Docker': { icon: '<img src="https://img.icons8.com/color/32/docker.png" alt="Docker"/>', class: 'docker' },
        'TensorFlow': { icon: '<img src="https://img.icons8.com/color/32/tensorflow.png" alt="TensorFlow"/>', class: 'tensorflow' },
        'AI': { icon: '<img src="https://img.icons8.com/color/32/artificial-intelligence.png" alt="AI"/>', class: 'ai' },
        'FFmpeg': { icon: '<img src="https://img.icons8.com/color/32/video.png" alt="FFmpeg"/>', class: 'ffmpeg' },
        'Go': { icon: '<img src="https://img.icons8.com/color/32/golang.png" alt="Go"/>', class: 'go' },
        'Cryptography': { icon: '<img src="https://img.icons8.com/color/32/lock-2.png" alt="Cryptography"/>', class: 'crypto' },
        'P2P': { icon: '<img src="https://img.icons8.com/color/32/network.png" alt="P2P"/>', class: 'p2p' },
        'Chart.js': { icon: '<img src="https://img.icons8.com/color/32/bar-chart.png" alt="Chart.js"/>', class: 'chartjs' },
        'Dart': { icon: '<img src="https://img.icons8.com/color/32/dart.png" alt="Dart"/>', class: 'dart' },
        'Responsive': { icon: '<img src="https://img.icons8.com/color/32/responsive.png" alt="Responsive"/>', class: 'responsive' }
    };

    static generate(tags) {
        return tags.split(',')
            .map(tag => tag.trim())
            .map(tag => {
                const tech = this.MAP[tag] || { icon: '<img src="https://img.icons8.com/color/32/code.png" alt="Code"/>', class: 'default' };
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
        this.videoManager = new VideoPlayerManager();
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
        
        // Exit animation
        this.projectCard.classList.add('exiting');
        
        setTimeout(() => {
            // Load new content
            callback();
            
            // Remove exit animation and add enter animation
            this.projectCard.classList.remove('exiting');
            this.projectCard.classList.add('entering');
            
            // Clean up enter animation after it completes
            setTimeout(() => {
                this.projectCard.classList.remove('entering');
            }, 250);
        }, 250);
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

        // Destroy existing video players before creating new content
        this.videoManager.destroyAllPlayers();

        this.projectCard.innerHTML = this.createProjectCard(project);

        // Always setup gallery navigation and lazy loading
        this.setupImageNavigation();
        this.setupLazyLoading();

        // Setup video player if present
        const hasVideo = VideoPlayerManager.isVideoUrl(project.video_url);
        if (hasVideo) this.setupVideoPlayer(project);

        this.setupExpandableDescription();
        if (typeof this.updateGalleryUI === 'function') this.updateGalleryUI();
        this.updateControls();

        // Update language
        const currentLang = document.documentElement.lang;
        DOM.queryAll('[data-fr][data-en]', this.projectCard).forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) el.textContent = text;
        });
    }

    setupVideoPlayer(project) {
        // Wait for DOM to be ready, then initialize video player
        setTimeout(() => {
            const videoElement = DOM.query('.plyr__video-embed, .plyr-video', this.projectCard);
            if (videoElement) {
                const videoId = videoElement.id;
                this.videoManager.initializePlayer(videoId);
            }
        }, 100);
    }

    createProjectCard(project) {
        const techIcons = TechIcons.generate(project.tags);

        // Check if project has video
        const hasVideo = VideoPlayerManager.isVideoUrl(project.video_url);

        // Build unified slides: video (if any) + images
        const slides = [];

        if (hasVideo) {
            const videoId = `video-${Date.now()}`;
            const url = project.video_url;
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                slides.push(`
                    <div class="image-wrapper" data-type="video">
                        <div class="plyr__video-embed" id="${videoId}">
                            <iframe src="https://www.youtube.com/embed/${this.videoManager.extractYouTubeId(url)}?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>
                        </div>
                    </div>
                `);
            } else if (url.includes('vimeo.com')) {
                slides.push(`
                    <div class="image-wrapper" data-type="video">
                        <div class="plyr__video-embed" id="${videoId}">
                            <iframe src="https://player.vimeo.com/video/${this.videoManager.extractVimeoId(url)}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media" allowfullscreen allowtransparency allow="autoplay"></iframe>
                        </div>
                    </div>
                `);
            } else {
                slides.push(`
                    <div class="image-wrapper" data-type="video">
                        <video class="plyr-video" id="${videoId}" playsinline controls>
                            <source src="${url}" type="video/mp4" />
                        </video>
                    </div>
                `);
            }
        }

        slides.push(`
            <div class="image-wrapper" data-type="image">
                <img src="${project.image_main}" alt="${project.name_fr} - Image 1" class="gallery-image active" loading="lazy" decoding="async" />
            </div>
        `);
        slides.push(`
            <div class="image-wrapper" data-type="image">
                <img data-src="${project.image_gallery1}" alt="${project.name_fr} - Image 2" class="gallery-image lazy-load" loading="lazy" decoding="async" />
            </div>
        `);
        slides.push(`
            <div class="image-wrapper" data-type="image">
                <img data-src="${project.image_gallery2}" alt="${project.name_fr} - Image 3" class="gallery-image lazy-load" loading="lazy" decoding="async" />
            </div>
        `);

        const dots = Array.from({ length: slides.length }, (_, i) => `<span class=\"gallery-dot${i === 0 ? ' active' : ''}\" data-index=\"${i}\" aria-label=\"Slide ${i+1}\" role=\"button\" tabindex=\"0\"></span>`).join('');

        const galleryContent = `
            <div class=\"project-gallery\">\n                ${slides.join('\\n')}\n                <div class=\"project-overlay\">\n                    <h3 class=\"project-title\" data-fr=\"${project.name_fr}\" data-en=\"${project.name_en}\">${project.name_fr}</h3>\n                    <p class=\"project-subtitle\" data-fr=\"${project.summary_fr}\" data-en=\"${project.summary_en}\">${project.summary_fr}</p>\n                </div>\n            </div>\n            <div class=\"gallery-controls\">\n                <div class=\"gallery-dots\">${dots}</div>\n                <button class=\"gallery-zoom\" aria-label=\"Open image in lightbox\" title=\"Agrandir\">\n                    <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                        <path d=\"M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/>\n                        <path d=\"m12 10h-2v-2h-1v2H7v1h2v2h1v-2h2z\"/>\n                    </svg>\n                </button>\n            </div>
        `;

        return `
            ${galleryContent}

            <div class="project-info">
                <div class="tech-icons">${techIcons}</div>
                <div class="project-content">
                    <div class="project-summary" data-fr="${project.description_fr}" data-en="${project.description_en}">${project.description_fr}</div>
                    <div class="project-details" data-fr="${project.extended_description_fr || project.description_fr}" data-en="${project.extended_description_en || project.description_en}">${project.extended_description_fr || project.description_fr}</div>
                </div>
                <div class="project-actions">
                    <button class="expand-toggle-btn" data-expanded="false">
                        <span class="expand-text" data-fr="${window.PORTFOLIO_CONFIG?.UI?.projects_more_info_fr || 'Plus d\'infos'}" data-en="${window.PORTFOLIO_CONFIG?.UI?.projects_more_info_en || 'More info'}">${window.PORTFOLIO_CONFIG?.UI?.projects_more_info_fr || 'Plus d\'infos'}</span>
                        <svg class="expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <a href="${project.github}" class="github-link" target="_blank" rel="noopener">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span data-fr="${window.PORTFOLIO_CONFIG?.UI?.projects_view_code_fr || 'Voir le code'}" data-en="${window.PORTFOLIO_CONFIG?.UI?.projects_view_code_en || 'View code'}">${window.PORTFOLIO_CONFIG?.UI?.projects_view_code_fr || 'Voir le code'}</span>
                    </a>
                </div>
            </div>
        `;
    }

    setupImageNavigation() {
        const images = DOM.queryAll('.gallery-image', this.projectCard);
        const dots = DOM.queryAll('.gallery-dot', this.projectCard);
        const zoomBtn = DOM.query('.gallery-zoom', this.projectCard);
        const zoomIcons = DOM.queryAll('.zoom-icon', this.projectCard);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });
        
        if (zoomBtn) {
            zoomBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wrappers = DOM.queryAll('.project-gallery .image-wrapper', this.projectCard);
                const current = wrappers[this.currentImageIndex];
                if (!current) return;
                const isImage = current.getAttribute('data-type') === 'image';
                if (!isImage) return;

                const images = DOM.queryAll('.gallery-image', this.projectCard);
                const hasVideo = VideoPlayerManager.isVideoUrl(this.projects[this.currentIndex]?.video_url);
                const imageIndex = hasVideo ? this.currentImageIndex - 1 : this.currentImageIndex;
                const img = images[imageIndex];
                if (!img) return;
                const imageSrc = img.src || img.dataset.src;
                if (imageSrc && imageSrc !== '') {
                    this.openLightbox(imageSrc, img.alt, Math.max(0, imageIndex));
                }
            });
        }
        
        // Ajouter le clic sur les icônes zoom pour agrandissement
        zoomIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageIndex = parseInt(icon.dataset.image);
                const img = images[imageIndex];
                const imageSrc = img.src || img.dataset.src;
                if (imageSrc && imageSrc !== '') {
                    this.openLightbox(imageSrc, img.alt, imageIndex);
                }
            });
            icon.style.cursor = 'pointer';
        });
        
        // Aussi permettre le clic sur les images
        images.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageSrc = img.src || img.dataset.src;
                if (imageSrc && imageSrc !== '') {
                    this.openLightbox(imageSrc, img.alt, index);
                }
            });
            img.style.cursor = 'pointer';
        });
        
        this.currentImageIndex = 0;
        if (typeof this.updateGalleryUI === 'function') this.updateGalleryUI();
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
        const imageWrappers = DOM.queryAll('.image-wrapper', this.projectCard);
        const images = DOM.queryAll('.gallery-image', this.projectCard);
        const dots = DOM.queryAll('.gallery-dot', this.projectCard);
        
        // Masquer tous les wrappers et afficher celui sélectionné
        imageWrappers.forEach((wrapper, i) => {
            wrapper.style.display = i === index ? 'block' : 'none';
        });
        
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
                this.showSlide(this.currentImageIndex);
            }
        }, CONFIG.IMAGE_ROTATION_INTERVAL);
    }

    setupExpandableDescription() {
        const expandBtn = DOM.query('.expand-toggle-btn', this.projectCard);
        const projectDetails = DOM.query('.project-details', this.projectCard);
        const expandText = DOM.query('.expand-text', this.projectCard);
        const expandIcon = DOM.query('.expand-icon', this.projectCard);
        
        if (!expandBtn || !projectDetails || !expandText || !expandIcon) return;
        
        expandBtn.addEventListener('click', () => {
            const isExpanded = expandBtn.getAttribute('data-expanded') === 'true';
            const newState = !isExpanded;
            
            expandBtn.setAttribute('data-expanded', newState);
            projectDetails.classList.toggle('expanded', newState);
            expandIcon.classList.toggle('rotated', newState);
            
            // Update button text based on current language and state
            const currentLang = document.documentElement.lang;
            const moreInfoKey = `projects_more_info_${currentLang}`;
            const lessInfoKey = `projects_less_info_${currentLang}`;
            
            const moreInfoText = window.PORTFOLIO_CONFIG?.UI?.[moreInfoKey] || (currentLang === 'en' ? 'More info' : 'Plus d\'infos');
            const lessInfoText = window.PORTFOLIO_CONFIG?.UI?.[lessInfoKey] || (currentLang === 'en' ? 'Less info' : 'Moins d\'infos');
            
            expandText.textContent = newState ? lessInfoText : moreInfoText;
            expandText.setAttribute('data-fr', newState ? window.PORTFOLIO_CONFIG?.UI?.projects_less_info_fr || 'Moins d\'infos' : window.PORTFOLIO_CONFIG?.UI?.projects_more_info_fr || 'Plus d\'infos');
            expandText.setAttribute('data-en', newState ? window.PORTFOLIO_CONFIG?.UI?.projects_less_info_en || 'Less info' : window.PORTFOLIO_CONFIG?.UI?.projects_more_info_en || 'More info');
        });
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

    openLightbox(imageSrc, imageAlt, startIndex = 0) {
        const currentProject = this.projects[this.currentIndex];
        const images = [
            { src: currentProject.image_main, alt: `${currentProject.name_fr} - Image 1` },
            { src: currentProject.image_gallery1, alt: `${currentProject.name_fr} - Image 2` },
            { src: currentProject.image_gallery2, alt: `${currentProject.name_fr} - Image 3` }
        ];
        
        let currentImageIndex = startIndex;

        // Créer la lightbox avec navigation
        const lightbox = DOM.createElement('div', 'lightbox', `
            <div class="lightbox-content">
                <img src="${images[currentImageIndex].src}" alt="${images[currentImageIndex].alt}" />
                <button class="lightbox-close" aria-label="Fermer">✕</button>
                <button class="lightbox-nav lightbox-prev" aria-label="Image précédente">‹</button>
                <button class="lightbox-nav lightbox-next" aria-label="Image suivante">›</button>
                <div class="lightbox-counter">
                    <span class="lightbox-current">${currentImageIndex + 1}</span> / <span class="lightbox-total">${images.length}</span>
                </div>
            </div>
        `);

        document.body.appendChild(lightbox);

        // Elements
        const img = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const currentSpan = lightbox.querySelector('.lightbox-current');

        // Navigation functions
        const updateImage = () => {
            img.src = images[currentImageIndex].src;
            img.alt = images[currentImageIndex].alt;
            currentSpan.textContent = currentImageIndex + 1;
            
            prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentImageIndex === images.length - 1 ? '0.5' : '1';
        };

        const showPrevious = () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateImage();
            }
        };

        const showNext = () => {
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                updateImage();
            }
        };

        // Gestion de la fermeture
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                if (lightbox.parentNode) {
                    document.body.removeChild(lightbox);
                }
                document.removeEventListener('keydown', handleKeydown);
            }, 200);
        };

        const handleKeydown = (e) => {
            e.preventDefault();
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevious();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        };

        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevious);
        nextBtn.addEventListener('click', showNext);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', handleKeydown);

        // Initial setup
        updateImage();

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

// ===== VIDEO PLAYER MANAGER =====
class VideoPlayerManager {
    constructor() {
        this.players = new Map();
    }

    static isVideoUrl(url) {
        if (!url) return false;

        // Check for YouTube URLs
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        if (youtubeRegex.test(url)) return true;

        // Check for Vimeo URLs
        const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
        if (vimeoRegex.test(url)) return true;

        // Check for direct video files
        const videoExtensions = /\.(mp4|webm|ogg|avi|mov)(\?.*)?$/i;
        if (videoExtensions.test(url)) return true;

        return false;
    }

    createVideoElement(project) {
        const videoId = `video-${Date.now()}`;
        const videoUrl = project.video_url;

        // Determine video type and create appropriate element
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            return `
                <div class="project-video-wrapper">
                    <div class="plyr__video-embed" id="${videoId}">
                        <iframe
                            src="https://www.youtube.com/embed/${this.extractYouTubeId(videoUrl)}?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay">
                        </iframe>
                    </div>
                    <div class="video-overlay">
                        <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                        <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                    </div>
                </div>
            `;
        } else if (videoUrl.includes('vimeo.com')) {
            return `
                <div class="project-video-wrapper">
                    <div class="plyr__video-embed" id="${videoId}">
                        <iframe
                            src="https://player.vimeo.com/video/${this.extractVimeoId(videoUrl)}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay">
                        </iframe>
                    </div>
                    <div class="video-overlay">
                        <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                        <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="project-video-wrapper">
                    <video class="plyr-video" id="${videoId}" playsinline controls data-poster="">
                        <source src="${videoUrl}" type="video/mp4" />
                    </video>
                    <div class="video-overlay">
                        <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                        <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                    </div>
                </div>
            `;
        }
    }

    extractYouTubeId(url) {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        return match ? match[1] : '';
    }

    extractVimeoId(url) {
        const match = url.match(/(?:vimeo\.com\/)([0-9]+)/);
        return match ? match[1] : '';
    }

    initializePlayer(videoId) {
        if (typeof Plyr === 'undefined') {
            console.warn('Plyr not loaded, video player initialization skipped');
            return null;
        }

        try {
            const element = DOM.query(`#${videoId}`);
            if (!element) return null;

            const player = new Plyr(element, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                settings: ['quality', 'speed'],
                quality: { default: 720, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
                speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
                ratio: '16:9'
            });

            this.players.set(videoId, player);
            return player;
        } catch (error) {
            console.error('Failed to initialize video player:', error);
            return null;
        }
    }

    destroyPlayer(videoId) {
        const player = this.players.get(videoId);
        if (player && typeof player.destroy === 'function') {
            player.destroy();
            this.players.delete(videoId);
        }
    }

    destroyAllPlayers() {
        this.players.forEach((player, videoId) => {
            if (typeof player.destroy === 'function') {
                player.destroy();
            }
        });
        this.players.clear();
    }

    pauseAll() {
        this.players.forEach((player) => {
            try {
                if (player && typeof player.pause === 'function') {
                    player.pause();
                }
            } catch (e) {
                // ignore
            }
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

    load() {
        console.log('🔄 Starting config load...');
        console.log('🔍 SETTINGS_CONFIG exists:', typeof SETTINGS_CONFIG !== 'undefined');
        console.log('🔍 SETTINGS_CONFIG value:', window.SETTINGS_CONFIG);
        
        // Utiliser directement la config depuis settings.js
        if (typeof SETTINGS_CONFIG !== 'undefined' && SETTINGS_CONFIG) {
            this.config = SETTINGS_CONFIG;
            console.log('✅ Settings loaded from settings.js');
            console.log('📋 UI keys available:', Object.keys(this.config.UI || {}));
            console.log('📋 Full config:', this.config);
        } else {
            console.error('❌ SETTINGS_CONFIG not found or empty! Cannot load content.');
            console.error('❌ Make sure settings.js is loaded before portfolio.js');
            return;
        }
        
        // Make config globally accessible for other functions
        window.PORTFOLIO_CONFIG = this.config;
        
        this.apply();
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
        this.applyUI();
    }

    applyPersonal() {
        const personal = window.PORTFOLIO_CONFIG?.Personal;
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
        const about = window.PORTFOLIO_CONFIG?.About;
        if (!about) return;

        // Note: Description and stats are now handled by applyUI()
        // This function is kept for potential other About configurations
    }

    applyProjects() {
        const projects = [];
        
        for (let i = 1; i <= 8; i++) {
            const project = window.PORTFOLIO_CONFIG?.[`Project${i}`];
            if (project) projects.push(project);
        }
        
        if (projects.length === 0) {
            projects.push(this.getDefaultProject());
        }
        
        this.projectNavigator.loadProjects(projects);
    }

    applySite() {
        const site = window.PORTFOLIO_CONFIG?.Site;
        if (site?.year) {
            const footer = DOM.query('footer p');
            if (footer) {
                footer.innerHTML = footer.innerHTML.replace(/\d{4}/, site.year);
            }
        }
    }

    applyUI() {
        const ui = window.PORTFOLIO_CONFIG?.UI;
        if (!ui) {
            console.error('❌ No UI config found');
            return;
        }
        console.log('🎨 Applying UI config...');

        // Apply title
        const titleEl = DOM.query('[data-ui="title"]');
        if (titleEl && ui.title_fr && ui.title_en) {
            titleEl.setAttribute('data-fr', ui.title_fr);
            titleEl.setAttribute('data-en', ui.title_en);
            const currentLang = document.documentElement.lang || 'fr';
            titleEl.textContent = currentLang === 'en' ? ui.title_en : ui.title_fr;
            document.title = titleEl.textContent; // Update document title too
        }

        // Apply all UI elements with data-ui attribute
        Object.keys(ui).forEach(key => {
            if (key.endsWith('_fr')) {
                const baseKey = key.replace('_fr', '');
                const enKey = baseKey + '_en';
                
                if (ui[enKey]) {
                    const elements = DOM.queryAll(`[data-ui="${baseKey}"]`);
                    
                    elements.forEach(el => {
                        el.setAttribute('data-fr', ui[key]);
                        el.setAttribute('data-en', ui[enKey]);
                        
                        const currentLang = document.documentElement.lang || 'fr';
                        el.textContent = currentLang === 'en' ? ui[enKey] : ui[key];
                    });
                }
            }
        });

        // Apply non-text values (like stats values and logo)
        ['about_years_value', 'about_projects_value', 'logo_text'].forEach(key => {
            if (ui[key]) {
                const elements = DOM.queryAll(`[data-ui="${key}"]`);
                console.log(`🔤 Setting ${key}: found ${elements.length} element(s)`);
                elements.forEach(el => {
                    el.textContent = ui[key];
                });
            }
        });

        // Generate journey skills tags
        this.generateJourneySkills();

        // Generate skills badges  
        this.generateSkillsBadges();
        
        // Apply meta tags
        this.applyMetaTags();
        
        // Apply image alt
        const profileImg = DOM.query('[data-ui="profile_image_alt"]');
        if (profileImg && ui.profile_image_alt_fr && ui.profile_image_alt_en) {
            const currentLang = document.documentElement.lang || 'fr';
            profileImg.alt = currentLang === 'en' ? ui.profile_image_alt_en : ui.profile_image_alt_fr;
        }
    }

    applyMetaTags() {
        const ui = window.PORTFOLIO_CONFIG?.UI;
        if (!ui) return;
        
        const currentLang = document.documentElement.lang || 'fr';
        
        // Update meta description
        const metaDesc = DOM.query('meta[name="description"]');
        if (metaDesc && ui.meta_description_fr && ui.meta_description_en) {
            metaDesc.content = currentLang === 'en' ? ui.meta_description_en : ui.meta_description_fr;
        }
        
        // Update meta keywords  
        const metaKeywords = DOM.query('meta[name="keywords"]');
        if (metaKeywords && ui.meta_keywords_fr && ui.meta_keywords_en) {
            metaKeywords.content = currentLang === 'en' ? ui.meta_keywords_en : ui.meta_keywords_fr;
        }
        
        // Update meta author
        const metaAuthor = DOM.query('meta[name="author"]');
        if (metaAuthor && ui.logo_text) {
            metaAuthor.content = ui.logo_text;
        }
        
        // Update Open Graph tags
        const ogTitle = DOM.query('meta[property="og:title"]');
        if (ogTitle && ui.og_title_fr && ui.og_title_en) {
            ogTitle.content = currentLang === 'en' ? ui.og_title_en : ui.og_title_fr;
        }
        
        const ogDesc = DOM.query('meta[property="og:description"]');
        if (ogDesc && ui.og_description_fr && ui.og_description_en) {
            ogDesc.content = currentLang === 'en' ? ui.og_description_en : ui.og_description_fr;
        }
        
        // Update Twitter tags
        const twitterTitle = DOM.query('meta[property="twitter:title"]');
        if (twitterTitle && ui.og_title_fr && ui.og_title_en) {
            twitterTitle.content = currentLang === 'en' ? ui.og_title_en : ui.og_title_fr;
        }
        
        const twitterDesc = DOM.query('meta[property="twitter:description"]');
        if (twitterDesc && ui.og_description_fr && ui.og_description_en) {
            twitterDesc.content = currentLang === 'en' ? ui.og_description_en : ui.og_description_fr;
        }
    }

    generateJourneySkills() {
        const ui = window.PORTFOLIO_CONFIG?.UI;
        const skillsContainer = DOM.query('[data-ui="journey_skills"]');
        
        if (!skillsContainer || !ui?.journey_skills) return;

        skillsContainer.innerHTML = '';
        ui.journey_skills.forEach(skill => {
            const skillTag = DOM.createElement('div', 'skill-tag', skill);
            skillsContainer.appendChild(skillTag);
        });
    }

    generateSkillsBadges() {
        const ui = window.PORTFOLIO_CONFIG?.UI;
        const skillsContainer = DOM.query('[data-ui="skills_list"]');
        
        if (!skillsContainer || !ui?.skills_list) return;

        // Icon mapping for skills
        const skillIcons = {
            'HTML5': 'https://img.icons8.com/color/48/html-5--v1.png',
            'CSS3': 'https://img.icons8.com/color/48/css3.png',
            'JavaScript': 'https://img.icons8.com/color/48/javascript--v1.png',
            'React': 'https://img.icons8.com/color/48/react-native.png',
            'Vue.js': 'https://img.icons8.com/color/48/vue-js.png',
            'Python': 'https://img.icons8.com/color/48/python--v1.png',
            'Node.js': 'https://img.icons8.com/color/48/nodejs.png',
            'Flask': 'https://img.icons8.com/color/48/flask.png',
            'Express': 'https://img.icons8.com/office/48/express-js.png',
            'FastAPI': 'https://img.icons8.com/color/48/api-settings.png',
            'PostgreSQL': 'https://img.icons8.com/color/48/postgreesql.png',
            'MongoDB': 'https://img.icons8.com/color/48/mongodb.png',
            'Redis': 'https://img.icons8.com/color/48/redis.png',
            'SQLite': 'https://img.icons8.com/color/48/sql.png',
            'Flutter': 'https://img.icons8.com/color/48/flutter.png',
            'AWS': 'https://img.icons8.com/color/48/amazon-web-services.png',
            'Firebase': 'https://img.icons8.com/color/48/firebase.png',
            'Docker': 'https://img.icons8.com/color/48/docker.png',
            'Git': 'https://img.icons8.com/color/48/git.png',
            'VS Code': 'https://img.icons8.com/color/48/visual-studio-code-2019.png',
            'Figma': 'https://img.icons8.com/color/48/figma--v1.png',
            'UI/UX': 'https://img.icons8.com/color/48/design.png',
            'Linux': 'https://img.icons8.com/color/48/linux--v1.png',
            'TypeScript': 'https://img.icons8.com/color/48/typescript.png'
        };

        skillsContainer.innerHTML = '';
        ui.skills_list.forEach(skill => {
            const icon = skillIcons[skill] || 'https://img.icons8.com/color/48/code.png';
            const skillBadge = DOM.createElement('div', 'skill-badge', `
                <img src="${icon}" alt="${skill}"/>
                <span>${skill}</span>
            `);
            skillsContainer.appendChild(skillBadge);
        });
        
        // Add special skills note section at the bottom
        if (ui.skills_special_fr || ui.skills_special_en) {
            const lang = document.documentElement.lang || 'fr';
            const skillsText = lang === 'en' ? ui.skills_special_en : ui.skills_special_fr;
            const skillsSection = DOM.createElement('div', 'skills-special', `
                <div class="skills-note">${skillsText}</div>
            `);
            skillsContainer.appendChild(skillsSection);
        }
    }

    /* loadEmbeddedConfig() { // DISABLED - not compatible with data-ui system
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
        }; */
    // }

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
        // Initialize instant load
        new InstantLoad();
        
        // Initialize core systems
        new LanguageManager();
        new AnimationManager();
        new ParticleSystem();
        new ConfigLoader();
        
        console.log('🚀 Portfolio initialized instantly');
    }
}

// ===== STARTUP =====
document.addEventListener('DOMContentLoaded', () => new Portfolio());

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => console.error('Error:', e.error));
window.addEventListener('unhandledrejection', (e) => console.error('Promise rejection:', e.reason));
