import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Howitworks from "./components/Howitworks";
export default function App() {
  return (
    <Router>
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
                <Pricing />
                <Footer />
              </>
            }
          />
          <Route path="/pricing" element={<><Navbar /><Pricing standalone /></>} />
          <Route path="/how-it-works" element={<Howitworks />} />
        </Routes>
      </div>
    </Router>
  );
}
