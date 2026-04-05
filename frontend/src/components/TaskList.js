import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask, loading }) => {
  
  if (loading && tasks.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner-border spinner-border-lg text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="loading-text">
          <i className="bi bi-hourglass-split me-2"></i>
          Loading tasks...
        </span>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.is_completed).length;
  const completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="tasklist-container">
      {/* Header */}
      <div className="tasklist-header">
        <div className="header-left">
          <h2 className="tasks-title">
            <i className="bi bi-list-check me-2 text-primary"></i>
            My Tasks
          </h2>
          <p className="tasks-subtitle">
            {totalTasks} task{totalTasks !== 1 ? 's' : ''}
            {totalTasks > 0 && (
              <>
                {' • '}
                <span className="completed-count">
                  <i className="bi bi-check-circle-fill me-1 text-success"></i>
                  {completedTasks} completed ({completedPercentage}%)
                </span>
              </>
            )}
          </p>
        </div>
        
        {totalTasks > 0 && (
          <div 
            className="progress-badge"
            title={`${completedPercentage}% complete`}
          >
            <i className="bi bi-graph-up me-1"></i>
            {completedTasks}/{totalTasks} done
          </div>
        )}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && !loading && (
        <div className="empty-state" role="img" aria-label="No tasks">
          <div className="empty-icon" aria-hidden="true">
            <i className="bi bi-clipboard-plus display-1 text-muted"></i>
          </div>
          <h3 className="empty-title">
            <i className="bi bi-inbox me-2"></i>
            No tasks yet
          </h3>
          <p className="empty-subtitle">
            Get started by creating your first task above.
            <br />
            <span className="empty-highlight">
              <i className="bi bi-rocket-takeoff-fill me-1"></i>
              You'll be more productive instantly!
            </span>
          </p>
        </div>
      )}

      {/* Tasks List */}
      {tasks.length > 0 && (
        <div className="tasks-grid" role="list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;