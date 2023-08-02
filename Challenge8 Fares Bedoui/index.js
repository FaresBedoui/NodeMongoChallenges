const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const bearerStrategy = require('./passport-strategies/bearer');
const { findByEmail } = require('./users');

const app = express();

// Connexion à la base de données MongoDB
const mongoURI = 'mongodb://localhost:27017/Challenge8_FB';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB établie.');
}).catch((err) => {
  console.error('Erreur lors de la connexion à MongoDB :', err);
});

app.use(bodyParser.json());
app.use(passport.initialize());

// Route pour l'authentification
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);

  if (user && user.password === password) {
    res.json({ token: email }); // renvoyer email comme token.
  } else {
    res.status(401).json({ message: 'Identifiants invalides.' });
  }
});
///////////////////////////////////////////J'ai toujours le message Identifiants invalides.

// Middleware pour vérifier l'authentification avant d'accéder aux APIs sécurisées
const authenticateMiddleware = passport.authenticate('bearer', { session: false });

// Route sécurisée 
app.get('/secure-api', authenticateMiddleware, (req, res) => {
  res.json({ message: 'Ceci est une API sécurisée.' });
});



// Serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
