import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar.js";
import Landing from "./Landing/Landing.js";
import UseCases from "./UseCases/UseCases.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/usecases" element={<UseCases />} />
      </Routes>
    </Router>
  );
};

export default App;
