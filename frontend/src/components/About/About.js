import React from "react";
import Navbar from "../Navbar/Navbar.js";
import about1 from "../../assets/about1.png";

const About = () => {
  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Navbar />
      <h1 className="text-5xl font-bold my-8 text-center text-blue-950">
        Giving Every Idea a{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-rose-500">
          Confident
        </span>{" "}
        Voice
      </h1>

      <img src={about1} alt="About Us" className="mx-auto mt-6 w-1/2" />
    </div>
  );
};

export default About;
