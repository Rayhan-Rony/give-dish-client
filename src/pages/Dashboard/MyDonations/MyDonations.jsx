// src/pages/Dashboard/MyDonations.jsx
import React from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import { Link } from "react-router";

const MyDonations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["my-donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myDonations?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/donations/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your donation has been removed.", "success");
        queryClient.invalidateQueries(["my-donations"]);
      }
    }
  };

  if (isLoading || loading) return <LoadingPage></LoadingPage>;

  return (
    <div className="px-4 md:px-10 py-8">
      {/* No donation history message */}
      {donations.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            No donation history found
          </h2>
          <Link
            to="/dashboard/addDonation"
            className="inline-block bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Add Your First Donation
          </Link>
        </div>
      )}

      {/* Donation Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-xl shadow-md p-4 space-y-2 text-black"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold">{donation.title}</h3>
            <p>
              <strong>Type:</strong> {donation.type}
            </p>
            <p>
              <strong>Quantity:</strong> {donation.quantity}
            </p>
            <p>
              <strong>Restaurant:</strong> {donation.restaurant}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  donation.status === "Verified"
                    ? "text-green-600"
                    : donation.status === "Rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {donation.status}
              </span>
            </p>
            <div className="flex justify-between mt-2">
              {donation.status !== "Rejected" && (
                <Link
                  to={`/dashboard/updateDonation/${donation._id}`}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <FaEdit /> Update
                </Link>
              )}
              <button
                onClick={() => handleDelete(donation._id)}
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonations;
