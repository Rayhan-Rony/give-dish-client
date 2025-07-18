import React from "react";
import logo from "../../assets/logoDonation.png";

const GiveDishLogo = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-20 w-20">
        <img className="w-full h-full" src={logo} alt="" />
      </div>
      <h3 className="text-secondary text-4xl font-bold">Give Dish</h3>
    </div>
  );
};

export default GiveDishLogo;
