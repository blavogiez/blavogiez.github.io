# Portfolio blavogiez.github.io

Ce dépôt est archivé en plusieurs parties et chiffré, car il doit rester public pour GitHub Pages (accès au nom de domaine `blavogiez.github.io`). L’action CI/CD déchiffre ensuite le contenu avec le secret `ARCHIVE_KEY`, puis build le site.

Ce chiffrement respecte la contrainte de visibilité imposée au dépôt, tout en limitant l’exposition de documents personnels liés à mon portfolio et à l'historique git, y compris lorsqu’ils sont absents du build public, notamment en cas d’erreur de commit, d’ancien fichier sensible ou de métadonnées privées.

## Déploiement sur blavogiez.fr

Ce dépôt déploie également automatiquement le site sur mon domaine `blavogiez.fr` grâce à la plateforme libre de déploiement de conteneurs / PaaS [Komodo](https://komo.do) hébergée sur mon infrastructure Proxmox. 
Le site est alors conteneurisé (avec multi-stage optimisé), et le domaine est précisé par [les labels Traefik du conteneur](docker-compose.yml). 

Ce site est alors une application, parmi d'autres sur mon domaine, qui est déployée automatiquement par une approche descriptive Git / GitOps (Komodo agit ici comme un contrôleur). Ce déploiement sert ici principalement d'exemple, car cette approche est bien plus intéressante pour des applications plus complexes que des sites web,.

Pour plus d'informations sur cette approche, consultez [la configuration Komodo du dépôt](komodo.toml), [la configuration serveur Proxmox commune réalisée en binôme](https://github.com/jobacogiez-org/proxmox-gitops) ainsi que [mon implémentation en pratique/production](https://github.com/blavogiez-org/proxmox-configuration). 