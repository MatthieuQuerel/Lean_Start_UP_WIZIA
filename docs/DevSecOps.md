# Démarche DevSecOps — Projet WIZIA

## 1. Philosophie et vision globale

Le DevSecOps n'est pas une simple accumulation d'outils de sécurité greffés sur un pipeline CI/CD. C'est un **changement de culture** : la sécurité et la qualité ne sont plus des étapes finales validées par une équipe tierce, mais des **responsabilités partagées** intégrées à chaque phase du cycle de vie du logiciel — du premier commit jusqu'à la supervision en production.

Sur le projet WIZIA, nous avons appliqué ce principe en construisant un pipeline où **chaque push de code est automatiquement soumis à une batterie de contrôles** (qualité, secrets, vulnérabilités, conformité des images) **avant** de pouvoir atteindre la production. L'objectif est clair : **détecter les problèmes au plus tôt**, là où ils coûtent le moins cher à corriger.

### Les trois piliers de notre approche

| Pilier | Objectif | Mise en œuvre |
|---|---|---|
| **Dev** (Développement) | Livrer rapidement et de manière fiable | Pipeline CI/CD automatisée, Docker multi-stage, tests automatiques |
| **Sec** (Sécurité) | Protéger le code, les données et l'infrastructure | GitLeaks, Trivy, Snyk, SonarQube (SAST), revue de code obligatoire |
| **Ops** (Opérations) | Garantir la disponibilité et la résilience | Conteneurisation Docker, monitoring Grafana, procédure de rollback |

---

## 2. Pourquoi ces outils ?

Chaque outil a été choisi pour répondre à un **besoin précis** dans la chaîne de sécurité, en évitant les redondances et en privilégiant les solutions open source et gratuites adaptées à un projet étudiant/startup.

### 2.1 GitLeaks — Détection de secrets

**Besoin :** Empêcher la fuite de clés API, mots de passe ou tokens dans l'historique Git.

**Pourquoi GitLeaks et pas GitGuardian ?**
Nous avons initialement utilisé GitGuardian, mais nous avons migré vers GitLeaks pour plusieurs raisons :
- **Exécution locale et en CI** sans dépendance à un service SaaS externe.
- **Analyse de l'historique complet** (`fetch-depth: 0`) pour détecter les secrets même dans d'anciens commits.
- **Intégration native** avec GitHub Actions via l'action officielle `gitleaks/gitleaks-action@v2`.
- **Pas de limite d'utilisation** contrairement à la version gratuite de GitGuardian.

**Position dans le pipeline :** Tout premier job (`scan`), exécuté en parallèle des tests. Si un secret est détecté, l'équipe est alertée immédiatement.

### 2.2 SonarQube — Analyse statique (SAST) et qualité

**Besoin :** Identifier les bugs, les vulnérabilités et la dette technique dans le code source.

**Pourquoi SonarQube ?**
- **Analyse SAST** (Static Application Security Testing) : détection de failles de sécurité directement dans le code PHP/JS sans exécution.
- **Suivi de la dette technique** au fil des sprints : on visualise si la qualité s'améliore ou se dégrade.
- **Détection des code smells** : mauvaises pratiques qui, bien que non critiques, dégradent la maintenabilité.
- **Version Community gratuite** suffisante pour nos besoins.

**Position dans le pipeline :** Intégré au job `build-and-push`, l'analyse SonarQube s'exécute avant la construction des images Docker. Le rapport est envoyé sur notre instance SonarQube hébergée.

### 2.3 Trivy — Scan de vulnérabilités des images Docker

**Besoin :** S'assurer que les images Docker déployées en production ne contiennent pas de vulnérabilités connues (CVE) dans les packages OS ou les bibliothèques.

**Pourquoi Trivy ?**
- **Scan après le build** : contrairement aux outils d'analyse de code, Trivy analyse l'**image finale** telle qu'elle sera exécutée en production.
- **Couverture complète** : packages OS (Debian, Alpine), dépendances applicatives (Composer, npm), et même l'Infrastructure as Code.
- **Rapport SARIF** uploadé dans l'onglet Security de GitHub, offrant une vue centralisée des vulnérabilités.
- **Blocage du déploiement** : une troisième passe Trivy avec `exit-code: '1'` sur les vulnérabilités `CRITICAL` empêche le déploiement si une faille critique est détectée.

