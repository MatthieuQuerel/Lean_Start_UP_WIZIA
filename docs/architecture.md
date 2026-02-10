# Architecture du projet

## Pipeline GitHub 

![GitHub action](./evidence/ci-pipeline-success.png)
![GitHub action2](./evidence/diagramme-pipeline-deploiement.webp)

## Justifiacation de la Pipeline GitHub

- GitHub
    - Gratuit (pour les dépôts publics et privés)
    - Automatisation CI/CD (via GitHub Actions)
    - Outils Open Source et immense communauté
    - Outils performants et scalables
    - Gestion des secrets 
    - Revue de code collaborative 

- SonarQube
    - Détection de bugs et de vulnérabilités
    - Vision sur la qualité du code (dette technique et couverture de tests)
    - Open source avec une version gratuite (Community Edition)
    - Outil performant pour l'analyse statique (SAST)
    - Analyse des "Code Smells" (mauvaises pratiques)

- Docker
    - Conteneurisation d'applications
    - Duplication et isolation des environnements de développement
    - Standardisation des déploiements 
    - Écosystème riche avec Docker Hub

- Pint 
    - Utilisation pour le linting et le formatage automatique
    - Simple de configuration
    - Gratuit et léger
    - Basé sur PHP-CS-Fixer

- GitLeaks
    - Détection de vulnérabilités (recherche de clés API ou mots de passe)
    - Prévention des fuites de données avant le "commit" 

- Trivy 
    - Scan de vulnérabilités dans les images Docker et packages OS
    - Analyse de l'Infrastructure as Code 
    - Détection de mauvaises configurations de sécurité

- Snyk
    - Détection de vulnérabilités dans les dépendances open source
    - Simple à mettre en place avec des rapports détaillés
    - Monitoring continu et propositions de correctifs automatiques

## Justifiacation par image

### Documentation API

Pour faciliter la collaboration avec l'équipe Front-end, nous avons généré une documentation interactive. Elle permet de tester toutes les routes du projet en temps réel.

![swagger](./evidence/swagger.webp)

[Lien swagger](https://wizia.beziau.dev/api/documentation)
 
### Qualité avec SonarQube

SonarQube nous offre une vision globale sur la qualité du projet , en isolant les bugs critiques et en suivant l'évolution de la qualité au fil des sprints.

![Sonar_Analyse](./evidence/Sonar_Analyse.png)
![Sonarcube](./evidence/Sonar.png)


### Sécurité des Dépendances avec Snyk

Snyk surveille nos bibliothèques externes pour s'assurer qu'aucune faille connue n'est introduite dans l'application.

![Sonarcube](./evidence/Snyk.png)
![Sonar_Analyse](./evidence/Snyk_Analyse.png)


### Transition de GitGuardian vers GitLeaks

Initialement, nous utilisions **GitGuardian** pour la détection de secrets. Cependant, nous avons opté pour **GitLeaks** pour son intégration plus fluide  et sa performance en ligne de commande qui s'adapte mieux à nos besoins actuels.

![GitGuardan](./evidence/GitGuardan.png)

### GitHub

Pour garantir la stabilité de la branche principale, nous avons mis en place des règles strictes : l'interdiction de "push" directement sur la branche de production et l'obligation de passer par une Pull Request. Pour être fusionnée, chaque modification doit être impérativement revue et validée par Dimitri ou moi-même

![GitHub push](./evidence/GitHub_push.png)
![Code rulse](./evidence/Code_Rulse.png)


### Application accessibilité

![Application HTTPS](./evidence/Application_Https.png)

### Monitoring

Pour assurer la haute disponibilité de notre application et suivre ses performances en temps réel, nous avons choisi Grafana comme outil de visualisation. Pour surveiller les métriques clés du système et pour investiguer rapidement les erreurs de l'application.

![Monitoring ](./evidence/Overview.png)
![Monitoring ](./evidence/Log.png)

### Code Scan GitHub

![Code scan GitHub ](./evidence/Code_scan.png)
