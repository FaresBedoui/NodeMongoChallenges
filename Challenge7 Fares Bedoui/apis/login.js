const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../models/user');

const app = express();
app.use(bodyParser.json());

const secretKey = 'FaresB29'; // Clé secrète pour signer le jeton JWT

// Route pour l'authentification
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la comparaison des mots de passe' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }

      // Créer un jeton d'accès JWT avec une date d'expiration
      const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'authentification de l\'utilisateur' });
  }
});

module.exports = app;
