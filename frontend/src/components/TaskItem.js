const TaskItem = ({ task, onToggle, onDelete, onEdit, loading }) => {
  const toggleTask = () => onToggle(task.id);
  const handleDelete = () => onDelete(task.id);
  const handleEdit = (e) => {
    e.stopPropagation(); // Hauto scroll when clickingn on edit button
    onEdit?.(task);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Today';
    }
  };

  const isCompleted = task.is_completed;

  return (
    <div className={`task-item ${isCompleted ? 'task-item--completed' : ''}`}>
      {/*  overlay */}
      <div className="task-item-overlay"></div>
      
      {/* Main Content */}
      <div className="task-content">
        <div className="task-main">
          {/* Toggle Button */}
          <button
            onClick={toggleTask}
            disabled={loading}
            className={`toggle-btn ${isCompleted ? 'toggle-btn--completed' : ''} ${loading ? 'toggle-btn--disabled' : ''}`}
            aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          >
            {isCompleted ? (
              <i className="bi bi-check-circle-fill"></i>
            ) : (
              <i className="bi bi-circle"></i>
            )}
          </button>

          {/* Title - Click to EDIT */}
          <div 
            className="task-details" 
            onClick={handleEdit}
            title={`Click to edit: ${task.title}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleEdit(e);
              }
            }}
          >
            <h3 className={`task-title ${isCompleted ? 'task-title--completed' : ''}`}>
              {task.title}
            </h3>

            {/* Description - Hides when complete */}
            {task.description && !isCompleted && (
              <p className="task-description">
                {task.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="task-meta">
        <div className="meta-left">
          <span className="meta-date" title="Created date">
            <i className="bi bi-calendar-event"></i>
            {formatDate(task.created_at)}
          </span>
          <div className="meta-divider"></div>
          <span className={`meta-status ${isCompleted ? 'meta-status--completed' : ''}`}>
            {isCompleted ? (
              <>
                <i className="bi bi-check-circle"></i>
                Completed
              </>
            ) : (
              <>
                <i className="bi bi-clock"></i>
                Pending
              </>
            )}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {onEdit && (
            <button
              onClick={handleEdit}
              disabled={loading}
              className="action-edit"
              title="Edit task"
              aria-label="Edit"
            >
              <i className="bi bi-pencil"></i>
              Edit
            </button>
          )}
          
          <button
            onClick={handleDelete}
            disabled={loading}
            className="action-delete"
            title="Delete task"
            aria-label="Delete"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;