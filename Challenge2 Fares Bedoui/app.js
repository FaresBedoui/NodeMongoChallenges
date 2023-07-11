const mongoose = require('./database/connect');
const Todo = require('./models/todo');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/todos', (req, res) => {
  const { name, description } = req.body;
  const todo = new Todo({ name, description });

  todo.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la création d\'un nouveau Todo' });
    });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({ message: 'Todo supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Todo non trouvé' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du Todo' });
    });
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  Todo.findByIdAndUpdate(id, { name, description }, { new: true })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Todo non trouvé' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du Todo' });
    });
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des Todos' });
    });
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  Todo.findById(id)
    .then((todo) => {
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ error: 'Todo non trouvé' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du Todo' });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
