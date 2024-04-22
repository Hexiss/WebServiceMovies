Web Service de Gestion de Films
Ce projet est un Web Service conçu pour gérer des informations sur les films. Il fournit des fonctionnalités CRUD (Create, Read, Update, Delete) pour manipuler les données des films, ainsi qu'une documentation OpenAPI pour explorer les endpoints de l'API.

Installation
Cloner le dépôt depuis GitHub :
bash
Copy code
git clone https://github.com/votre-utilisateur/web-service-films.git
Installer les dépendances :
bash
Copy code
cd web-service-films
npm install
Configuration
Assurez-vous d'avoir une base de données MySQL configurée et accessible depuis votre application. Vous pouvez configurer les informations de connexion dans le fichier config.js.
Assurez-vous d'avoir les fichiers JSON Swagger générés pour la documentation OpenAPI. Vous pouvez les modifier ou les générer à l'aide d'outils comme Swagger Editor.
Utilisation
Lancez l'application en exécutant la commande :
bash
Copy code
npm start
Accédez à l'interface Swagger UI pour explorer la documentation de l'API :http://localhost:3000/api-docs
Utilisez des outils comme Postman pour tester les différentes routes de l'API.
Points d'API Principaux
GET /films: Récupérer la liste des films.
GET /films/:id: Récupérer un film par son ID.
POST /films: Créer un nouveau film.
PUT /films/:id: Mettre à jour un film existant.
DELETE /films/:id: Supprimer un film par son ID.
