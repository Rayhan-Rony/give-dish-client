import React from "react";
import { FaSeedling, FaUtensils, FaCloudSun } from "react-icons/fa";

const ImpactStats = () => {
  const stats = [
    {
      icon: <FaUtensils className="text-3xl text-green-600" />,
      title: "Meals Saved",
      value: "12,500+",
    },
    {
      icon: <FaSeedling className="text-3xl text-yellow-600" />,
      title: "Food Donated (kg)",
      value: "3,700+ kg",
    },
    {
      icon: <FaCloudSun className="text-3xl text-blue-600" />,
      title: "CO₂ Reduced (kg)",
      value: "9,100+ kg",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 ">🌍 Our Impact</h2>
        <p className="mb-10 text-gray-600">
          Real progress toward reducing food waste and protecting our planet
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-white shadow-md rounded-xl hover:scale-105 transition duration-300"
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
