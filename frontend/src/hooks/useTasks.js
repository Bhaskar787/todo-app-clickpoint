import { useState, useEffect, useCallback } from 'react';
import { tasksAPI } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await tasksAPI.getAll();
      setTasks(data || []);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Fetch error:', err);
      setTasks([]); // Reset to empty on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new task
  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await tasksAPI.create(taskData);
      setTasks(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError('Failed to create task');
      console.error('Create error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update task (edit + toggle complete)
  const updateTask = useCallback(async (id, taskData) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await tasksAPI.update(id, taskData);
      setTasks(prev => prev.map(task => task.id === id ? data : task));
      return data;
    } catch (err) {
      setError('Failed to update task');
      console.error('Update error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    setLoading(true);
    setError('');
    try {
      await tasksAPI.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Delete error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle complete (uses updateTask)
  const toggleComplete = useCallback(async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    await updateTask(id, {
      ...task,
      is_completed: !task.is_completed
    });
  }, [tasks, updateTask]);

  // Initial load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete 
  };
};