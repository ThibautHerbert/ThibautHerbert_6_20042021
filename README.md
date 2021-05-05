# ThibautHerbert_6_20042021
Construire une API sécurisée pour une application d'avis gastronomiques.
Scénario : 
Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises.  La semaine dernière, vous avez reçu un mail vous proposant un nouveau projet.  La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”. L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.  Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

Ce projet utilise Node.js avec Express et MongoDB pour la base de données.
Pour lancer le projet :
Pré-requis :
Vous devez avoir un compte MongoDB (pour connecter l'API à votre cluster MongoDB)
- Cloner ce repository, lien direct : https://github.com/ThibautHerbert/ThibautHerbert_6_20042021.git
- Cloner le repository du front-end : https://github.com/OpenClassrooms-Student-Center/dwj-projet6.git
- Dans le dossier du front-end, dans votre terminal lancer "npm install node-sass@4.14.1" et "npm start" ou "ng serve" pour lancer le serveur du front-end
- Dans le dossier du back-end, dans votre terminal lancer "npm install" et "nodemon server" pour lancer le serveur du back-end
- Pour que tout fonctionne, dans le fichier app.js : remplacer la clé de connexion "DB_CONN_STRING" par vos identifiants, mot de passe et lien de la base de données MongoDB (la clé de connexion doit ressembler à ça :'mongodb+srv://yourname:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority')
- Vous devriez voir le message « Connexion à MongoDB Atlas réussie ! » dans la console
- Ouvrez une page : http://localhost:4200/ et vous accéderez à l'application Piquante
