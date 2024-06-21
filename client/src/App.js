// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ChakraProvider } from '@chakra-ui/react'
import { WheelProvider } from "./contexts/WheelContext";

function App() {
  return (
    <WheelProvider>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ChakraProvider>
    </WheelProvider>
  );
}

export default App;
