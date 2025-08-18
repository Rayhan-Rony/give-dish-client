import React from "react";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const DashboardOverview = () => {
  const { user } = useAuth();

  const { role, isLoading } = useUserRole();
  console.log(role);

  // Dummy stats (replace with API data later)
  const stats = {
    admin: [
      { label: "Total Users", value: "1,024" },
      { label: "Pending Requests", value: "47" },
      { label: "Approved Donations", value: "580" },
      { label: "Transactions", value: "$12,340" },
    ],
    charity: [
      { label: "Requested Donations", value: "18" },
      { label: "Approved Pickups", value: "12" },
      { label: "Completed Pickups", value: "36" },
      { label: "Pending Requests", value: "6" },
    ],
    restaurant: [
      { label: "My Donations", value: "42" },
      { label: "Verified Donations", value: "35" },
      { label: "Requests from Charities", value: "19" },
      { label: "Pending Approvals", value: "7" },
    ],
    user: [
      { label: "Saved Donations", value: "14" },
      { label: "Available Donations", value: "220" },
      { label: "Nearby Restaurants", value: "38" },
      { label: "Requests Sent", value: "4" },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats[role]?.map((stat, i) => (
          <div
            key={i}
            className="bg-white border shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Role-Specific Overview Cards */}
      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Manage Users</h3>
            <p className="mt-2 text-sm opacity-90">
              Approve charities, assign roles, and manage accounts.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Manage Donations</h3>
            <p className="mt-2 text-sm opacity-90">
              Review and approve food donations from restaurants.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Transactions</h3>
            <p className="mt-2 text-sm opacity-90">
              Track payments and charity approval fees.
            </p>
          </div>
        </div>
      )}

      {role === "charity" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Requested Donations</h3>
            <p className="mt-2 text-sm opacity-90">
              Track donations you’ve requested from restaurants.
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Pickup Schedule</h3>
            <p className="mt-2 text-sm opacity-90">
              View assigned pickup times and locations.
            </p>
          </div>
        </div>
      )}

      {role === "restaurant" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">My Donations</h3>
            <p className="mt-2 text-sm opacity-90">
              Add, update, and track your food donations.
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Donation Status</h3>
            <p className="mt-2 text-sm opacity-90">
              Monitor charity requests and approvals for your donations.
            </p>
          </div>
        </div>
      )}

      {role === "user" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Browse Donations</h3>
            <p className="mt-2 text-sm opacity-90">
              Explore food donations shared by local restaurants.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold">Saved Items</h3>
            <p className="mt-2 text-sm opacity-90">
              View and manage donations you’ve saved for later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
