const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Définir le dossier pour les fichiers téléchargés
const uploadDir = path.join(__dirname, 'uploads');
console.log("Chemin du dossier de téléchargement :", uploadDir);


// Configuration de multer pour le téléchargement de fichiers
const upload = multer({
  dest: uploadDir,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Erreur: Seuls les fichiers jpeg, jpg, png et gif sont autorisés!'));
    }
  },
});

// API pour l'upload d'une seule image
// app.post('/upload', upload.single('image'), (req, res) => {
//   res.json({ message: 'Image téléchargée avec succès!' });
// });

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    console.log("Fichier téléchargé :", req.file);
    res.json({ message: 'Image téléchargée avec succès!' });
  } else {
    res.status(400).json({ error: 'Erreur lors du téléchargement de l\'image.' });
  }
});


// API pour l'upload de plusieurs images
app.post('/uploadmultiple', upload.array('images', 10), (req, res) => {
  res.json({ message: 'Images téléchargées avec succès!' });
});

// Configuration d'express pour servir les fichiers statiques depuis le dossier 'uploads'
app.use(express.static(uploadDir));

// Démarrer le serveur
const port = 3000; // Vous pouvez utiliser le port de votre choix
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
