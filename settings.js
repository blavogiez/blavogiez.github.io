/**
 * Configuration du portfolio - settings.js
 * Converti depuis settings.ini pour éviter les problèmes CORS
 */

const SETTINGS_CONFIG = {
    Personal: {
        name: "En construction (dummy data)",
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
        title_fr: "Baptiste Lavogiez",
        title_en: "Baptiste Lavogiez",
        
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
        nav_about_fr: "Qui suis-je ?",
        nav_about_en: "About",
        nav_journey_fr: "Parcours", 
        nav_journey_en: "Experience",
        nav_projects_fr: "Réalisations",
        nav_projects_en: "Projects",
        nav_skills_fr: "Compétences",
        nav_skills_en: "Skills",
        nav_contact_fr: "Contact",
        nav_contact_en: "Contact",
        
        // Hero section
        hero_subtitle_fr: "",
        hero_subtitle_en: "full-stack developer",
        
        // About section
        about_title_fr: "Qui suis-je ?",
        about_title_en: "About me",
        about_description_fr: "<p>Étudiant passionné en BUT Informatique, je m’intéresse particulièrement à la conception, l’optimisation, l’automatisation et le déploiement d’applications. J’accorde aussi une grande importance à la communication, qu’il s’agisse d’échanges avec mon équipe ou de collaboration avec le client final.</p><p>Sur un plan plus personnel, je suis une personne simple et sociable, toujours tournée vers le positif. J’aime notamment la géographie, la natation et le football. Mes valeurs essentielles : gratitude, ponctualité et respect.</p><p>Découvrez ma vision de l’informatique à travers mes projets présentés sur cette page — peut-être suis-je même en train d’en développer un nouveau !</p><p><strong>Je suis également à la recherche d'un stage pour avril 2026 (durée de 10 semaines). Contactez-moi si vous pensez que nous pouvons avancer ensemble !</strong></p>",
about_description_en: "Passionate computer science student, I develop creative and technical projects! Always seeking learning and innovation!",
about_years_value: "5+",
        about_years_label_fr: "expérience",
        about_years_label_en: "Years of study", 
        about_projects_value: "5+",
        about_projects_label_fr: "Projets réalisés",
        about_projects_label_en: "Projects completed",
        
        // Journey section
        journey_title_fr: "Parcours",
        journey_title_en: "My Experience",

        // Activity subsection title
        journey_activity_title_fr: "Activité",
        journey_activity_title_en: "Activity",

        // Professional experience
        journey_work_title_fr: "Automatisation de processus",
        journey_work_title_en: "Process Automation",
        journey_work_company_fr: "Indépendant",
        journey_work_company_en: "Freelance",
        journey_work_period: "2022-2024",
        journey_work_desc_fr: "<ul><li>Réalisation de scripts d'automatisation d'actions redondantes sur mesure (conception, test, optimisation)</li><li>Adaptation dynamique au contexte avec image matching | OCR dans une base de données</li><li>Robustesse et protection contre les aléas de l'éxécution</li><li>Démonstration client, déploiement local et paramétrage selon les retours</li></ul>",
        journey_work_desc_en: "<ul><li>Custom automation script development for redundant actions (design, testing, optimization)</li><li>Dynamic context adaptation with image matching | OCR in database</li><li>Client demonstration, local deployment and configuration based on feedback</li></ul>",
        journey_work_skills: ["Python", "AHK", "OCR", "Automation", "Scripting"],

        // Formation subsection title
        journey_formation_title_fr: "Formation",
        journey_formation_title_en: "Education",

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
        journey_but_desc_fr: "<ul><li>Apprentissage avancé de langages de programmation (Java, SQL, C...)</li><li>Apprentissage théorique (statistiques, graphes, communication...)</li><li>Gestion de projet (méthodes agiles, analyse du besoin client)</li><li>Réalisation de projets pratiques professionnalisants (voir GitHub)</li><li>Conception et modélisation (Base de données, UML)</li></ul>",
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
        projects_title_fr: "Réalisations",
        projects_title_en: "My Projects",
        projects_view_code_fr: "Voir le code",
        projects_view_code_en: "View code",
        projects_more_info_fr: "Plus d'infos",
        projects_more_info_en: "More info",
        projects_less_info_fr: "Moins d'infos",
        projects_less_info_en: "Less info",
        
        // Philosophy section
        philosophy_title_fr: "Ma philosophie de développement",
        philosophy_title_en: "my development philosophy",
        philosophy_opt_title_fr: "Optimisation continue",
        philosophy_opt_title_en: "continuous optimization",
        philosophy_opt_desc_fr: "J'optimise constamment ma façon de développer et je m'ouvre à de nouvelles technologies ! aujourd'hui, j'intègre notamment les agents llm terminaux (claude code, gemini/qwen cli...) à mon cycle de développement afin d'être plus productif !",
        philosophy_opt_desc_en: "i continuously optimize my development process and embrace new technologies! today, i integrate terminal llm agents (claude code, gemini/qwen cli...) into my development cycle to be more productive!",
        philosophy_arch_title_fr: "Architecture solide",
        philosophy_arch_title_en: "solid architecture",
        philosophy_arch_desc_fr: "Je module beaucoup mes projets en réutilisant les principes solid et agile notamment. des projets bien organisés et compréhensibles de tous !",
        philosophy_arch_desc_en: "i modularize my projects extensively using solid and agile principles. well-organized projects that everyone can understand!",
        philosophy_user_title_fr: "Vision utilisateur",
        philosophy_user_title_en: "user vision",
        philosophy_user_quote_fr: "Un développeur ne doit pas se limiter à lui-même ; il doit incarner tous les utilisateurs à la fois",
        philosophy_user_quote_en: "a developer should not limit themselves; they must embody all users at once",
        philosophy_user_desc_fr: "cette phrase résume comment je vois la réalisation de projets informatiques ",
        philosophy_user_desc_en: "this phrase summarizes how i view software project development",
        
        // Skills section
        skills_title_fr: "Compétences",
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
        contact_download_cv_fr: "Télécharger mon CV",
        contact_download_cv_en: "Download my CV",
        
        // Footer
        footer_rights_fr: "Baptiste Lavogiez. Tous droits réservés.",
        footer_rights_en: "Baptiste Lavogiez. All rights reserved.",
        
        // Skills list for badges
        skills_list: [
            "Java", "Jakarta EE", "JavaFX", "AHK", "Python", "FastAPI", "PostgreSQL", "C", "Git", "VS Code", "Figma", "Linux"
        ]
    },
    Project1: {
        name_fr: "Noctern",
        name_en: "Portfolio Web App",
        summary_fr: "Éditeur LaTeX optimisé avec IA intégrée",
        summary_en: "Modern responsive portfolio website with CSS animations.",
        description_fr: "Mon plus grand projet personnel ! Un éditeur LaTeX (un langage de balisage et de composition de documents) complet from-scratch (pdf preview instantanée, insertion de tables, gestion d'images) et lié avec un LLM (Gemini API) pour accélérer le processus d'écriture (reformulation, relecture, génération formules). Il comporte bien plus ; regardez la démonstration et vous verrez. J'écris tous mes rapports en LaTeX, ainsi j'utilise constamment ce projet, permettant une amélioration continue.",
        description_en: "Complete development of a personal portfolio using HTML5, CSS3 and vanilla JavaScript. Features: multilingual system, smooth animations, responsive design optimized for all devices.",
        extended_description_fr: "Architecture technique avancée : Le projet utilise tkinter pour l'interface graphique native, avec un système de plugins modulaire permettant l'extension des fonctionnalités. L'intégration avec Gemini API se fait via requêtes asynchrones pour maintenir la fluidité de l'interface. Le système de prévisualisation PDF utilise une compilation LaTeX en temps réel avec gestion d'erreurs intelligente. Base de données SQLite pour la sauvegarde des projets et des préférences utilisateur. Système de templates personnalisables et raccourcis clavier configurables pour optimiser la productivité.",
        extended_description_en: "Advanced technical architecture: The project uses tkinter for native GUI, with a modular plugin system allowing functionality extension. Gemini API integration uses asynchronous requests to maintain interface fluidity. PDF preview system uses real-time LaTeX compilation with intelligent error handling. SQLite database for project and user preference storage. Customizable template system and configurable keyboard shortcuts to optimize productivity.",
        github: "https://github.com/blavogiez/Noctern",
        image_main: "assets/images/projects/project1/main.jpg",
        image_gallery1: "assets/images/projects/project1/gallery1.jpg",
        image_gallery2: "assets/images/projects/project1/gallery2.jpg",
        video_url: "assets/images/projects/project1/demo.mp4",
        tags: "Python"
    },
    Project2: {
        name_fr: "Infopoly",
        name_en: "Task Management API",
        summary_fr: "Jeu réalisé en équipe de 6 personnes, de façon agile",
        summary_en: "REST API for project management with JWT authentication.",
        description_fr: "Un projet réalisé à la rentrée de BUT2 ! Nous avions 20h (en 2 jours et demi) pour réaliser une application en Java avec pour objectif principal d'appliquer la méthodologie agile. Un monopoly sur le thème de l'IUT en reprenant les références récurrentes jouable à plusieurs. Une communication importante, un radiateur d'information, une répartition adéquate des tâches ; c'est ce qui fait la force de notre projet, plus que du code pur.",
        description_en: "Complete API developed in Python/Flask with PostgreSQL database. Secure authentication system, full CRUD for tasks, unit tests and Swagger documentation.",
        extended_description_fr: "Utilisation de Scrum avec sprints de 2h, stand-up meetings quotidiens et rétrospectives. Mise en place d'un board Kanban physique comme radiateur d'information. Architecture Java avec pattern MVC. Interface en terminal (Lanterna). Tests unitaires JUnit et intégration Maven pour la gestion des dépendances. Démonstration à environ 40 BUT1 à la fin du projet + explication de notre méthode de travail. Notre projet permettait surtout à ceux qui viennent de jouer avec leurs amis. Nous avons par exemple observé des parties avec 5 joueurs durer 30 minutes (la meilleure récompense possible pour nous) !",
        extended_description_en: "Applied agile methodology details: Scrum implementation with 4h sprints, daily stand-up meetings and retrospectives. Physical Kanban board setup as information radiator. Java architecture with MVC pattern, JavaFX GUI and embedded H2 database. Event handling with Observer design pattern for player-board interactions. JUnit unit testing and Maven integration for dependency management. Technical documentation generated with Javadoc.",
        github: "https://github.com/blavogiez/infopoly-projet-agile-java-Semestre3",
        image_main: "assets/images/projects/project2/main.jpg",
        image_gallery1: "assets/images/projects/project2/MenuAccueil.gif",
        image_gallery2: "assets/images/projects/project2/DebutPartie.gif",
        tags: "Java,Agile"
    },
    Project3: {
        name_fr: "Dashboard Analytique",
        name_en: "Analytics Dashboard",
        summary_fr: "Interface de visualisation de données temps réel avec React.",
        summary_en: "Real-time data visualization interface with React.",
        description_fr: "Application React complète avec Redux pour la gestion d'état, intégration d'APIs externes, graphiques interactifs avec Chart.js, et système de notifications en temps réel via WebSockets.",
        description_en: "Complete React application with Redux for state management, external API integration, interactive charts with Chart.js, and real-time notification system via WebSockets.",
        extended_description_fr: "Architecture React moderne avec hooks personnalisés pour la logique métier, Context API pour les données globales et Redux Toolkit pour la gestion d'état complexe. Intégration d'APIs REST avec Axios et gestion des erreurs centralisée. Graphiques dynamiques Chart.js avec animations personnalisées et export PDF/PNG. WebSockets pour les mises à jour temps réel avec reconnexion automatique. Tests avec React Testing Library et Jest. Build optimisé avec Webpack et déploiement CI/CD.",
        extended_description_en: "Modern React architecture with custom hooks for business logic, Context API for global data and Redux Toolkit for complex state management. REST API integration with Axios and centralized error handling. Dynamic Chart.js charts with custom animations and PDF/PNG export. WebSockets for real-time updates with automatic reconnection. Testing with React Testing Library and Jest. Optimized build with Webpack and CI/CD deployment.",
        github: "https://github.com/baptiste-lavogiez/analytics-dashboard",
        image_main: "assets/images/projects/project3/main.jpg",
        image_gallery1: "assets/images/projects/project3/gallery1.jpg",
        image_gallery2: "assets/images/projects/project3/gallery2.jpg",
        tags: "React,Redux,Chart.js"
    },
    Project4: {
        name_fr: "BuTeX",
        name_en: "E-commerce Mobile App",
        summary_fr: "template LaTeX adapté à l'IUT de Lille",
        summary_en: "Cross-platform mobile app with Flutter for online shopping.",
        description_fr: "Un petit projet personnel assez simple cette fois ; un template LaTeX que j'utilise pour écrire les rapports des projets à rendre à l'IUT. Il permet une écriture rapide et simplifiée d'un document répondant à des standards académiques précis, en incluant l'insertion de boîtes de code avec une coloration syntaxique différente selon le langage. Démonstration complète sur GitHub.",
        description_en: "Complete mobile application developed with Flutter, integrating secure payments, cart management, push notifications and offline sync. Modern interface with smooth animations.",
        extended_description_fr: "J'essaie au maximum d'avoir des couleurs et des formes psychologiquement satisfaisantes à la lecture. Le template insiste aussi sur des commandes simples qui s'éxécutent dans le .cls pour avoir aussi peu de debug que possible. (Fork (assez lointain maintenant) d'un thème de Centrale Lyon: https://fr.overleaf.com/latex/templates/rapport-centrale-lyon/rgbvxkxqvhtc)",
        extended_description_en: "Flutter architecture with BLoC pattern for state management, Firebase integration for authentication and real-time database. Secure payment system via Stripe API with server-side validation. Local SQLite cache for offline mode with automatic sync. Firebase Cloud Messaging push notifications with user segmentation. Advanced Flutter animations with Hero widgets and custom transitions. Automated integration testing and store deployment.",
        github: "https://github.com/blavogiez/BuTeX-ulille",
        image_main: "assets/images/projects/project4/main.jpg",
        image_gallery1: "assets/images/projects/project4/gallery1.jpg",
        image_gallery2: "assets/images/projects/project4/gallery2.jpg",
        tags: "Flutter,Dart,Firebase"
    },
    Project5: {
        name_fr: "Vayago",
        name_en: "Real-time Chat System",
        summary_fr: "Modélisation d'une base de données",
        summary_en: "Instant messaging platform with WebSockets and Redis.",
        description_fr: "...",
        description_en: "Modern chat system with real-time messages, private and public rooms, file sharing, custom emojis and desktop notifications. Scalable architecture with microservices.",
        extended_description_fr: "Architecture microservices Node.js avec Express et Socket.io pour la communication temps réel. Base de données MongoDB pour les messages et Redis pour les sessions. Système d'authentification JWT avec refresh tokens. Upload de fichiers sécurisé avec validation de type et stockage cloud S3. API RESTful documentée avec Swagger et tests automatisés Mocha/Chai. Load balancing avec NGINX et déploiement Docker containerisé. Monitoring avec Prometheus et logs structurés.",
        extended_description_en: "Node.js microservices architecture with Express and Socket.io for real-time communication. MongoDB database for messages and Redis for sessions. JWT authentication system with refresh tokens. Secure file upload with type validation and S3 cloud storage. RESTful API documented with Swagger and automated Mocha/Chai testing. NGINX load balancing and containerized Docker deployment. Prometheus monitoring and structured logging.",
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
        extended_description_fr: "Architecture de deep learning avancée avec réseaux de neurones convolutionnels multicouches, data augmentation automatique et transfer learning depuis des modèles pré-entraînés. Pipeline de preprocessing optimisé avec normalisation des images et gestion des déséquilibres de classes. Interface web React avec drag-and-drop pour les tests en temps réel. API Flask RESTful avec authentification et limitation de taux. Déploiement cloud avec GPU Tesla pour l'inférence haute performance. MLOps avec versioning des modèles et monitoring des performances.",
        extended_description_en: "Advanced deep learning architecture with multi-layer convolutional neural networks, automatic data augmentation and transfer learning from pre-trained models. Optimized preprocessing pipeline with image normalization and class imbalance handling. React web interface with drag-and-drop for real-time testing. Flask RESTful API with authentication and rate limiting. Cloud deployment with Tesla GPU for high-performance inference. MLOps with model versioning and performance monitoring.",
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
        extended_description_fr: "Architecture cloud-native avec microservices Kubernetes pour la scalabilité. Transcoding automatique FFmpeg avec plusieurs résolutions (4K, 1080p, 720p) et encodage adaptatif HLS/DASH. CDN global avec mise en cache intelligente et géo-distribution. Système de recommandations basé sur l'IA avec analyse comportementale et collaborative filtering. Backend Python/Django avec PostgreSQL et Redis. Interface React responsive avec player vidéo personnalisé. Analytics temps réel avec Elasticsearch et Kibana. Sécurité DRM et contrôle d'accès granulaire.",
        extended_description_en: "Cloud-native architecture with Kubernetes microservices for scalability. Automatic FFmpeg transcoding with multiple resolutions (4K, 1080p, 720p) and adaptive HLS/DASH encoding. Global CDN with intelligent caching and geo-distribution. AI-based recommendation system with behavioral analysis and collaborative filtering. Python/Django backend with PostgreSQL and Redis. React responsive interface with custom video player. Real-time analytics with Elasticsearch and Kibana. DRM security and granular access control.",
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
        extended_description_fr: "Implémentation complète en Go d'un protocole blockchain avec algorithme de consensus Proof-of-Work et ajustement automatique de la difficulté. Réseau P2P décentralisé avec découverte de nœuds et synchronisation de chaîne. Wallet HD (Hierarchical Deterministic) avec génération de clés sécurisée et signatures ECDSA. Pool de transactions avec validation et frais dynamiques. Interface CLI et API REST pour les interactions. Tests unitaires exhaustifs et simulation de réseau. Étude des vulnérabilités et mécanismes de sécurité.",
        extended_description_en: "Complete Go implementation of blockchain protocol with Proof-of-Work consensus algorithm and automatic difficulty adjustment. Decentralized P2P network with node discovery and chain synchronization. HD (Hierarchical Deterministic) wallet with secure key generation and ECDSA signatures. Transaction pool with validation and dynamic fees. CLI interface and REST API for interactions. Exhaustive unit testing and network simulation. Vulnerability study and security mechanisms.",
        github: "https://github.com/baptiste-lavogiez/blockchain-crypto",
        image_main: "assets/images/projects/project8/main.jpg",
        image_gallery1: "assets/images/projects/project8/gallery1.jpg",
        image_gallery2: "assets/images/projects/project8/gallery2.jpg",
        tags: "Go,Cryptography,P2P"
    }
};

// Make it globally accessible
window.SETTINGS_CONFIG = SETTINGS_CONFIG;