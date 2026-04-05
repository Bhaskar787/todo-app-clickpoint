import React, { useCallback, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

function App() {
  const { tasks, loading, error, createTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const [editingTask, setEditingTask] = React.useState(null);

  
  useEffect(() => {
    if (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }, [error]);

  // Create/Update task
  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        toast.success('Task updated successfully!');
        setEditingTask(null); // Exit edit mode
      } else {
        await createTask(taskData);
        toast.success('Task created successfully!');
      }
    } catch (err) {
      console.error('Task operation failed:', err);
      toast.error('Failed to save task!');
    }
  };

  // Toggle complete
  const handleToggleTask = async (taskId) => {
    try {
      await toggleComplete(taskId);
      toast.success('Task status updated!');
    } catch (err) {
      console.error('Toggle failed:', err);
      toast.error('Failed to update task status!');
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        toast.success('Task deleted successfully!');
      } catch (err) {
        console.error('Delete failed:', err);
        toast.error('Failed to delete task!');
      }
    }
  };

  //  Auto-scroll and Auto-focus
  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    
    // auto scroll and focus after state update
    requestAnimationFrame(() => {
      const formSection = document.querySelector('.form-section');
      if (formSection) {
        formSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }
      
      const titleInput = document.querySelector('#title');
      if (titleInput) {
        titleInput.focus();
        titleInput.select(); // Select all text for easy edit
      }
    });
  }, []);

  // Exit edit mode
  const handleCancelEdit = () => {
    setEditingTask(null);
    toast('Edit cancelled', { icon: '❌' });
  };

  // Memoized stats
  const totalTasks = tasks.length;
  const completedTasks = React.useMemo(
    () => tasks.filter(t => t.is_completed).length, 
    [tasks]
  );
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app-container">
      {/* React Hot Toast */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="app-content">
        {/* Hero Header */}
        <header className="hero-section" role="banner">
          <div className="hero-card">
            <div className="hero-icon" aria-hidden="true">
              <i className="bi bi-rocket-takeoff-fill"></i>
            </div>
            <div>
              <h1 className="hero-title">
                <i className="bi bi-list-check"></i>
                Todo App
              </h1>
              <p className="hero-subtitle">
                Manage your tasks efficiently. Stay productive.
              </p>
            </div>
          </div>
          
          {/* Live Stats */}
          <div className="stats-grid" role="status">
            <div className="stat-card">
              <div className="stat-icon total-tasks-icon">
                <i className="bi bi-list-ul"></i>
              </div>
              <div className="stat-number total-tasks" aria-label="Total tasks">
                {totalTasks}
              </div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon completed-tasks-icon">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <div className="stat-number completed-tasks" aria-label="Completed tasks">
                {completedTasks}
              </div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending-tasks-icon">
                <i className="bi bi-clock-history"></i>
              </div>
              <div className="stat-number pending-tasks" aria-label="Pending tasks">
                {pendingTasks}
              </div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
        </header>

        {/* Task Form */}
        <main className="main-content">
          <section className="form-section" id="task-form" aria-labelledby="form-heading">
            <TaskForm
              onSubmit={handleSubmitTask}
              loading={loading}
              error={error}
              editingTask={editingTask}
              onEditCancel={handleCancelEdit}
            />
          </section>

          {/* Task List */}
          <section className="list-section" aria-labelledby="tasks-heading">
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              loading={loading}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="footer" role="contentinfo">
          <div className="footer-card">
            <p>
              
              Bhaskar Todo app
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;