import React from "react";
import Navbar from "../Navbar/Navbar.js";
import Top from "./Top.js";
import Bottom from "./Bottom.js";

const UseCases = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-sky-50">
      <Navbar />
      <Top />
      <Bottom />
    </div>
  );
};

export default UseCases;
