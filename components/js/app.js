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

