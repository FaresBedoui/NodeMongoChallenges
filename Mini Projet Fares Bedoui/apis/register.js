const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const Admin = require('../models/models');

const app = express();
app.use(bodyParser.json());

// Route pour l'inscription d'un nouvel utilisateur
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Cryptage du mot de passe avant l'inscription
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
});

module.exports = app;
