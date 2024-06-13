// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AuthCallback from "./components/AuthCallback";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Login />} />
        <Route path="/roulette" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
