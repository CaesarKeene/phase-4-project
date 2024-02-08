import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import AddForm from './AddForm';
import TaskForm from './TaskForm';
import UpdateForm from './UpdateForm';
import Navbar from './Navbar';
import LogOut from './LogOut';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addform" element={<AddForm />} />
          <Route path="/taskform" element={<TaskForm />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/update/:id" element={<UpdateForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
