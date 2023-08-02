const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const registerApi = require('./apis/register');
const loginApi = require('./apis/login');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Use IPv4, skip trying IPv6
}

const app = express();
app.use(bodyParser.json());

// MongoDB
mongoose.connect('mongodb://localhost:27017/Challenge7_FB', options)
  .then(() => console.log('FB29 - Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Utilisation des APIs "register" et "login"
app.use(registerApi);
app.use(loginApi);

const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