**Position dans le pipeline :** Job `trivy-scan`, exécuté **après** le build et **avant** le déploiement. C'est la dernière barrière de sécurité.

### 2.4 Snyk — Sécurité des dépendances open source

**Besoin :** Surveiller en continu les bibliothèques tierces (Composer, npm) pour détecter les vulnérabilités connues.

**Pourquoi Snyk en complément de Trivy ?**
- **Monitoring continu** : Snyk surveille les dépendances même entre les déploiements et alerte si une nouvelle CVE est publiée.
- **Propositions de correctifs automatiques** : Snyk suggère les versions patchées et peut ouvrir des PR automatiquement.
- **Complémentarité avec Trivy** : Trivy scanne l'image finale (OS + app), Snyk se concentre sur les dépendances applicatives avec une base de données de vulnérabilités plus riche.

### 2.5 Pint — Linting et formatage PHP

**Besoin :** Garantir un code PHP cohérent et lisible, conforme aux standards PSR.

**Pourquoi Pint ?**
- **Outil officiel Laravel**, basé sur PHP-CS-Fixer mais avec une configuration simplifiée.
- **Détection des écarts de style** en mode `checkstyle` dans le pipeline, sans modifier automatiquement le code.
- **Léger et rapide**, parfaitement adapté à un projet Laravel.

**Position dans le pipeline :** Job `lint`, exécuté après les tests pour garantir que le code mergé respecte les conventions.

### 2.6 Docker — Conteneurisation et déploiement

**Besoin :** Standardiser les environnements et garantir la reproductibilité des déploiements.

**Pourquoi Docker avec un build multi-stage ?**
Notre `Dockerfile.prod` utilise **3 stages** pour optimiser l'image finale :
1. **Stage `frontend`** (Node.js) : compilation des assets Vite/JS.
2. **Stage `vendor`** (Composer) : installation des dépendances PHP sans les dev-dependencies.
3. **Stage final** (PHP-FPM) : image légère contenant uniquement le nécessaire à l'exécution.

Cette approche réduit la surface d'attaque en excluant les outils de build (Node.js, Composer) de l'image de production.

### 2.7 Grafana — Monitoring et observabilité

**Besoin :** Surveiller la santé de l'application en production et détecter les anomalies.

**Pourquoi Grafana ?**
- **Tableaux de bord visuels** pour les métriques système (CPU, mémoire, réseau).
- **Centralisation des logs** applicatifs pour investiguer les erreurs rapidement.
- **Alertes configurables** pour être notifié en cas de dégradation.

---

## 3. Comment avons-nous sécurisé le pipeline ?

### 3.1 Architecture du pipeline

Le pipeline GitHub Actions suit un **enchaînement séquentiel strict** où chaque étape doit réussir pour débloquer la suivante :

```
┌─────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐
│  GitLeaks   │    │  Tests   │───►│   Lint   │───►│ SonarQube +  │───►│ Trivy Scan   │───►│  Deploy  │
│  (secrets)  │    │  (Pest)  │    │  (Pint)  │    │ Build Docker │    │ (vuln. scan) │    │  (SSH)   │
└─────────────┘    └──────────┘    └──────────┘    └──────────────┘    └──────────────┘    └──────────┘
     ▲ parallèle        │              │                  │                   │                  │
     └─────────── Déclenchement : merge d'une Pull Request sur main ──────────────────────────────┘
```

### 3.2 Sécurisation à chaque niveau

