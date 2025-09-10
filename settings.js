/**
 * Configuration du portfolio - settings.js
 * Converti depuis settings.ini pour éviter les problèmes CORS
 */

const SETTINGS_CONFIG = {
    Personal: {
        name: "Baptiste Lavogiez",
        title_fr: "Étudiant en 2ème année - Développeur passionné",
        title_en: "2nd Year Student - Passionate Developer",
        email: "baptiste.lavogiez@proton.me",
        linkedin: "https://www.linkedin.com/in/baptiste-lavogiez-5747182b9/",
        github: "https://github.com/blavogiez",
        photo: "photo.jpg"
    },
    Site: {
        year: "2025",
        logo_text_fr: "Portfolio",
        logo_text_en: "Portfolio"
    },
    About: {
        description_fr: "L'informatique existe pour aider l'",
        description_en: "Passionate computer science student, I develop creative and technical projects. Always seeking learning and innovation.",
        years_study: "2+",
        projects_completed: "5+"
    },
    QuickIntro: {
        trait1_fr: "Passionné de code",
        trait1_en: "Code enthusiast",
        trait2_fr: "Apprend vite",
        trait2_en: "Fast learner",
        trait3_fr: "Aime les défis",
        trait3_en: "Loves challenges",
        trait4_fr: "Design & UX",
        trait4_en: "Design & UX",
        trait5_fr: "Esprit d'équipe",
        trait5_en: "Team player",
        trait6_fr: "Créatif",
        trait6_en: "Creative"
    },
    UI: {
        // Page title
        title_fr: "Baptiste Lavogiez - Portfolio Développeur Full-Stack",
        title_en: "Baptiste Lavogiez - Full-Stack Developer Portfolio",
        
        // Meta tags
        meta_description_fr: "Baptiste Lavogiez - Développeur Full-Stack passionné, étudiant en 2ème année. Portfolio moderne avec projets créatifs et solutions digitales innovantes.",
        meta_description_en: "Baptiste Lavogiez - Passionate Full-Stack Developer, 2nd year student. Modern portfolio with creative projects and innovative digital solutions.",
        meta_keywords_fr: "Baptiste Lavogiez, développeur, full-stack, portfolio, web, javascript, python, react",
        meta_keywords_en: "Baptiste Lavogiez, developer, full-stack, portfolio, web, javascript, python, react",
        og_title_fr: "Baptiste Lavogiez - Développeur Full-Stack",
        og_title_en: "Baptiste Lavogiez - Full-Stack Developer",
        og_description_fr: "Développeur Full-Stack qui transforme des idées en solutions digitales innovantes",
        og_description_en: "Full-Stack Developer who transforms ideas into innovative digital solutions",
        
        // Logo and image alts
        logo_text: "Baptiste Lavogiez",
        profile_image_alt_fr: "Baptiste Lavogiez - Photo de profil",
        profile_image_alt_en: "Baptiste Lavogiez - Profile photo",
        
        // Navigation
        nav_about_fr: "À propos",
        nav_about_en: "About",
        nav_journey_fr: "Parcours", 
        nav_journey_en: "Journey",
        nav_projects_fr: "Projets",
        nav_projects_en: "Projects",
        nav_skills_fr: "Compétences",
        nav_skills_en: "Skills",
        nav_contact_fr: "Contact",
        nav_contact_en: "Contact",
        
        // Hero section
        hero_subtitle_fr: "développeur full-stack",
        hero_subtitle_en: "full-stack developer",
        
        // About section
        about_title_fr: "À propos de moi",
        about_title_en: "About me",
        about_description_fr: "Plus personnellement, je suis quelqu'un de simple qui essaie de voir de la positivité partout. Gratitude, positivité et respect sont mes valeurs.",
        about_description_en: "Passionate computer science student, I develop creative and technical projects! Always seeking learning and innovation!",
        about_years_value: "5+",
        about_years_label_fr: "expérience",
        about_years_label_en: "Years of study", 
        about_projects_value: "5+",
        about_projects_label_fr: "Projets réalisés",
        about_projects_label_en: "Projects completed",
        
        // Journey section
        journey_title_fr: "Mon Parcours",
        journey_title_en: "My Journey",
        journey_bac_title_fr: "Baccalauréat Scientifique - Lycée Marguerite de Flandres",
        journey_bac_title_en: "Scientific Baccalaureate",
        journey_bac_grade_fr: "Mention Très Bien",
        journey_bac_grade_en: "Highest Honors",
        journey_bac_desc_fr: "+ Option mathématiques expertes",
        journey_bac_desc_en: "Specialties: Computer Science, Mathematics, Physics-Chemistry",
        journey_but_title_fr: "BUT Informatique - 2ème année - Villeneuve d'Ascq",
        journey_but_title_en: "Computer Science BUT - 2nd year",
        journey_but_institution_fr: "",
        journey_but_institution_en: "Work-study program",
        journey_but_desc_fr: "Développement logiciel, bases de données, réseaux, gestion de projet, méthodes agiles !",
        journey_but_desc_en: "Software development, databases, networks, project management, agile methods!",
        journey_engineer_title_fr: "École d'Ingénieur ?",
        journey_engineer_title_en: "Engineering School",
        journey_engineer_institution_fr: "Objectif : intégration directe post-BUT2 + alternance",
        journey_engineer_institution_en: "Goal: direct admission after BUT2",
        journey_engineer_desc_fr: "Je donne tout mon possible pour être dans le top du BUT afin d'intégrer une école d'ingénieur dès la fin de cette année.",
        journey_engineer_desc_en: "Skip preparatory classes by directly entering engineering school after 2nd year! Otherwise, 3rd year BUT and let's go!",
        
        // Journey skills
        journey_skills: ["Java", "C", "SQL", "Web", "Linux"],
        
        // Projects section
        projects_title_fr: "Mes Projets",
        projects_title_en: "My Projects",
        projects_view_code_fr: "Voir le code",
        projects_view_code_en: "View code",
        
        // Philosophy section
        philosophy_title_fr: "ma philosophie de développement",
        philosophy_title_en: "my development philosophy",
        philosophy_opt_title_fr: "optimisation continue",
        philosophy_opt_title_en: "continuous optimization",
        philosophy_opt_desc_fr: "j'optimise constamment ma façon de développer et je m'ouvre à de nouvelles technologies ! aujourd'hui, j'intègre notamment les agents llm terminaux (claude code, gemini/qwen cli...) à mon cycle de développement afin d'être plus productif !",
        philosophy_opt_desc_en: "i continuously optimize my development process and embrace new technologies! today, i integrate terminal llm agents (claude code, gemini/qwen cli...) into my development cycle to be more productive!",
        philosophy_arch_title_fr: "architecture solide",
        philosophy_arch_title_en: "solid architecture",
        philosophy_arch_desc_fr: "je module beaucoup mes projets en réutilisant les principes solid et agile notamment. des projets bien organisés et compréhensibles de tous !",
        philosophy_arch_desc_en: "i modularize my projects extensively using solid and agile principles. well-organized projects that everyone can understand!",
        philosophy_user_title_fr: "vision utilisateur",
        philosophy_user_title_en: "user vision",
        philosophy_user_quote_fr: "un développeur ne doit pas se limiter à lui-même ; il doit incarner tous les utilisateurs à la fois",
        philosophy_user_quote_en: "a developer should not limit themselves; they must embody all users at once",
        philosophy_user_desc_fr: "cette phrase résume comment je vois la réalisation de projets informatiques ",
        philosophy_user_desc_en: "this phrase summarizes how i view software project development",
        
        // Skills section
        skills_title_fr: "Mes Compétences",
        skills_title_en: "My Skills",
        skills_intro_fr: "Technologies que je maîtrise pour créer des solutions complètes !",
        skills_intro_en: "Technologies I master to create complete digital solutions!",
        skills_special_fr: "Néanmoins deux compétences sont abstraites mais les plus importantes : la communication et l'adaptation à un groupe, à un projet, à une technologie.",
        skills_special_en: "toto",
        
        // Contact section
        contact_title_fr: "Contactez moi",
        contact_title_en: "Contact me",
        contact_intro_fr: "Disponible en région lilloise et alentours (véhiculé)",
        contact_intro_en: "Interested in collaboration? Feel free to contact me!",
        
        // Footer
        footer_rights_fr: "Baptiste Lavogiez. Tous droits réservés.",
        footer_rights_en: "Baptiste Lavogiez. All rights reserved.",
        
        // Skills list for badges
        skills_list: [
            "Java", "AHK", "Python", "FastAPI", "PostgreSQL", "C", "Git", "VS Code", "Figma", "Linux"
        ]
    },
    Project1: {
        name_fr: "Fuchsia",
        name_en: "Portfolio Web App",
        summary_fr: "Éditeur LaTeX optimisé avec IA intégrée",
        summary_en: "Modern responsive portfolio website with CSS animations.",
        description_fr: "Mon plus grand projet personnel ! Un éditeur LaTeX (un langage de balisage et de composition de documents) complet from-scratch (pdf preview instantanée, insertion de tables, gestion d'images) et lié avec un LLM (Gemini API) pour accélérer le processus d'écriture (reformulation, relecture, génération formules). Il comporte bien plus ; regardez la démonstration et vous verrez. J'écris tous mes rapports en LaTeX, ainsi j'utilise constamment ce projet, permettant une amélioration continue.",
        description_en: "Complete development of a personal portfolio using HTML5, CSS3 and vanilla JavaScript. Features: multilingual system, smooth animations, responsive design optimized for all devices.",
        github: "https://github.com/baptiste-lavogiez/portfolio",
        image_main: "assets/images/projects/project1/main.jpg",
        image_gallery1: "assets/images/projects/project1/gallery1.jpg",
        image_gallery2: "assets/images/projects/project1/gallery2.jpg",
        tags: "Python"
    },
    Project2: {
        name_fr: "Infopoly",
        name_en: "Task Management API",
        summary_fr: "Jeu réalisé en équipe de 6 personnes, de façon agile",
        summary_en: "REST API for project management with JWT authentication.",
        description_fr: "Un projet réalisé à la rentrée de BUT2 ! Nous avions 20h (en 2 jours et demi) pour réaliser une application en Java avec pour objectif principal d'appliquer la méthodologie agile. Une communication importante, un radiateur d'information, une répartition adéquate des tâches ; c'est ce qui fait la force de notre projet, plus que du code pur.",
        description_en: "Complete API developed in Python/Flask with PostgreSQL database. Secure authentication system, full CRUD for tasks, unit tests and Swagger documentation.",
        github: "https://github.com/baptiste-lavogiez/task-api",
        image_main: "assets/images/projects/project2/main.jpg",
        image_gallery1: "assets/images/projects/project2/gallery1.jpg",
        image_gallery2: "assets/images/projects/project2/gallery2.jpg",
        tags: "Python,Flask,PostgreSQL"
    },
    Project3: {
        name_fr: "Dashboard Analytique",
        name_en: "Analytics Dashboard",
        summary_fr: "Interface de visualisation de données temps réel avec React.",
        summary_en: "Real-time data visualization interface with React.",
        description_fr: "Application React complète avec Redux pour la gestion d'état, intégration d'APIs externes, graphiques interactifs avec Chart.js, et système de notifications en temps réel via WebSockets.",
        description_en: "Complete React application with Redux for state management, external API integration, interactive charts with Chart.js, and real-time notification system via WebSockets.",
        github: "https://github.com/baptiste-lavogiez/analytics-dashboard",
        image_main: "assets/images/projects/project3/main.jpg",
        image_gallery1: "assets/images/projects/project3/gallery1.jpg",
        image_gallery2: "assets/images/projects/project3/gallery2.jpg",
        tags: "React,Redux,Chart.js"
    },
    Project4: {
        name_fr: "Application Mobile E-commerce",
        name_en: "E-commerce Mobile App",
        summary_fr: "App mobile cross-platform avec Flutter pour le shopping en ligne.",
        summary_en: "Cross-platform mobile app with Flutter for online shopping.",
        description_fr: "Application mobile complète développée avec Flutter, intégrant paiements sécurisés, gestion du panier, notifications push et synchronisation offline. Interface moderne avec animations fluides.",
        description_en: "Complete mobile application developed with Flutter, integrating secure payments, cart management, push notifications and offline sync. Modern interface with smooth animations.",
        github: "https://github.com/baptiste-lavogiez/ecommerce-app",
        image_main: "assets/images/projects/project4/main.jpg",
        image_gallery1: "assets/images/projects/project4/gallery1.jpg",
        image_gallery2: "assets/images/projects/project4/gallery2.jpg",
        tags: "Flutter,Dart,Firebase"
    },
    Project5: {
        name_fr: "Système de Chat en Temps Réel",
        name_en: "Real-time Chat System",
        summary_fr: "Plateforme de messagerie instantanée avec WebSockets et Redis.",
        summary_en: "Instant messaging platform with WebSockets and Redis.",
        description_fr: "Système de chat moderne avec messages en temps réel, salles privées et publiques, partage de fichiers, émojis personnalisés et notifications desktop. Architecture scalable avec microservices.",
        description_en: "Modern chat system with real-time messages, private and public rooms, file sharing, custom emojis and desktop notifications. Scalable architecture with microservices.",
        github: "https://github.com/baptiste-lavogiez/chat-system",
        image_main: "assets/images/projects/project5/main.jpg",
        image_gallery1: "assets/images/projects/project5/gallery1.jpg",
        image_gallery2: "assets/images/projects/project5/gallery2.jpg",
        tags: "Node.js,WebSocket,Redis"
    },
    Project6: {
        name_fr: "Intelligence Artificielle pour Images",
        name_en: "AI Image Recognition",
        summary_fr: "Modèle de deep learning pour classification et détection d'objets.",
        summary_en: "Deep learning model for classification and object detection.",
        description_fr: "Développement d'un modèle CNN avec TensorFlow pour la reconnaissance d'images. Précision de 94% sur le dataset CIFAR-10, interface web pour tests en temps réel et API REST pour intégration.",
        description_en: "Development of a CNN model with TensorFlow for image recognition. 94% accuracy on CIFAR-10 dataset, web interface for real-time testing and REST API for integration.",
        github: "https://github.com/baptiste-lavogiez/ai-image-recognition",
        image_main: "assets/images/projects/project6/main.jpg",
        image_gallery1: "assets/images/projects/project6/gallery1.jpg",
        image_gallery2: "assets/images/projects/project6/gallery2.jpg",
        tags: "Python,TensorFlow,AI"
    },
    Project7: {
        name_fr: "Plateforme de Streaming Vidéo",
        name_en: "Video Streaming Platform",
        summary_fr: "Netflix-like avec transcoding automatique et CDN optimisé.",
        summary_en: "Netflix-like platform with automatic transcoding and optimized CDN.",
        description_fr: "Plateforme complète de streaming vidéo avec upload, transcoding automatique multi-résolutions, système d'abonnements, recommandations personnalisées et analytics détaillées.",
        description_en: "Complete video streaming platform with upload, automatic multi-resolution transcoding, subscription system, personalized recommendations and detailed analytics.",
        github: "https://github.com/baptiste-lavogiez/streaming-platform",
        image_main: "assets/images/projects/project7/main.jpg",
        image_gallery1: "assets/images/projects/project7/gallery1.jpg",
        image_gallery2: "assets/images/projects/project7/gallery2.jpg",
        tags: "Vue.js,FFmpeg,AWS"
    },
    Project8: {
        name_fr: "Blockchain et Cryptomonnaies",
        name_en: "Blockchain & Cryptocurrency",
        summary_fr: "Implémentation complète d'une blockchain avec mining et wallet.",
        summary_en: "Complete blockchain implementation with mining and wallet.",
        description_fr: "Développement from scratch d'une blockchain fonctionnelle avec proof-of-work, wallet sécurisé, transactions peer-to-peer et interface de mining. Étude approfondie des cryptomonnaies.",
        description_en: "From-scratch development of a functional blockchain with proof-of-work, secure wallet, peer-to-peer transactions and mining interface. In-depth study of cryptocurrencies.",
        github: "https://github.com/baptiste-lavogiez/blockchain-crypto",
        image_main: "assets/images/projects/project8/main.jpg",
        image_gallery1: "assets/images/projects/project8/gallery1.jpg",
        image_gallery2: "assets/images/projects/project8/gallery2.jpg",
        tags: "Go,Cryptography,P2P"
    }
};

// Make it globally accessible
window.SETTINGS_CONFIG = SETTINGS_CONFIG;