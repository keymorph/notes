import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './routes/Login/LoginPage';
import RegisterPage from './routes/Register/RegisterPage';
import Dashboard from './routes/Dashboard/Dashboard';

// Login Page
// Register Page
// Forgot Password Page
// Email Verification Page

// 4 separate pages

// [CREDENTIALS]   --->   [DASHBOARD]

// App Dashboard Page


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/register' element={<RegisterPage/>}/>
       
      </Routes>
    </Router>
  );
}

export default App;
