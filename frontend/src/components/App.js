import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./Navbar/Navbar.js";
import Landing from "./Landing/Landing.js";
import UseCases from "./UseCases/UseCases.js";
import Pricing from "./Pricing/Pricing.js";
import About from "./About/About.js";
import SignUp from "./Auth/SignUp.js";
import SignIn from "./Auth/SignIn.js";
import AudioAnalyzer from "./AudioAnalyzer/AudioAnalyzer.js";
import Dashboard from "./Dashboard/Dashboard.js";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);
  if (loading) return null;
  if (!user)
    return <Navigate to="/signin" replace state={{ from: location }} />;
  return children;
};

const App = () => {
  const { loading } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/usecases" element={<UseCases />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/analyzer" element={<AudioAnalyzer />} />
        {loading ? null : (
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
