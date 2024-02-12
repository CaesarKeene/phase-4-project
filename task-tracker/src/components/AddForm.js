import React, { useState, useEffect } from 'react';

function AddForm() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are provided
      if (!task || !description || !priority || !category || !user) {
        throw new Error('Missing required fields');
      }

      let categoryId = category;
      
      const existingCategory = categories.find(cat => cat.id === category);
      if (!existingCategory) {
        // If category is not found, create a new category
        const response = await fetch('http://127.0.0.1:5000/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: category }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to add category');
        }
        categoryId = data.id;
        // Fetch updated list of categories
        await fetchCategories();
      }

      const response = await fetch(`http://127.0.0.1:5000/users/${user}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: task, description, priority, category_id: categoryId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add task');
      }
      setMessage('Task added successfully!');
      // Reset form fields
      setTask('');
      setPriority('');
      setDescription('');
      setCategory('');
      setUser('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newCategory) {
        throw new Error('New category name is required');
      }
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
      // Fetch updated list of categories
      fetchCategories();
      // Reset new category input field
      setNewCategory('');
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
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
        <div>
          <label>User:</label>
          <select value={user} onChange={(e) => setUser(e.target.value)} required>
            <option value="">Select user</option>
            {users.map(usr => (
              <option key={usr.id} value={usr.id}>{usr.username}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
      <form onSubmit={handleNewCategorySubmit}>
        <div>
          <label>New Category:</label>
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required />
        </div>
        <button type="submit">Add New Category</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddForm;
