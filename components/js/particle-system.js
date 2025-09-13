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

