import React from "react";
import { Link } from "react-router-dom";
import iconSrc from "../../assets/voluble_icon.png";

const Left = () => {
  return (
    <>
      <Link to="/">
        <div className="flex items-center gap-3">
          <img src={iconSrc} alt="Voluble Icon" className="w-8 h-8" />
          <h3 className="text-xl font-bold">Voluble</h3>
        </div>
      </Link>
    </>
  );
};

export default Left;
