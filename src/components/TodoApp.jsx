import React, { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle2, Circle } from 'lucide-react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Load tasks from local storage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to load tasks from local storage:', error);
      }
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleString(),
      };
      setTasks([newTask, ...tasks]);
      setInputValue('');
    }
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion status
  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Get filtered tasks
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="todo-app">
      <div className="todo-container">
        {/* Header */}
        <div className="todo-header">
          <div className="todo-title-section">
            <h1 className="todo-title">My Tasks</h1>
            <p className="todo-subtitle">Stay organized and track your daily goals</p>
          </div>
          <div className="todo-stats">
            <div className="stat-item">
              <span className="stat-number">{activeTasks}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{completedTasks}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <form className="todo-form" onSubmit={handleAddTask}>
          <div className="input-wrapper">
            <input
              type="text"
              className="todo-input"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={100}
            />
            <button type="submit" className="add-button" title="Add task">
              <Plus size={20} />
            </button>
          </div>
          {inputValue && (
            <div className="input-helper">
              {100 - inputValue.length} characters remaining
            </div>
          )}
        </form>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeTasks})
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTasks})
          </button>
        </div>

        {/* Task List */}
        <div className="todo-list">
          {filteredTasks.length > 0 ? (
            <ul className="task-items">
              {filteredTasks.map((task) => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <button
                    className="task-checkbox"
                    onClick={() => handleToggleTask(task.id)}
                    title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {task.completed ? (
                      <CheckCircle2 size={24} className="checkbox-icon completed-icon" />
                    ) : (
                      <Circle size={24} className="checkbox-icon" />
                    )}
                  </button>
                  <div className="task-content">
                    <p className="task-text">{task.text}</p>
                    <span className="task-time">{task.createdAt}</span>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3 className="empty-title">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks found'}
              </h3>
              <p className="empty-message">
                {tasks.length === 0
                  ? 'Add a new task to get started!'
                  : `No ${filter} tasks to show. Try adjusting your filter.`}
              </p>
            </div>
          )}
        </div>

        {/* Clear Completed Button */}
        {completedTasks > 0 && (
          <button
            className="clear-completed-btn"
            onClick={() => setTasks(tasks.filter(task => !task.completed))}
          >
            Clear {completedTasks} completed task{completedTasks !== 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoApp;