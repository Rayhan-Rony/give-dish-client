import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const FeatureDonations = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Get all verified donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["verified-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified/status");
      return res.data;
    },
  });

  // Mutation for featuring a donation
  const featureMutation = useMutation({
    mutationFn: async (donation) => {
      try {
        const res = await axiosSecure.post("/featured-donations", donation);
        return res.data;
      } catch (err) {
        if (
          err.response?.status === 400 &&
          err.response?.data?.message === "Already featured"
        ) {
          throw new Error("Already featured");
        } else {
          throw new Error("Something went wrong");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["verified-donations"]);
      Swal.fire("Success!", "Donation has been featured.", "success");
    },
    onError: (error) => {
      if (error.message === "Already featured") {
        Swal.fire("Notice", "This donation is already featured.", "info");
      } else {
        Swal.fire("Error", "Failed to feature the donation.", "error");
      }
    },
  });

  const handleFeature = (donation) => {
    Swal.fire({
      title: "Feature this donation?",
      text: "It will be shown on the homepage.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, feature it!",
    }).then((res) => {
      if (res.isConfirmed) {
        featureMutation.mutate(donation);
      }
    });
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Feature Donations</h2>
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Food Type</th>
            <th>Restaurant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{donation.title}</td>
              <td>{donation.type}</td>
              <td>{donation.restaurant}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleFeature(donation)}
                >
                  Feature
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureDonations;
