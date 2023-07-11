const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/challenge2db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connexion à la base de données établie');
})
.catch((error) => {
  console.error('Erreur lors de la connexion à la base de données:', error);
});

module.exports = mongoose;

