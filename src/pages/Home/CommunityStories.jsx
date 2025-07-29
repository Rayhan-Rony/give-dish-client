import React from "react";

const stories = [
  {
    name: "Green Bites Restaurant",
    story:
      "We've been able to donate 200+ meals a month through Give Dish. It's rewarding to see the food we cook reach those in need.",
  },
  {
    name: "Helping Hands Charity",
    story:
      "Thanks to Give Dish, we've expanded our food program and now serve 3x more families than before!",
  },
];

const CommunityStories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 ">💬 Community Stories</h2>
        <p className="mb-10 text-gray-600">
          Real voices from our amazing restaurants and charities
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="bg-orange-50 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic mb-4">“{item.story}”</p>
              <h4 className="font-semibold text-orange-700">— {item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
