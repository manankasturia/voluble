import React from "react";
import Login from "../Login/Login.js";

const Right = () => {
  return (
    <div className="flex items-center space-x-4">
      <Login />
      <button
        className="w-40 px-3 py-3 my-4 rounded-lg font-bold bg-blue-300 text-blue-700 text-lg 
        hover:bg-blue-600 hover:text-white transition duration-300
        
        "
      >
        Try Voluble
      </button>
    </div>
  );
};

export default Right;
