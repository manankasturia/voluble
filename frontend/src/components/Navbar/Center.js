import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Center = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      <ul className="flex flex-row justify-center items-center list-none w-full gap-10 cursor-pointer">
        <li
          className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          Product
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="absolute top-10 left-0 pt-2 z-10 "
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white shadow-lg rounded-md py-2 min-w-[200px]">
                  <a
                    href="#"
                    className="block px-4 py-4 hover:bg-gray-100 transition-colors"
                  >
                    Feature 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4 hover:bg-gray-100 transition-colors"
                  >
                    Feature 2
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4 hover:bg-gray-100 transition-colors"
                  >
                    Feature 3
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
        <li className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out">
          Use Cases
        </li>
        <li className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out">
          Pricing
        </li>
        <li className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out">
          About
        </li>
      </ul>
    </div>
  );
};

export default Center;
