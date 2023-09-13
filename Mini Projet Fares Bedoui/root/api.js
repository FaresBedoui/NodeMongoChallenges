const express = require('express');
const bodyParser = require('body-parser');
const Admin = require('../models/models').Admin;
const Employe = require('../models/models').Employe;
const Equipe = require('../models/models').Equipe;
const Mission = require('../models/models').Mission;

const app = express();
app.use(bodyParser.json());

// Routes pour les opérations CRUD sur Admin
app.post('/admins', async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajouter une route pour récupérer un admin par son ID
app.get('/admins/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajouter une route pour mettre à jour un admin par son ID
app.put('/admins/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajouter une route pour supprimer un admin par son ID
app.delete('/admins/:id', async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes pour les opérations CRUD sur Employe
app.post('/employes', async (req, res) => {
  try {
    const newEmploye = await Employe.create(req.body);
    res.status(201).json(newEmploye);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/employes', async (req, res) => {
  try {
    const employes = await Employe.find();
    res.json(employes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employes/:id', async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    res.json(employe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/employes/:id', async (req, res) => {
  try {
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/employes/:id', async (req, res) => {
  try {
    await Employe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employé supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes pour les opérations CRUD sur Equipe
app.post('/equipes', async (req, res) => {
  try {
    const newEquipe = await Equipe.create(req.body);
    res.status(201).json(newEquipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/equipes', async (req, res) => {
  try {
    const equipes = await Equipe.find();
    res.json(equipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/equipes/:id', async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id);
    res.json(equipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/equipes/:id', async (req, res) => {
  try {
    const equipe = await Equipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(equipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/equipes/:id', async (req, res) => {
  try {
    await Equipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Équipe supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes pour les opérations CRUD sur Mission
app.post('/missions', async (req, res) => {
  try {
    const newMission = await Mission.create(req.body);
    res.status(201).json(newMission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/missions', async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/missions/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/missions/:id', async (req, res) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/missions/:id', async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mission supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Ajouter un employé à une équipe
const MAX_EMPLOYEES_PER_TEAM = 6;

app.post('/equipes/:id_équipe/ajouter_employe/:id_employe', async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id_équipe);
    const employe = await Employe.findById(req.params.id_employe);
    
    if (!equipe || !employe) {
      return res.status(404).json({ message: 'Équipe ou employé non trouvé' });
    }

    if (equipe.employes.length >= MAX_EMPLOYEES_PER_TEAM) {
      return res.status(400).json({ message: 'L\'équipe a déjà atteint son nombre maximal d\'employés' });
    }

    if (!employe.disponibilite) {
      return res.status(400).json({ message: 'L\'employé n\'est pas disponible' });
    }

    equipe.employes.push(employe);
    await equipe.save();

    employe.disponibilite = false; // Mettre l'employé en non disponible
    await employe.save();

    res.json({ message: 'Employé ajouté à l\'équipe avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = app;

