const express = require('express');
const router = express.Router();
const { User, Todo } = require('../models/users');

// API pour ajouter un nouvel utilisateur
router.post('/users', (req, res) => {
  const { firstName, lastName, email, password, age } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    age,
    todos: [] // Initialiser le tableau des tâches à vide pour un nouvel utilisateur
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour récupérer tous les utilisateurs
router.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour récupérer un utilisateur par son ID
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour mettre à jour un utilisateur par son ID
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password, age } = req.body;

  User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    email,
    password,
    age
  }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour supprimer un utilisateur par son ID
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(deletedUser);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour ajouter une tâche (todo) à un utilisateur par son ID
router.post('/users/:id/addTodo', (req, res) => {
  const userId = req.params.id;
  const todoId = req.body.todoId; // L'ID de la tâche à ajouter

  User.findByIdAndUpdate(userId, { $push: { todos: todoId } }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour supprimer une tâche (todo) d'un utilisateur par son ID
router.delete('/users/:id/removeTodo', (req, res) => {
  const userId = req.params.id;
  const todoId = req.body.todoId; // L'ID de la tâche à supprimer

  User.findByIdAndUpdate(userId, { $pull: { todos: todoId } }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour récupérer tous les utilisateurs avec les tâches liées
router.get('/usersWithTodos', (req, res) => {
  User.find().populate('todos')
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Todo/////////////////////////////////////////////////////////////////////////////////
// API pour ajouter une nouvelle tâche (todo)

router.post('/Todos', function(req, res,next){
  Todo.create(req.body).then(function(Todo){
    res.send(Todo);
  }).catch(next)
})

// API pour récupérer toutes les tâches (todos)
router.get('/Todos', (req, res) => {
  Todo.find()
    .then(Todos => res.json(Todos))
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour récupérer une tâche par son ID
router.get('/Todos/:id', (req, res) => {
  const todoId = req.params.id;

  Todo.findById(todoId)
    .then(todo => {
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


// API pour mettre à jour une tâche par son ID
router.put('/Todos/:id', (req, res) => {
  const todoId = req.params.id;
  const { name } = req.body;

  Todo.findByIdAndUpdate(todoId, { name }, { new: true })
    .then(updatedTodo => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// API pour supprimer une tâche par son ID
router.delete('/Todos/:id', (req, res) => {
  const todoId = req.params.id;

  Todo.findByIdAndDelete(todoId)
    .then(deletedTodo => {
      if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(deletedTodo);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});



module.exports = router;
