const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const TASKS_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(express.json());

const readTasks = () => JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
const writeTasks = (tasks) => fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));

app.get('/api/tasks', (req, res) => {
  const tasks = readTasks().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description = '', dueDate = null } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = { id: uuidv4(), title, description, dueDate, completed: false, createdAt: new Date().toISOString() };
  const tasks = readTasks();
  tasks.push(task);
  writeTasks(tasks);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const filtered = tasks.filter(t => t.id !== req.params.id);
  if (filtered.length === tasks.length) return res.status(404).json({ error: 'Task not found' });
  writeTasks(filtered);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
