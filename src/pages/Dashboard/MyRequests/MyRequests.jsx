import React from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all requests made by the current user
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/user/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel Mutation (DELETE)
  const cancelRequestMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myRequests"]);
      Swal.fire("Cancelled!", "Your request has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong.", "error");
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      cancelRequestMutation.mutate(id);
    }
  };
  console.log(requests);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Requests</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-xl p-4 shadow bg-base-100"
            >
              <h3 className="text-lg font-bold mb-1 text-accent">
                {req.donationTitle}
              </h3>
              <p className="text-sm mb-1 text-accent">
                <span className="font-semibold ">Restaurant:</span>{" "}
                {req.restaurantName}
              </p>
              <p className="text-sm mb-1 text-accent">
                <span className="font-semibold ">Food Type:</span>{" "}
                {req.foodType}
              </p>
              <p className="text-sm mb-1 text-accent">
                <span className="font-semibold ">Quantity:</span> {req.quantity}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold text-accent ">Status:</span>{" "}
                <span
                  className={`badge ${
                    req.status === "Accepted"
                      ? "badge-success"
                      : req.status === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {req.status}
                </span>
              </p>
              <div className="flex justify-end">
                {req.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
