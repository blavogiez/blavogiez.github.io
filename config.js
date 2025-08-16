class ConfigManager {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    async loadConfig() {
        try {
            const response = await fetch('settings.ini');
            const text = await response.text();
            this.parseIni(text);
            this.applyConfig();
        } catch (error) {
            console.error('Erreur lors du chargement de la configuration:', error);
        }
    }

    parseIni(text) {
        const lines = text.split('\n');
        let currentSection = '';
        
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('[') && line.endsWith(']')) {
                currentSection = line.slice(1, -1);
                this.config[currentSection] = {};
            } else if (line.includes('=') && currentSection) {
                const [key, ...valueParts] = line.split('=');
                const value = valueParts.join('=').trim();
                this.config[currentSection][key.trim()] = value;
            }
        });
    }

    applyConfig() {
        this.applyPersonalInfo();
        this.applyAboutSection();
        this.applyQuickIntro();
        this.applyProjects();
        this.applySiteInfo();
    }

    applyPersonalInfo() {
        const personal = this.config.Personal;
        if (!personal) return;

        document.querySelectorAll('.name').forEach(el => {
            el.textContent = personal.name;
        });

        if (personal.photo) {
            const profileImg = document.querySelector('.profile-photo img');
            if (profileImg) profileImg.src = personal.photo;
        }

        if (personal.email) {
            document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
                el.href = `mailto:${personal.email}`;
                el.textContent = personal.email;
            });
        }

        if (personal.linkedin) {
            document.querySelectorAll('a[href*="linkedin"]').forEach(el => {
                el.href = personal.linkedin;
            });
        }

        if (personal.github) {
            document.querySelectorAll('a[href*="github"]').forEach(el => {
                el.href = personal.github;
            });
        }
    }

    applyAboutSection() {
        const about = this.config.About;
        if (!about) return;

        const aboutText = document.querySelector('.about-text p');
        if (aboutText) {
            aboutText.setAttribute('data-fr', about.description_fr);
            aboutText.setAttribute('data-en', about.description_en);
        }

        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers[0]) statNumbers[0].textContent = about.years_study;
        if (statNumbers[1]) statNumbers[1].textContent = about.projects_completed;
    }

    applyQuickIntro() {
        const quick = this.config.QuickIntro;
        if (!quick) return;

        const quickItems = document.querySelectorAll('.quick-item .quick-text');
        const traits = [
            { fr: quick.trait1_fr, en: quick.trait1_en },
            { fr: quick.trait2_fr, en: quick.trait2_en },
            { fr: quick.trait3_fr, en: quick.trait3_en },
            { fr: quick.trait4_fr, en: quick.trait4_en },
            { fr: quick.trait5_fr, en: quick.trait5_en },
            { fr: quick.trait6_fr, en: quick.trait6_en }
        ];

        quickItems.forEach((item, index) => {
            if (traits[index]) {
                item.setAttribute('data-fr', traits[index].fr);
                item.setAttribute('data-en', traits[index].en);
            }
        });
    }

    applyProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        for (let i = 1; i <= 3; i++) {
            const project = this.config[`Project${i}`];
            if (!project || !projectCards[i-1]) continue;

            const card = projectCards[i-1];
            
            const title = card.querySelector('h3');
            if (title) {
                title.setAttribute('data-fr', project.name_fr);
                title.setAttribute('data-en', project.name_en);
                title.textContent = project.name_fr;
            }

            const summary = card.querySelector('.project-summary');
            if (summary) {
                summary.setAttribute('data-fr', project.summary_fr);
                summary.setAttribute('data-en', project.summary_en);
                summary.textContent = project.summary_fr;
            }

            const description = card.querySelector('.project-details p');
            if (description) {
                description.setAttribute('data-fr', project.description_fr);
                description.setAttribute('data-en', project.description_en);
                description.textContent = project.description_fr;
            }

            const mainImg = card.querySelector('.project-image img');
            if (mainImg && project.image_main) {
                mainImg.src = project.image_main;
            }

            const galleryImgs = card.querySelectorAll('.gallery-img');
            if (galleryImgs[0] && project.image_gallery1) {
                galleryImgs[0].src = project.image_gallery1;
            }
            if (galleryImgs[1] && project.image_gallery2) {
                galleryImgs[1].src = project.image_gallery2;
            }

            const gitLink = card.querySelector('.git-link');
            if (gitLink && project.github) {
                gitLink.href = project.github;
            }

            const tagsContainer = card.querySelector('.project-tags');
            if (tagsContainer && project.tags) {
                tagsContainer.innerHTML = '';
                project.tags.split(',').forEach(tag => {
                    const tagEl = document.createElement('span');
                    tagEl.className = 'tag';
                    tagEl.textContent = tag.trim();
                    tagsContainer.appendChild(tagEl);
                });
            }
        }
    }

    applySiteInfo() {
        const site = this.config.Site;
        if (!site) return;

        const year = document.querySelector('footer p');
        if (year && site.year) {
            year.innerHTML = year.innerHTML.replace(/\d{4}/, site.year);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ConfigManager();
});