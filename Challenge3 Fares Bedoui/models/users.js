const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  todos: [todoSchema]
});

const User = mongoose.model('User', userSchema);

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
  User: User,
  Todo: Todo
};
