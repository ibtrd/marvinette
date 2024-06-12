// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AuthCallback from "./components/AuthCallback";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the OAuth callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Default route (home page) */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
