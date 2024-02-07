import React, { useState } from 'react';

function UpdateForm({ taskId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, priority, category }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      // Handle success
      setMessage('Task updated successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      // Handle success
      setMessage('Task deleted successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Update Task</button>
        <button onClick={handleDelete}>Delete Task</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default UpdateForm;
