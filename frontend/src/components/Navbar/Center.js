import React from "react";

const Center = () => {
  return (
    <div className="w-full">
      <ul className="flex flex-row justify-center items-center list-none w-full gap-10 cursor-pointer">
        <li className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-1000 ease-in-out">
          Product
        </li>
        <li className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-1000 ease-in-out">
          Use Cases
        </li>
        <li className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-1000 ease-in-out">
          Pricing
        </li>
        <li className="bg-white font-medium hover:text-blue-600 hover:font-bold transition-all duration-1000 ease-in-out">
          About
        </li>
      </ul>
    </div>
  );
};

export default Center;
