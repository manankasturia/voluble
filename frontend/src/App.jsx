import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Howitworks from "./components/Howitworks";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Loginpage";

function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);

    const timer = setTimeout(() => {
      const ele = document.getElementById(id);
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hash, pathname])
}

function AppRoutes() {
  useScrollToHash();

  return (
    <div className="min-h-screen bg-[#07090f] text-white font-sans">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <UseCases />
            </>
          }
        />
        <Route path="/pricing" element={<Pricing standalone />} />
        <Route path="/how-it-works" element={<Howitworks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}