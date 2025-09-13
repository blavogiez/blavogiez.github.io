// ===== CONFIG LOADER =====
class ConfigLoader {
    constructor() {
        this.config = {};
        this.projectNavigator = new ProjectNavigator();
        this.load();
    }

    load() {
        console.log('🔎 Starting config load...');
        console.log('❓ SETTINGS_CONFIG exists:', typeof SETTINGS_CONFIG !== 'undefined');
        console.log('❓ SETTINGS_CONFIG value:', window.SETTINGS_CONFIG);
        
        // Utiliser directement la config depuis settings.js
        if (typeof SETTINGS_CONFIG !== 'undefined' && SETTINGS_CONFIG) {
            this.config = SETTINGS_CONFIG;
            console.log('✅ Settings loaded from settings.js');
            console.log('🧩 UI keys available:', Object.keys(this.config.UI || {}));
            console.log('🧩 Full config:', this.config);
        } else {
            console.error('⛔ SETTINGS_CONFIG not found or empty! Cannot load content.');
            console.error('⛔ Make sure settings.js is loaded before portfolio.js');
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

        // Description and stats are applied via UI section
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
            console.error('⛔ No UI config found');
            return;
        }
        console.log('🛠️ Applying UI config...');

        // Apply title
        const titleEl = DOM.query('[data-ui="title"]');
        if (titleEl && ui.title_fr && ui.title_en) {
            titleEl.setAttribute('data-fr', ui.title_fr);
            titleEl.setAttribute('data-en', ui.title_en);
            const currentLang = document.documentElement.lang || 'fr';
            titleEl.textContent = currentLang === 'en' ? ui.title_en : ui.title_fr;
            document.title = titleEl.textContent; // also update document title
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
                        const content = currentLang === 'en' ? ui[enKey] : ui[key];

                        // Use innerHTML for elements that contain HTML tags
                        if (content.includes('<') && content.includes('>')) {
                            el.innerHTML = content;
                        } else {
                            el.textContent = content;
                        }
                    });
                }
            }
        });

        // Apply non-text values (like stats values and logo)
        ['about_years_value', 'about_projects_value', 'logo_text'].forEach(key => {
            if (ui[key]) {
                const elements = DOM.queryAll(`[data-ui="${key}"]`);
                console.log(`🧪 Setting ${key}: found ${elements.length} element(s)`);
                elements.forEach(el => {
                    el.textContent = ui[key];
                });
            }
        });

        // Journey skills tags
        this.generateJourneySkills();

        // Skills badges
        this.generateSkillsBadges();
        
        // Meta tags
        this.applyMetaTags();
        
        // Image alt
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
        
        const metaDesc = DOM.query('meta[name="description"]');
        if (metaDesc && ui.meta_description_fr && ui.meta_description_en) {
            metaDesc.content = currentLang === 'en' ? ui.meta_description_en : ui.meta_description_fr;
        }
        
        const metaKeywords = DOM.query('meta[name="keywords"]');
        if (metaKeywords && ui.meta_keywords_fr && ui.meta_keywords_en) {
            metaKeywords.content = currentLang === 'en' ? ui.meta_keywords_en : ui.meta_keywords_fr;
        }
        
        const metaAuthor = DOM.query('meta[name="author"]');
        if (metaAuthor && ui.logo_text) {
            metaAuthor.content = ui.logo_text;
        }
        
        const ogTitle = DOM.query('meta[property="og:title"]');
        if (ogTitle && ui.og_title_fr && ui.og_title_en) {
            ogTitle.content = currentLang === 'en' ? ui.og_title_en : ui.og_title_fr;
        }
        
        const ogDesc = DOM.query('meta[property="og:description"]');
        if (ogDesc && ui.og_description_fr && ui.og_description_en) {
            ogDesc.content = currentLang === 'en' ? ui.og_description_en : ui.og_description_fr;
        }
        
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

    getDefaultProject() {
        return {
            name_fr: 'Portfolio Web',
            name_en: 'Web Portfolio',
            summary_fr: 'Site portfolio moderne et responsive',
            summary_en: 'Modern responsive portfolio website',
            description_fr: "Développement complet d'un portfolio avec HTML, CSS et JavaScript",
            description_en: 'Complete portfolio development with HTML, CSS and JavaScript',
            github: 'https://github.com/baptiste-lavogiez/portfolio',
            image_main: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
            image_gallery1: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop',
            image_gallery2: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
            tags: 'HTML/CSS,JavaScript,Responsive'
        };
    }
}

