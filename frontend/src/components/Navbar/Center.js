import React from "react";
import { Link } from "react-router-dom";

const Center = () => {
  return (
    <div className="w-full">
      <ul className="flex flex-row justify-center items-center list-none w-full gap-10 cursor-pointer">
        <li className=" font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out">
          <Link to="/dashboard">Product</Link>
        </li>
        <li className="font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out">
          <Link to="/usecases">Use Cases</Link>
        </li>
        <li className="font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out">
          <Link to="/pricing">Pricing</Link>
        </li>
        <li className=" font-medium hover:text-blue-600 hover:font-bold transition-all duration-300 ease-in-out">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Center;
