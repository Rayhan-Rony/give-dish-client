import React from "react";
import { Link } from "react-router";
import bannerImage from "../../assets/f.jpg";

const Banner = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <img
        src={bannerImage}
        alt="Food Donation"
        className="w-full h-[80vh] object-cover opacity-50"
      />

      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Join the Movement to <br className="hidden md:block" />
            <span className="text-primary">Reduce Food Waste</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Share surplus meals, support charities, and help build a hunger-free
            world.
          </p>
          <Link to="/donations">
            <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary hover:text-black transition">
              Browse Donations
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
