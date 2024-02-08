import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function TaskForm() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${userId}`);
      const data = await response.json();
      return data.username;
    } catch (error) {
      console.error('Error fetching user:', error);
      return ''; // Return an empty string in case of error
    }
  };

  const fetchCategoryData = async (categoryId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/categories/${categoryId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching category:', error);
      return { id: null, name: 'Unknown', previous_category: null }; // Return default data in case of error
    }
  };

  return (
    <div>
      <h2>Tasks and Users</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} fetchUserName={fetchUserName} fetchCategoryData={fetchCategoryData} />
      ))}
    </div>
  );
}

function Task({ task, fetchUserName, fetchCategoryData }) {
  const [username, setUsername] = useState('');
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await fetchUserName(task.user_id);
        setUsername(name);
      } catch (error) {
        console.error('Error fetching username:', error);
      }

      try {
        const data = await fetchCategoryData(task.category_id);
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [task, fetchUserName, fetchCategoryData]);

  return (
    <div>
      <h3>Task: {task.title}</h3>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Category:</strong> {categoryData.previous_category ? categoryData.previous_category.name : 'None'}</p>
      <p><strong>User:</strong> {username}</p>
      <Link to={`/update/${task.id}`}>Update Task</Link> {/* Link to UpdateForm.js */}
    </div>
  );
}

export default TaskForm;