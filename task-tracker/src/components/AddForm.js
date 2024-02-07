import React, { useState } from 'react';

const AddForm = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [taskData, setTaskData] = useState({ taskName: '', description: '' });
  const [categoryData, setCategoryData] = useState({ categoryName: '' });

  const handleUserSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send user registration data to the backend API
    console.log('Add User:', userData);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send task data to the backend API
    console.log('Add Task:', taskData);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    // Implement logic to send category data to the backend API
    console.log('Add Category:', categoryData);
  };

  return (
    <div>
      <form onSubmit={handleUserSubmit}>
        <h2>Add User</h2>
        <label>
          Username:
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
        </label>
        <button type="submit">Add User</button>
      </form>

      <form onSubmit={handleTaskSubmit}>
        <h2>Add Task</h2>
        <label>
          Task Name:
          <input
            type="text"
            value={taskData.taskName}
            onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
          />
        </label>
        <label>
          Description:
          <textarea
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>

      <form onSubmit={handleCategorySubmit}>
        <h2>Add Category</h2>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryData.categoryName}
            onChange={(e) => setCategoryData({ ...categoryData, categoryName: e.target.value })}
          />
        </label>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddForm;
