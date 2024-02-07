

import React, { useState } from 'react';


function AddUser() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error('Username already in use');
      }
      setMessage('User added successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">Add User</button>
      </form>
      <p>{message}</p>
    </div>
  );
}


export default AddUser; 
