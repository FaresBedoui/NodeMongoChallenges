const express = require ('express')
const router= express.Router();
const Ninja = require ('../models/ninja')

//get a list of Ninjas from db
router.get('/ninjas', function(req,res){
  res.send({type: 'GET Fares'})
});

// //add a new Ninja to db before Chapter 9
// router.post('/ninjas', function(req,res){
//   console.log(req.body)
//   res.send({
//     type: 'POST Fares',
//     name: req.body.name,
//     rank: req.body.rank
//   });
// });

//add a new Ninja to db after Chapter 9
router.post('/ninjas', function(req,res){
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja);
  });
});
// Cela veut dire creer Ninja a partir des elements du body du request (le fichier JSON) PUIS (then) retourner le ninja que tu viens de sauvegarder pour s'assurer que tout est bon

//update a Ninja from db
router.put('/ninjas/:id', function(req,res){
  res.send({type: 'PUT Fares'})
});

//delete a Ninja from db
router.delete('/ninjas/:id', function(req,res){
  res.send({type: 'DELETE Fares'})
});

//Le resultat a exporter pour utilisation dans index.js
module.exports=router; // Le router qu on vient de creer la haut