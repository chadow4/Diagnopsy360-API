
#  Diagnopsy360 API Back-End

<div align="center">
    <img src="https://diagnopsy.jsmb.fr/assets/img/logo.png" alt="Logo Diagnopsy360" width="500" height="auto"/>
</div>

<br/>
Diagnopsy360 API est une interface de programmation d'application (API) développée avec [NestJS](https://nestjs.com/), un framework Node.js progressif pour la construction d'applications côté serveur efficaces, fiables et évolutives. Cette API fonctionne en tandem avec le front-end Diagnopsy360 pour gérer les données et les interactions côté serveur, en utilisant l'ORM TypeORM pour la gestion des bases de données MySQL.

## I. Pré-requis

-   **Node.js et npm (Node Package Manager)** NestJS, comme Angular, nécessite Node.js pour l'environnement d'exécution et npm pour la gestion des paquets.
    
-   **NestJS CLI** La CLI NestJS est cruciale pour le développement d'applications NestJS. `npm install -g @nestjs/cli`
    
-   **Éditeur de code ou IDE** Un IDE ou un éditeur de texte est requis pour écrire et gérer le code.
    
-   **TypeORM et MySQL** L'application utilise TypeORM comme ORM et MySQL pour la base de données. Assurez-vous que MySQL est installé et configuré sur votre système.

## II. Configuration de la base de données

Avant de lancer le projet, configurez la connexion à la base de données MySQL dans le fichier `.env` :
````
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=inptapi
````
Ces paramètres définissent l'hôte, le port, le nom d'utilisateur, le mot de passe et le nom de la base de données pour votre instance MySQL locale. Les tables seront générées automatiquement par TypeORM.

Il est biensur nécessaire de créer en amont la database, seule les tables seront automatique générées par l'ORM.

## III. Lancer le projet

1. Exécutez `npm install` pour installer les dépendances nécessaires du projet.
    
2.  **Lancement du serveur de développement** Utilisez `npm run start` pour démarrer le serveur. Vous pouvez également utiliser `npm run start:dev` pour un environnement de développement qui se recharge automatiquement à chaque modification de fichier.
    
## IV. Documentation Swagger (

L'API possède une documentation Swagger complète accessible via [https://jsmb.fr:35000/documentation](https://jsmb.fr:35000/documentation), permettant une compréhension claire et une interaction facile avec les différents endpoints.
