import React from "react";

const Card = ({ pack, price, btnLabel, features }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border border-gray-200 hover:scale-105 hover:shadow-xl transition-transform duration-500">
      <h2 className="text-2xl font-bold mb-2">{pack}</h2>
      <h3 className="text-xl text-gray-700 mb-4">{price}</h3>
      <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg py-2 px-4 rounded">
        {btnLabel}
      </button>

      <hr className="my-4 border-gray-300" />

      <ul className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
        {features.map((feature, index) => (
          <li
            key={index}
            className="text-gray-600 text-md flex items-center gap-2"
          >
            <span className="text-purple-700 font-bold">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
