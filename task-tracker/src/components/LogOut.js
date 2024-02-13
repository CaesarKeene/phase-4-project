import React, { useState, useEffect } from 'react';

function LogOut() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://task-tracker-wgqn.onrender.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await fetch(`https://task-tracker-wgqn.onrender.com/users/${selectedUserId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
      // Handle success
      setMessage('Logged out successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Log Out</h2>
      <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
        <option value="">Select user to delete</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogOut}>Log Out</button>
      <p>{message}</p>
    </div>
  );
}

export default LogOut;
