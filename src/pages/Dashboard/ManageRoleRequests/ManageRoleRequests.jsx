import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRoleRequests = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch role requests
  const { data: roleRequests = [], isLoading } = useQuery({
    queryKey: ["role-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  // Approve request: assign "charity" role and update status
  const approveMutation = useMutation({
    mutationFn: async (request) => {
      const { userEmail, requestId } = request;
      //   console.log(userId, requestId);

      // 1. Update role in users collection
      await axiosSecure.patch(`/users?email=${userEmail}`, { role: "charity" });

      // 2. Update status in roleRequests collection
      await axiosSecure.patch(`/role-requests/${requestId}`, {
        status: "Approved",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["role-requests"]);
      Swal.fire("Approved!", "Role assigned successfully.", "success");
    },
  });

  // Reject request: update status only
  const rejectMutation = useMutation({
    mutationFn: async (requestId) => {
      await axiosSecure.patch(`/role-requests/${requestId}`, {
        status: "Rejected",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["role-requests"]);
      Swal.fire("Rejected", "The request has been rejected.", "info");
    },
  });

  const handleApprove = (req) => {
    Swal.fire({
      title: "Approve this request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    }).then((res) => {
      if (res.isConfirmed) {
        approveMutation.mutate({
          userEmail: req.email,
          requestId: req._id,
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
    }).then((res) => {
      if (res.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading role requests...</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Role Requests</h2>
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Mission</th>
            <th>Txn ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roleRequests.map((req, idx) => (
            <tr key={req._id}>
              <td>{idx + 1}</td>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.organization}</td>
              <td>{req.mission}</td>
              <td>{req.transactionId}</td>
              <td>
                <span
                  className={`badge ${
                    req.status === "Approved"
                      ? "badge-success"
                      : req.status === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="space-x-1">
                {req.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(req)}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="btn btn-xs btn-error"
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
  );
};

export default ManageRoleRequests;
