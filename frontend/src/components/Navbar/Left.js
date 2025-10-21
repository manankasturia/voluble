import React from "react";
import iconSrc from "../../assets/voluble_icon.png";

const Left = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <img src={iconSrc} alt="Voluble Icon" className="w-8 h-8" />
        <h3 className="text-xl font-bold">Voluble</h3>
      </div>
    </>
  );
};

export default Left;
