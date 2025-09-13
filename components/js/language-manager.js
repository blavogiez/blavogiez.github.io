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
            if (text) {
                // Use innerHTML for elements that contain HTML tags
                if (text.includes('<') && text.includes('>')) {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
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

