const BASE = `${import.meta.env.VITE_API_URL || ''}/api/tasks`;

export const fetchTasks = () => fetch(BASE).then(r => r.json());

export const createTask = (data) =>
  fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());

export const updateTask = (id, data) =>
  fetch(`${BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());

export const deleteTask = (id) => fetch(`${BASE}/${id}`, { method: 'DELETE' });
