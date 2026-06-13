import React, { useState } from 'react';
import useTasks from './useTasks';

const FILTERS = ['All', 'Active', 'Completed'];

function StatsBar({ activeCount, completedCount }) {
  return (
    <div className="stats-bar">
      <span className="stat active-stat">{activeCount} active</span>
      <span className="stat-divider">·</span>
      <span className="stat completed-stat">{completedCount} completed</span>
    </div>
  );
}

function EmptyState({ filter }) {
  const messages = {
    All: { icon: '📋', heading: 'No tasks yet', sub: 'Add your first task above to get started.' },
    Active: { icon: '✅', heading: 'All caught up!', sub: 'No active tasks remaining.' },
    Completed: { icon: '🏆', heading: 'Nothing completed yet', sub: 'Finish a task and it will appear here.' }
  };
  const { icon, heading, sub } = messages[filter];
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <h2>{heading}</h2>
      <p>{sub}</p>
    </div>
  );
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={submit} className="task-form">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title *" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  const save = async () => {
    await onEdit(task.id, { title, description, dueDate });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="task-item editing">
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <input value={description} onChange={e => setDescription(e.target.value)} />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <button onClick={save}>Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    );
  }

  const isOverdue = !task.completed && task.dueDate && new Date(task.dueDate + 'T23:59:59') < new Date();

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id, task.completed)} />
      <div className="task-details">
        <span className="task-title">{task.title}</span>
        {task.description && <span className="task-desc">{task.description}</span>}
        {task.dueDate && <span className={`task-due ${isOverdue ? 'overdue-date' : ''}`}>{isOverdue ? '⚠ Overdue: ' : 'Due: '}{task.dueDate}</span>}
      </div>
      <div className="task-actions">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default function App() {
  const { tasks, filter, setFilter, addTask, toggleTask, editTask, removeTask, activeCount, completedCount } = useTasks();

  return (
    <div className="container">
      <h1>Personal Task Manager</h1>
      <StatsBar activeCount={activeCount} completedCount={completedCount} />
      <TaskForm onAdd={addTask} />
      <div className="filters">
        {FILTERS.map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="task-list">
        {tasks.length === 0
          ? <EmptyState filter={filter} />
          : tasks.map(t => (
              <TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={removeTask} onEdit={editTask} />
            ))
        }
      </div>
    </div>
  );
}
