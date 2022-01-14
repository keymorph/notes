import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from './routes/Login/LoginBox/LoginPage';
import RegisterPage from './routes/Login/Register/RegisterPage';
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