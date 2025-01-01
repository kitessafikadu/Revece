import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Verify from "./components/Verify";
import Home from "./components/Home"; // Home page for welcome message

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/register" element={<Register />} /> {/* Register page */}
        <Route path="/verify" element={<Verify />} /> {/* Verify page */}
      </Routes>
    </Router>
  );
}

export default App;
