import React from "react";
import { useNavigate } from "react-router-dom";

const Right = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4">
      <a
        href="/signin"
        className="text-md font-medium hover:text-purple-600 mr-4"
      >
        Login
      </a>
      <button
        onClick={() => navigate("/signup")}
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
