const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: String,
  password: String
});


const User = mongoose.model('User', userSchema);

// Fonction pour chercher un utilisateur par email
async function findByEmail(email) {
  return User.findOne({ email });
}

// Fonction pour chercher un utilisateur par ID
async function findById(id) {
  return User.findById(id);
}

module.exports = {
  findByEmail,
  findById
};
