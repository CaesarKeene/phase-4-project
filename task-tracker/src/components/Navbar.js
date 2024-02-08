
import React, { } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
 

  return (
    <nav>
      <h1 className="logo">Task Tracker </h1>
      <ul>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/addform">Add Task</Link></li>
        <li><Link to="/taskform">Tasks</Link></li>
        <li><Link to="/logout">Log Out</Link></li>
      </ul>
      
    </nav>
  );
}

export default Navbar;