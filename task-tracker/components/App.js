// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import AddCategory from './components/AddCategory';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/tasks" exact component={TaskList} />
          <Route path="/tasks/add" component={AddTask} />
          <Route path="/categories/add" component={AddCategory} />
          <Route path="/navbar" component={NavBar} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
