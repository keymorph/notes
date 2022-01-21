import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Note from "./components/Dashboard/Note/Note";

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
        <Route path="/note" element={<Note/>}/>
      </Routes>
    </Router>
  );
}

export default App;
