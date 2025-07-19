import React from "react";
import logo from "../../assets/logoDonation.png";
import { Link } from "react-router";

const GiveDishLogo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-4">
        <div className="h-20 w-20">
          <img className="w-full h-full" src={logo} alt="" />
        </div>
        <h3 className="text-secondary md:text-4xl text-3xl font-bold">
          Give Dish
        </h3>
      </div>
    </Link>
  );
};

export default GiveDishLogo;
