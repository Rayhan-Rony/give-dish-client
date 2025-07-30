import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: donations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified/post");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage></LoadingPage>;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load donations.</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Verified Food Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{donation.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Restaurant:</strong> {donation.restaurant},{" "}
                {donation.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Charity:</strong>{" "}
                {donation.charityName || "Not Assigned"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {donation.status}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <button
                className="btn btn-sm btn-outline  btn-primary w-full"
                onClick={() => navigate(`/donations/${donation._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
