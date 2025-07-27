const express = require('express');
const cors = require('cors');
const app = express();
const todos = [];
let currentId = 1;

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'test' && password === 'password') {
    res.json({ token: 'fake-jwt-token' });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/items', (req, res) => {
  res.json(todos);
});

app.post('/items', (req, res) => {
  const todo = { id: currentId++, ...req.body };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).send();
  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).send();
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = app;

if (require.main === module) {
  app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
}