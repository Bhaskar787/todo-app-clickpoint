import React, { useState, useEffect, useCallback } from 'react';

const TaskForm = ({ 
  onSubmit, 
  loading, 
  error, 
  editingTask, 
  onEditCancel 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  //  Reset form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || ''
      });
    } else {
      setFormData({ title: '', description: '' });
    }
  }, [editingTask]);

  // Single change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      //  Only reset when creating NEW task
      if (!editingTask) {
        setFormData({ title: '', description: '' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Title Field */}
      <div className="form-group form-group-title">
        <label htmlFor="title" className="form-label">
          <i className="bi bi-check-circle-fill me-1 text-success"></i>
          Task Title <span className="required">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder={editingTask ? "Update task title..." : "What needs to be done?"}
          className="form-input"
          required
          disabled={loading}
          autoFocus
          maxLength={100}
        />
      </div>

      {/* Description Field */}
      <div className="form-group form-group-description">
        <label htmlFor="description" className="form-label">
          <i className="bi bi-card-text me-1"></i>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add details about this task"
          rows="4"
          className="form-textarea"
          disabled={loading}
          maxLength={500}
        />
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading || !formData.title.trim()}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {editingTask ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              {editingTask ? (
                <>
                  <i className="bi bi-check-lg me-1"></i>
                  Update Task
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-1"></i>
                  Create Task
                </>
              )}
            </>
          )}
        </button>
        
        {editingTask && (
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onEditCancel}
            disabled={loading}
          >
            
            Cancel
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="form-error">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}
    </form>
  );
};

export default TaskForm;