import React, { useState, useEffect } from 'react';

function LogOut() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
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

  const handleLogOut = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${selectedUserId}`, {
        method: 'DELETE',
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
      <button onClick={handleLogOut}>Log Out</button>
      <p>{message}</p>
    </div>
  );
}

export default LogOut;