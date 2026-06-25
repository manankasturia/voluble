import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import userIcon from "../../assets/user-icon.svg";
import { motion, AnimatePresence } from "framer-motion";
import signOutIcon from "../../assets/signout-icon.svg";

const Right = () => {
  const { user, initializing, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate("/");
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const initial = (
    user?.displayName?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {initializing ? null : user ? (
        <div className="flex items-center gap-3 w-max">
          <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
            <img src={userIcon} alt="User Icon" className="w-6 h-6" />
          </div>
          <div
            className="inline-block font-medium text-lg cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {user.displayName || "User"}
            <svg
              height="18"
              width="18"
              viewBox="0 0 24 24"
              stroke="#000000"
              fill="none"
              transform="rotate(90)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="arcs"
              style={{ marginLeft: "5px", display: "inline-block" }}
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  className="absolute top-20 right-8 pt-2 z-10 "
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white shadow-lg rounded-md border border-0 border-t-4 border-fuchsia-800 min-w-[250px] items-center flex flex-col">
                    <div className="w-full bg-gray-100 flex flex-col items-center gap-2 p-4 rounded-t-md">
                      <div className="w-10 h-10 rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-sm">
                        {initial}
                      </div>
                      <div className="inline p-2">
                        <p className="font-bold text-sm">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <label
                      onClick={handleSignOut}
                      className="w-40 px-3 py-3 my-4 font-semibold text-sm hover:text-red-600 transition duration-300 ease-inn-out cursor-pointer"
                    >
                      <img
                        src={signOutIcon}
                        alt="Sign Out"
                        className="w-6 h-6 inline mr-2"
                      />
                      Sign Out
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
