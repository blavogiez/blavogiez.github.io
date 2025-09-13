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

