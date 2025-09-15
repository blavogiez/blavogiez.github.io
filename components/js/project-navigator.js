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

        // Event delegation for actions inside the current project card
        if (this.projectCard && !this._delegatedBound) {
            this.projectCard.addEventListener('click', (e) => {
                // Expand/collapse details
                const toggleBtn = e.target.closest('.expand-toggle-btn');
                if (toggleBtn) {
                    e.preventDefault();
                    const expandText = toggleBtn.querySelector('.expand-text');
                    const details = this.projectCard.querySelector('.project-details');
                    const icon = toggleBtn.querySelector('.expand-icon');
                    const newState = toggleBtn.getAttribute('data-expanded') !== 'true';
                    toggleBtn.setAttribute('data-expanded', String(newState));
                    this.projectCard.classList.toggle('details-expanded', newState);
                    if (details) details.classList.toggle('expanded', newState);
                    if (icon) icon.classList.toggle('rotated', newState);

                    const ui = window.PORTFOLIO_CONFIG?.UI || {};
                    const moreInfoText = ui.projects_more_info_fr || "Plus d'infos";
                    const lessInfoText = ui.projects_less_info_fr || "Moins d'infos";
                    if (expandText) {
                        expandText.textContent = newState ? lessInfoText : moreInfoText;
                        expandText.setAttribute('data-fr', newState ? (ui.projects_less_info_fr || 'Moins d\'infos') : (ui.projects_more_info_fr || 'Plus d\'infos'));
                        expandText.setAttribute('data-en', newState ? (ui.projects_less_info_en || 'Less info') : (ui.projects_more_info_en || 'More info'));
                    }
                    return;
                }

                // Click on gallery image opens lightbox
                const imgEl = e.target.closest('.project-gallery .image-wrapper[data-type="image"] img');
                if (imgEl) {
                    e.preventDefault();
                    const wrappers = Array.from(DOM.queryAll('.project-gallery .image-wrapper', this.projectCard));
                    const index = wrappers.findIndex(w => w.contains(imgEl));
                    const startIndex = Math.max(0, index);
                    this.openLightbox(imgEl.src, imgEl.alt, startIndex);
                }
            });
            this._delegatedBound = true;
        }
    }

    setupNavigation() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.navigate(-1));
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.navigate(1));
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
        
        // Basic swipe to change project (mobile)
        let startX = 0, startY = 0, tracking = false;
        const threshold = 40;
        const card = this.projectCard;
        if (card) {
            card.addEventListener('touchstart', (e) => {
                const t = e.changedTouches[0];
                startX = t.clientX; startY = t.clientY; tracking = true;
            }, { passive: true });
            card.addEventListener('touchend', (e) => {
                if (!tracking) return;
                const t = e.changedTouches[0];
                const dx = t.clientX - startX; const dy = t.clientY - startY;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
                    if (dx < 0) this.navigate(1); else this.navigate(-1);
                }
                tracking = false;
            }, { passive: true });
        }
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
        // Reset expanded state on project change
        this.projectCard.classList.remove('details-expanded');

        this.projectCard.innerHTML = this.createProjectCard(project);

        // Always setup gallery navigation and lazy loading
        this.setupImageNavigation();
        this.setupLazyLoading();

        // Setup video players if present (supports single or multiple URLs)
        const videoUrls = Array.isArray(project.video_urls)
            ? project.video_urls.filter(url => VideoPlayerManager.isVideoUrl(url))
            : (VideoPlayerManager.isVideoUrl(project.video_url) ? [project.video_url] : []);
        if (videoUrls.length > 0) this.setupVideoPlayer(project);

        this.setupExpandableDescription();
        if (typeof this.updateGalleryUI === 'function') this.updateGalleryUI();
        this.updateControls();

        // Update language while preserving HTML content when present
        const currentLang = document.documentElement.lang;
        DOM.queryAll('[data-fr][data-en]', this.projectCard).forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (!text) return;
            if (text.includes('<') && text.includes('>')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        });
    }

    setupVideoPlayer(project) {
        // Wait for DOM to be ready, then initialize all video players
        setTimeout(() => {
            const videoElements = DOM.queryAll('.plyr__video-embed, .plyr-video', this.projectCard);
            if (videoElements && videoElements.length) {
                videoElements.forEach(el => {
                    if (el.id) this.videoManager.initializePlayer(el.id);
                });
            }
        }, 100);
    }

    createProjectCard(project) {
        const techIcons = TechIcons.generate(project.tags);

        // Check if project has video(s)
        const videoUrls = Array.isArray(project.video_urls)
            ? project.video_urls.filter(url => VideoPlayerManager.isVideoUrl(url))
            : (VideoPlayerManager.isVideoUrl(project.video_url) ? [project.video_url] : []);

        // Build unified slides: images first, then optional video(s)
        const slides = [];

        // Main image first
        if (project.image_main) {
            slides.push(`
                <div class="image-wrapper" data-type="image">
                    <img src="${project.image_main}" alt="${project.name_fr} - Image 1" class="gallery-image active" loading="lazy" decoding="async" />
                </div>
            `);
        }

        // Additional gallery images from array (fallback to image_gallery1/2)
        const galleryImages = Array.isArray(project.image_gallery)
            ? project.image_gallery
            : [project.image_gallery1, project.image_gallery2].filter(Boolean);

        galleryImages.forEach((imgUrl, idx) => {
            const n = 2 + idx; // numbering starts after main image
            slides.push(`
                <div class="image-wrapper" data-type="image">
                    <img data-src="${imgUrl}" alt="${project.name_fr} - Image ${n}" class="gallery-image lazy-load" loading="lazy" decoding="async" />
                </div>
            `);
        });

        // Append any configured videos (after images)
        if (videoUrls.length > 0) {
            videoUrls.forEach((url, idx) => {
                const videoId = `video-${Date.now()}-${idx}`;
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
            });
        }

        const dots = Array.from({ length: slides.length }, (_, i) => `<span class=\"gallery-dot${i === 0 ? ' active' : ''}\" data-index=\"${i}\" aria-label=\"Slide ${i+1}\" role=\"button\" tabindex=\"0\"></span>`).join('');

        const galleryContent = `
            <div class="project-gallery">
                ${slides.join('')}
                <div class="project-overlay">
                    <h3 class="project-title" data-fr="${project.name_fr}" data-en="${project.name_en}">${project.name_fr}</h3>
                    <p class="project-subtitle" data-fr="${project.summary_fr}" data-en="${project.summary_en}">${project.summary_fr}</p>
                </div>
            </div>
            <div class="gallery-controls">
                <div class="gallery-dots">${dots}</div>
                <button class="gallery-zoom" aria-label="Open image in lightbox" title="Agrandir">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="m12 10h-2v-2h-1v2H7v1h2v2h1v-2h2z"/>
                    </svg>
                </button>
            </div>
        `;

        return `
            <div class="project-media">
                ${galleryContent}
            </div>
            <div class="project-content-zone">
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
            </div>
        `;
    }

    // Ensure slide changes work and UI syncs (including with videos)
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

    setupImageNavigation() {
        if (!this.projectCard) return;
        
        // Reset timer if exists
        if (this.imageTimer) clearInterval(this.imageTimer);
        this.currentImageIndex = 0;

        const wrappers = DOM.queryAll('.project-gallery .image-wrapper', this.projectCard);
        const dots = DOM.queryAll('.gallery-dot', this.projectCard);

        // Show only first wrapper
        wrappers.forEach((wrapper, i) => {
            wrapper.style.display = i === 0 ? 'block' : 'none';
        });

        // Dots navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'), 10);
                this.showSlide(index);
            });
        });

        // Zoom button
        const zoomBtn = DOM.query('.gallery-zoom', this.projectCard);
        if (zoomBtn) {
            zoomBtn.addEventListener('click', () => {
                const currentWrapper = wrappers[this.currentImageIndex];
                if (!currentWrapper || currentWrapper.getAttribute('data-type') !== 'image') return;

                const img = currentWrapper.querySelector('img');
                if (img) this.openLightbox(img.src, img.alt, this.currentImageIndex);
            });
        }

        // Swipe inside gallery (mobile)
        const gallery = DOM.query('.project-gallery', this.projectCard);
        if (gallery) {
            let startX = 0, startY = 0, tracking = false;
            const threshold = 40;
            gallery.addEventListener('touchstart', (e) => {
                const t = e.changedTouches[0];
                startX = t.clientX; startY = t.clientY; tracking = true;
            }, { passive: true });
            gallery.addEventListener('touchend', (e) => {
                if (!tracking) return;
                const t = e.changedTouches[0];
                const dx = t.clientX - startX; const dy = t.clientY - startY;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
                    const nextIndex = this.currentImageIndex + (dx < 0 ? 1 : -1);
                    if (nextIndex >= 0 && nextIndex < wrappers.length) this.showSlide(nextIndex);
                }
                tracking = false;
            }, { passive: true });
        }
    }

    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: just load all images
            DOM.queryAll('.gallery-image.lazy-load', this.projectCard).forEach(img => {
                if (img.dataset.src) img.src = img.dataset.src;
            });
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-load');
                    }
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '0px 0px 200px 0px', threshold: 0.01 });

        DOM.queryAll('.gallery-image.lazy-load', this.projectCard).forEach(img => observer.observe(img));
    }

    setupExpandableDescription() {
        // Event delegation in bindElements() handles expand/collapse functionality
        // This method is kept for future enhancements if needed
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
        const images = [];
        if (currentProject.image_main) {
            images.push({ src: currentProject.image_main, alt: `${currentProject.name_fr} - Image 1` });
        }
        const galleryImages = Array.isArray(currentProject.image_gallery)
            ? currentProject.image_gallery
            : [currentProject.image_gallery1, currentProject.image_gallery2].filter(Boolean);
        galleryImages.forEach((src, idx) => {
            images.push({ src, alt: `${currentProject.name_fr} - Image ${2 + idx}` });
        });
        
        let currentImageIndex = startIndex;

        // Create lightbox with navigation
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
            Object.assign(img.style, {
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain'
            });
            
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

        // Close handling
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
        setTimeout(() => lightbox.classList.add('active'), 10);
    }
}
