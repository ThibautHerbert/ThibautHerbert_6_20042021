const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
//paquets de sécurité :
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

require('dotenv').config()

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();
// global middlewares
const limiter = rateLimit({ // spécifie le nombre maximums de requêtes
  max: 100, // 100 par heure
  windowMs: 60 * 60 * 1000, // pour : 60mn 60secondes 1000 millisecondes
  message: 'Vous avez réalisé trop de requêtes depuis votre adresse IP, merci de réessayer plus tard',
})
app.use('/api', limiter);
// sécurité HTTP Headers
app.use(helmet());

mongoose.connect(process.env.DB_CONN_STRING,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// empêche les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
 });

 // BodyParser lit la donnée du body depuis req.body
app.use(bodyParser.json());
// data sanitization 
  // contre les injections noSQL :
app.use(mongoSanitize()); // enlève les $ et les . des request.body query.string ou request.Params
  // contre les attaques XSS (cross site scripting):
app.use(xss());
// données statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;