import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(""); // 🔹 Sort key

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

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load donations.</div>
    );

  // 🔹 Filter by location (search)
  const filteredDonations = donations.filter((donation) =>
    donation.location?.toLowerCase().includes(searchText.toLowerCase())
  );

  // 🔹 Sort filtered donations
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortBy === "quantity") {
      const qA = parseFloat(a.quantity);
      const qB = parseFloat(b.quantity);
      return qB - qA;
    } else if (sortBy === "pickupTimeWindow") {
      // Assume format like "2 PM - 5 PM", sort by starting hour
      const parseHour = (str) => {
        const match = str?.match(/(\d+)\s?(AM|PM)/i);
        if (!match) return 0;
        let hour = parseInt(match[1]);
        const meridiem = match[2].toUpperCase();
        if (meridiem === "PM" && hour !== 12) hour += 12;
        if (meridiem === "AM" && hour === 12) hour = 0;
        return hour;
      };
      return parseHour(a.pickupTimeWindow) - parseHour(b.pickupTimeWindow);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Verified Food Donations</h2>

      {/* 🔹 Search and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by city or zip..."
          className="input input-bordered w-full max-w-xs"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="select select-bordered w-full max-w-xs"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="quantity">Quantity (High to Low)</option>
          <option value="pickupTimeWindow">Pickup Time (Earliest First)</option>
        </select>
      </div>

      {/* Donation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDonations.map((donation) => (
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
                className="btn btn-sm btn-outline btn-primary w-full"
                onClick={() => navigate(`/donations/${donation._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {sortedDonations.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No donations found for "{searchText}"
          </p>
        )}
      </div>
    </div>
  );
};

export default AllDonations;
