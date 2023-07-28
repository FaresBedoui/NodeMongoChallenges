const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
/// Ajoutés pqr Fqres pour la connection en IPv4 ET Non pas 6 Suite a des erreurs //////////////
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Use IPv4, skip trying IPv6
}
///////////////////////////////////////////////////////////////////////////////////////////////
//set up express app
const app = express();

//connect to mongoose (Fares a ajouté "options")
mongoose.connect('mongodb://localhost/ninjago',options);
// mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

//Middelware 1
app.use(bodyParser.json());

//Middelware 2
//initialize routes venant de api.js qu on  a cree
app.use('/api',require('./routes/api'));

//Middelware 3
app.use(function(err,req,res,next){
  res.send({ErrorFares: err.message})
})

//listen for requests (disregard process.env.port)
app.listen(process.env.port || 4000,function(){
  console.log('now listening for requests Fares')
});
