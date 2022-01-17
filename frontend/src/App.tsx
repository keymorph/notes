import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./components/Auth/AuthPage";
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
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
