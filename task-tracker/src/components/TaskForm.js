import React, { useState, useEffect } from 'react';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/categories');
      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, priority, category }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add task');
      }
      setMessage('Task added successfully!');
      // Clear form fields
      setTitle('');
      setDescription('');
      setPriority('');
      setCategory('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add category');
      }
      setMessage('Category added successfully!');
      // Clear new category input field
      setNewCategory('');
      // Fetch categories again to update the list
      fetchCategories();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePriorityChange = (e) => {
    const selectedPriority = e.target.value;
    // Check if the selected priority is one of the predefined options
    if (['high', 'medium', 'low'].includes(selectedPriority)) {
      setPriority(selectedPriority);
    } else {
      // If not, reset priority to empty string
      setPriority('');
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={handlePriorityChange} required>
            <option value="">Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
      <p>{message}</p>

      <h2>Add New Category</h2>
      <form onSubmit={handleNewCategorySubmit}>
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default TaskForm;