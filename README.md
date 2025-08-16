# Portfolio Étudiant

Portfolio moderne et responsive pour étudiant en 2ème année.

## Fonctionnalités

- **Design moderne** : Interface propre et professionnelle
- **Responsive** : Compatible mobile, tablette et desktop
- **Multilingue** : Français/Anglais avec détection automatique
- **Animations** : Transitions fluides et effets visuels subtils
- **Une seule page** : Navigation simple et efficace

## Structure

```
├── index.html      # Structure HTML principale
├── style.css       # Styles CSS avec animations
├── script.js       # Logique JavaScript (langues, animations)
└── README.md       # Documentation
```

## Sections

1. **Hero** - Introduction avec animation
2. **À propos** - Présentation personnelle avec statistiques
3. **Projets** - Grille de projets avec tags technologiques
4. **Compétences** - Barres de progression animées
5. **Contact** - Liens de contact

## Personnalisation

### Informations personnelles
Modifiez dans `index.html` :
- Nom et titre dans la section hero
- Description personnelle
- Projets et leurs descriptions
- Compétences et niveaux
- Liens de contact

### Couleurs et thème
Personnalisez les variables CSS dans `style.css` :
```css
:root {
    --primary-color: #2563eb;
    --accent-color: #f59e0b;
    /* ... autres variables */
}
```

## Lancement

Ouvrez simplement `index.html` dans votre navigateur.

## Principe SOLID appliqué

- **Responsabilité unique** : Chaque classe JS a une fonction spécifique
- **Ouvert/fermé** : Code extensible sans modification
- **Substitution** : Classes interchangeables
- **Séparation des interfaces** : Interfaces dédiées
- **Inversion de dépendance** : Abstraction privilégiée