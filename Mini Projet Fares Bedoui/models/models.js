const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  categorie: String,
  departement: String
});

const employeSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  categorie: String,
  specialite: String,
  numCnss: String,
  age: Number,
  disponibilite: Boolean
});

const equipeSchema = new mongoose.Schema({
  tache: String,
  description: String,
  dateDebut: Date,
  dateFin: Date,
  employes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employe' }]
});

const missionSchema = new mongoose.Schema({
  tache: String,
  description: String,
  dateDebut: Date,
  dateFin: Date,
  equipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' }]
});

const Admin = mongoose.model('Admin', adminSchema);
const Employe = mongoose.model('Employe', employeSchema);
const Equipe = mongoose.model('Equipe', equipeSchema);
const Mission = mongoose.model('Mission', missionSchema);

module.exports = { Admin, Employe, Equipe, Mission };
