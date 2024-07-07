// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ChakraProvider } from '@chakra-ui/react'
import './fontAwesome';
import Admin from "./pages/Admin";
import Inactive from "./pages/Inactive";
import Stats from "./pages/Stats";
import { ProfileProvider } from "./contexts/ProfileContext";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/nofun" element={<ProfileProvider><Inactive /></ProfileProvider>} />
          <Route path="/leaderboard" element={<Stats />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
