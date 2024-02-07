
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import AddUser from './AddUser';
import AddTask from './AddTask';
import AddCategory from './AddCategory';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/adduser" component={AddUser} />
          <Route path="/tasks/add" component={AddTask} />
          <Route path="/categories/add" component={AddCategory} />
          <Route path="/navbar" component={NavBar} />
        </Routes>  

        
      </div>
    </Router>
  );
}

export default App;
