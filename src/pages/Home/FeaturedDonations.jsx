import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations", "featured"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/featured?limit=8");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-11/12 mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🍱 Featured Donations
        </h2>
        {/* card container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donations.map((item) => (
            <div
              key={item._id}
              className="card bg-white shadow-md hover:shadow-xl transition rounded-xl"
            >
              <figure>
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-lg font-semibold">{item.type}</h3>
                <p className="text-sm text-gray-600">{item.restaurant}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="badge badge-secondary text-black">
                    {item.status}
                  </span>
                  <Link to={`/donations/${item._id}`}>
                    <button className="btn btn-sm btn-outline btn-primary">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonations;
