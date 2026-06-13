import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const load = useCallback(() => fetchTasks().then(setTasks), []);

  useEffect(() => { load(); }, [load]);

  const addTask = async (data) => {
    const task = await createTask(data);
    setTasks(prev => [task, ...prev]);
  };

  const toggleTask = async (id, completed) => {
    const updated = await updateTask(id, { completed: !completed });
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const editTask = async (id, data) => {
    const updated = await updateTask(id, data);
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const removeTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filtered = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return { tasks: filtered, filter, setFilter, addTask, toggleTask, editTask, removeTask, activeCount, completedCount };
}
