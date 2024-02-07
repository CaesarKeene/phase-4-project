import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav>
      <ul>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/addform">Add Task</Link></li>
        <li><Link to="/taskform">Tasks</Link></li>
        <li><Link to="/logout">Log Out</Link></li>
      </ul>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button>Search</button>
      </div>
    </nav>
  );
}

export default Navbar;