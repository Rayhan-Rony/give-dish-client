import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const ManageDonations = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch all donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["all-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  // Mutation to update verification vStatus
  const updatevStatusMutation = useMutation({
    mutationFn: async ({ id, vStatus }) => {
      const res = await axiosSecure.patch(`/donations/${id}`, { vStatus });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donations"]);
    },
  });

  const handleUpdate = (id, vStatus) => {
    Swal.fire({
      title: `Are you sure you want to mark this as ${vStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${vStatus}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updatevStatusMutation.mutate({ id, vStatus });
      }
    });
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Donations</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-base font-medium">
            <th>#</th>
            <th>Title</th>
            <th>Food Type</th>
            <th>Restaurant</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>vStatus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id}>
              <td>{index + 1}</td>
              <td>{donation.title}</td>
              <td>{donation.type}</td>
              <td>{donation.restaurant}</td>
              <td>{donation.restaurantEmail}</td>
              <td>{donation.quantity}</td>
              <td>
                <span
                  className={`badge ${
                    donation.vStatus === "Verified"
                      ? "badge-success"
                      : donation.vStatus === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {donation.vStatus || "Pending"}
                </span>
              </td>
              <td className="space-x-2">
                {donation.vStatus === "Pending" && (
                  <>
                    <button
                      onClick={() => handleUpdate(donation._id, "Verified")}
                      className="btn btn-xs btn-success"
                    >
                      <FaCheckCircle className="mr-1" /> Verify
                    </button>
                    <button
                      onClick={() => handleUpdate(donation._id, "Rejected")}
                      className="btn btn-xs btn-error"
                    >
                      <FaTimesCircle className="mr-1" /> Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDonations;
