import React from "react";

const Card = ({ title, description, bg_color }) => {
  return (
    <div
      className={`${bg_color} shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-500`}
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
    </div>
  );
};

export default Card;
