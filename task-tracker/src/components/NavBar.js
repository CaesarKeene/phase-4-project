import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/tasks/add">Add Task</Link>
        </li>
        <li>
          <Link to="/categories/add">Add Category</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar; 
