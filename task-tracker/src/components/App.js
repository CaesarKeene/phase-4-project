
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import AddUser from './AddUser';
import AddTask from './AddTask';
import AddCategory from './AddCategory';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
import LogOut from './LogOut';



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
          <Route path="/addform" component={AddForm} />
          <Route path="/updateform" component={UpdateForm} />
          <Route path="/logout" component={LogOut} />

        </Routes>  

        
      </div>
    </Router>
  );
}

export default App;