| Niveau | Mesure | Détail |
|---|---|---|
| **Code source** | Revue de code obligatoire | Toute modification passe par une PR validée par un membre de l'équipe |
| **Secrets** | GitLeaks + GitHub Secrets | Aucun secret en clair dans le code ; variables sensibles stockées dans les GitHub Secrets |
| **Qualité** | Tests Pest + Pint + SonarQube | Tests automatiques, linting, et analyse statique SAST |
| **Images Docker** | Build multi-stage + Trivy | Images minimales, scannées pour les CVE avant déploiement |
| **Dépendances** | Snyk | Surveillance continue des bibliothèques tierces |
| **Déploiement** | SSH avec clé privée | Connexion au serveur via clé SSH stockée dans les secrets GitHub |
| **Production** | HTTPS + Monitoring Grafana | Communication chiffrée et supervision en temps réel |
| **Branche main** | Protection de branche | Push direct interdit, merge uniquement via PR approuvée |

### 3.3 Gestion des secrets

Tous les secrets (clés API, mots de passe base de données, tokens) sont gérés via **GitHub Secrets** et injectés :
- Dans le pipeline CI sous forme de **variables d'environnement** (`${{ secrets.* }}`).
- Sur le serveur de production via un fichier `.env` généré dynamiquement lors du déploiement.

Aucun secret n'est jamais versionné dans le dépôt Git. GitLeaks s'assure en permanence qu'aucune fuite n'a lieu.

---

## 4. Problèmes rencontrés et solutions apportées

### 4.1 Migration de GitGuardian vers GitLeaks

**Problème :** GitGuardian, utilisé initialement, imposait des limites sur la version gratuite et nécessitait une dépendance à un service SaaS externe, ce qui complexifiait la gestion des tokens d'authentification.

**Solution :** Migration vers GitLeaks, qui s'exécute entièrement en local/CI sans service tiers. L'intégration avec GitHub Actions est native et l'analyse de l'historique complet est possible grâce au `fetch-depth: 0`.

### 4.2 Faux positifs dans les scans de sécurité

**Problème :** Trivy et Snyk remontent parfois des vulnérabilités dans des packages système ou des dépendances transitives que nous ne maîtrisons pas directement, générant du bruit dans les rapports.

**Solution :** 
- Configuration de Trivy avec `ignore-unfixed: true` pour ne remonter que les vulnérabilités ayant un correctif disponible.
- Séparation en deux passes Trivy : une en mode rapport (`exit-code: '0'`) pour la visibilité, et une en mode bloquant (`exit-code: '1'`) uniquement sur les vulnérabilités `CRITICAL`.

### 4.3 Sécurisation du déploiement SSH

**Problème :** Le déploiement sur le serveur de production nécessite un accès SSH, ce qui représente un vecteur d'attaque si mal configuré.

**Solution :**
- Utilisation de l'action `appleboy/ssh-action` avec une **clé SSH privée** stockée dans les GitHub Secrets.
- Le fichier `.env` de production est **regénéré à chaque déploiement** avec les valeurs des secrets GitHub, évitant tout fichier sensible persistant sur le serveur.
- Nettoyage automatique des anciennes images Docker avec `docker system prune -f`.


---

## 5. Ce que le DevSecOps a apporté au projet

### Avant (sans pipeline)
- Tests manuels, oubliés ou incomplets.
- Déploiement par copie FTPS.
- Aucune vérification de sécurité avant la mise en production.
- Risque de secrets exposés dans le code.

### Après (avec notre pipeline DevSecOps)
- **Chaque ligne de code** est automatiquement testée, lintée et analysée.
- **Chaque image Docker** est scannée pour les vulnérabilités avant déploiement.
- **Chaque secret** est détecté s'il est accidentellement commité.
- **Le déploiement** est entièrement automatisé SSH et reproductible.
- **Le monitoring** permet de détecter les problèmes en production en temps réel.
- **Le rollback** est documenté et opérationnel en quelques minutes.

---

## 6. Conclusion

Notre démarche DevSecOps sur WIZIA va au-delà de la mise en place d'outils : elle reflète une **culture d'équipe** où la sécurité est un réflexe quotidien. Chaque développeur sait que son code sera analysé, que ses dépendances seront auditées, et que l'image déployée sera scannée. Cette transparence et cette automatisation nous permettent de **livrer rapidement** tout en maintenant un **niveau de sécurité élevé**, adapté à une application manipulant des données utilisateurs sensibles.
