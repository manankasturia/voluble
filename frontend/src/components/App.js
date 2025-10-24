import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar.js";
import Landing from "./Landing/Landing.js";
import UseCases from "./UseCases/UseCases.js";
import Pricing from "./Pricing/Pricing.js";
import About from "./About/About.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/usecases" element={<UseCases />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
