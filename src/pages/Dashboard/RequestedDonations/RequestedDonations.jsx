import React from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  console.log(user?.email);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requestedDonations"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/restaurant?email=${user?.email}`
      );
      return res.data;
    },
  });

  const updateRequestMutation = useMutation({
    mutationFn: async ({ id, status, donationId }) => {
      return await axiosSecure.patch(`/donation-requests/status/${id}`, {
        status,
        donationId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requestedDonations"]);
      Swal.fire("Success", "Request updated successfully.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Could not update request.", "error");
    },
  });

  const handleUpdateStatus = (id, status, donationId) => {
    const action = status === "Accepted" ? "Accept" : "Reject";
    Swal.fire({
      title: `${action} Request?`,
      text: `Are you sure you want to ${action.toLowerCase()} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequestMutation.mutate({ id, status, donationId });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Requested Donations</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-primary font-bold">
                <th>Donation Title</th>
                <th>Food Type</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th>Pickup Time</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.donationTitle}</td>
                  <td>{req.foodType}</td>
                  <td>{req.charityName}</td>
                  <td>{req.charityEmail}</td>
                  <td>{req.description}</td>
                  <td>{new Date(req.pickupTime).toLocaleString()}</td>
                  <td>
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
                  </td>
                  <td className="space-x-2 text-center">
                    {req.status === "Pending" && (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() =>
                            handleUpdateStatus(
                              req._id,
                              "Accepted",
                              req.donationId
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() =>
                            handleUpdateStatus(
                              req._id,
                              "Rejected",
                              req.donationId
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedDonations;
