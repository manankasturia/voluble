import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Right = () => {
  const { user, initializing, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate("/");
  };

  const initial = (
    user?.displayName?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {initializing ? null : user ? (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
            {initial}
          </div>
          <button
            onClick={handleSignOut}
            className="w-40 px-3 py-3 my-4 rounded-lg font-bold bg-blue-300 text-blue-700 text-lg 
        hover:bg-blue-600 hover:text-white transition duration-300
        "
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/signin"
            className="text-lg font-medium hover:text-blue-600 px-3 py-2 transition duration-300"
          >
            Login
          </Link>
          <button
            onClick={() => navigate("/signup")}
            className="w-40 px-3 py-3 my-4 rounded-lg font-bold bg-blue-300 text-blue-700 text-lg 
        hover:bg-blue-600 hover:text-white transition duration-300
        
        "
          >
            Try Voluble
          </button>
        </div>
      )}
    </div>
  );
};

export default Right;
