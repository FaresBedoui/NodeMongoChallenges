const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const User = require('../models/user');

const app = express();
app.use(bodyParser.json());

// Route pour l'inscription d'un nouvel utilisateur
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Cryptage du mot de passe avant l'inscription
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
});

module.exports = app;
