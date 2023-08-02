const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Use IPv4, skip trying IPv6
}


const apiRoutes = require('./routes/api');


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/Challenge3_FB', options)
  .then(() => console.log('FB29 - Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api', apiRoutes);

// Port d'écoute du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`FB29 - Server running on port ${port}`);
});
