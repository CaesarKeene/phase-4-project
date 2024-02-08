import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateForm() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
        setMessage(error.message);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      setMessage('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage(error.message);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setMessage('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage(error.message);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/categories/${task.category_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      setMessage('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage(error.message);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Task</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
      </div>
      <div>
        <label>Priority:</label>
        <input type="text" value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })} />
      </div>
      <button onClick={handleUpdateTask}>Update Task</button>
      <button onClick={handleDeleteTask}>Delete Task</button>
      <button onClick={handleDeleteCategory}>Delete Category</button>
      <p>{message}</p>
    </div>
  );
}

export default UpdateForm;