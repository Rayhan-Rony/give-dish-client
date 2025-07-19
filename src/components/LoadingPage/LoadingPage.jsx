import React from "react";
import GiveDishLogo from "../../assets/logoDonation.png"; // Adjust path as needed

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100">
      {/* Spinning Circle with Logo inside */}
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary animate-spin"></div>
        <div className="absolute inset-4 flex items-center justify-center bg-white rounded-full shadow-md">
          <img className="w-16 h-16" src={GiveDishLogo} alt="Give Dish Logo" />
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl font-bold text-gray-700 mt-6">
        Loading GiveDish...
      </h2>
      <p className="text-gray-500 mt-2">
        Rescuing food and serving kindness 💙
      </p>
    </div>
  );
};

export default LoadingPage;
