import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import Dashboard from "./components/Dashboard/Dashboard";

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
