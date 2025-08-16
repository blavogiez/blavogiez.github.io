# Portfolio - Baptiste Lavogiez

**Portfolio moderne et responsive d'un développeur Full-Stack**

## 🚀 Aperçu

Portfolio personnel ultra-moderne avec navigation intuitive, animations fluides et design responsive. Construit avec les technologies web natives pour des performances optimales.

## ✨ Fonctionnalités

- **Design moderne** avec animations CSS3 avancées
- **Navigation simplifiée** par flèches pour les projets
- **Galerie d'images** avec rotation automatique
- **Support multilingue** (Français/Anglais)
- **Icônes technologiques** visuelles et colorées
- **100% responsive** pour tous les appareils
- **Performance optimisée** avec lazy loading

## 🛠 Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec variables CSS
- **JavaScript ES6+** - Architecture modulaire SOLID
- **Intersection Observer** - Animations performantes
- **Local Storage** - Persistance des préférences

## 📁 Structure

```
portfolio/
├── index.html          # Page principale
├── main.css            # Styles optimisés
├── portfolio.js        # JavaScript modulaire
├── settings.ini        # Configuration des projets
├── photo.jpg          # Photo de profil
└── README.md          # Documentation
```

## 🎯 Architecture

### JavaScript Modulaire (SOLID)
- **LoadingScreen** - Gestion de l'écran de chargement
- **LanguageManager** - Système multilingue
- **ProjectNavigator** - Navigation entre projets
- **AnimationManager** - Gestion des animations
- **ConfigLoader** - Chargement de la configuration
- **TechIcons** - Génération des icônes technologiques

### CSS Optimisé
- Variables CSS pour cohérence
- Animations GPU-accelerated
- Design system complet
- Mobile-first responsive

## ⚙️ Configuration

Le fichier `settings.ini` permet de configurer facilement :
- Informations personnelles
- Liste des projets (jusqu'à 8)
- Descriptions multilingues
- Liens GitHub et réseaux sociaux

### Exemple de projet dans settings.ini :
```ini
[Project1]
name_fr = Application Web Portfolio
name_en = Portfolio Web App
summary_fr = Site portfolio moderne et responsive
summary_en = Modern responsive portfolio website
description_fr = Développement complet d'un portfolio...
description_en = Complete development of a portfolio...
github = https://github.com/username/project
image_main = https://example.com/image1.jpg
image_gallery1 = https://example.com/image2.jpg
image_gallery2 = https://example.com/image3.jpg
tags = HTML/CSS,JavaScript,React
```

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/username/portfolio.git
   cd portfolio
   ```

2. **Personnaliser la configuration**
   - Modifier `settings.ini` avec vos informations
   - Remplacer `photo.jpg` par votre photo
   - Ajuster les liens dans `index.html`

3. **Lancer le site**
   ```bash
   # Serveur local simple
   python -m http.server 8000
   # ou
   npx http-server
   ```

## 📱 Navigation

- **Flèches gauche/droite** : Navigation entre projets
- **Clavier** : ← → pour naviguer
- **Points de navigation** : Changement d'images dans la galerie
- **Rotation automatique** : Images changent toutes les 5 secondes

## 🎨 Personnalisation

### Couleurs (main.css)
```css
:root {
    --primary: #1e40af;        /* Bleu principal */
    --accent: #f97316;         /* Orange accent */
    --royal-blue: #4169e1;     /* Bleu royal */
}
```

### Icônes technologiques (portfolio.js)
```javascript
// Ajouter une nouvelle technologie
TechIcons.MAP['NouveleTech'] = { 
    icon: '🔥', 
    class: 'nouvelle-tech' 
};
```

## 🌐 Déploiement

### GitHub Pages
1. Push vers GitHub
2. Activer GitHub Pages dans Settings
3. Sélectionner la branche main

### Netlify
1. Connecter le repository
2. Deploy automatique sur push

### Vercel
```bash
npx vercel --prod
```

## 📊 Performance

- **Lighthouse Score** : 95+ sur tous les critères
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

## 🔧 Développement

### Structure modulaire
Chaque classe a une responsabilité unique (Single Responsibility Principle) :
- Configuration séparée de la logique
- Gestion d'erreurs robuste
- Code réutilisable et maintenable

### Best Practices
- ES6+ moderne
- Async/await pour les requêtes
- Event delegation optimisée
- Lazy loading des images
- Debouncing des événements

## 📄 Licence

MIT License - Libre d'utilisation et modification

## 👤 Auteur

**Baptiste Lavogiez**
- Portfolio : [baptiste-lavogiez.com](https://baptiste-lavogiez.com)
- GitHub : [@baptiste-lavogiez](https://github.com/baptiste-lavogiez)
- LinkedIn : [Baptiste Lavogiez](https://linkedin.com/in/baptiste-lavogiez)

---

*Portfolio réalisé avec ❤️ et beaucoup de ☕*