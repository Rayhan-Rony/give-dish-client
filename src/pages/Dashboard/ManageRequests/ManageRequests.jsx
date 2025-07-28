import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const ManageRequests = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  // Fetch all charity requests
  const { data: donationRequests = [], isLoading } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donation-requests?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-requests"]);
      Swal.fire("Deleted!", "Request has been removed.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the request from the database!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Charity Requests</h2>
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Donation Title</th>
            <th>Charity Name</th>
            <th>Charity Email</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donationRequests.map((req, index) => (
            <tr key={req._id}>
              <td>{index + 1}</td>
              <td>{req.donationTitle || "N/A"}</td>
              <td>{req.charityName}</td>
              <td>{req.charityEmail}</td>
              <td>{req.description || "No description"}</td>
              <td>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(req._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
