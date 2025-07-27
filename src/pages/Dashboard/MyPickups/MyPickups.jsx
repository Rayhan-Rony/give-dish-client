import React from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyPickups = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch accepted requests assigned to the charity
  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ["myPickups", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/charity/${user?.email}`
      );
      return res.data.filter(
        (req) => req.status === "Accepted" || req.status === "Picked Up"
      );
    },
    enabled: !!user?.email,
  });

  // Mutation to confirm pickup
  const confirmPickupMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donation-requests/${id}`, {
        status: "Picked Up",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPickups"]);
      Swal.fire("Success!", "Pickup confirmed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Could not confirm pickup.", "error");
    },
  });

  const handleConfirmPickup = (id) => {
    Swal.fire({
      title: "Confirm Pickup?",
      text: "Mark this donation as picked up?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmPickupMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Pickups</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : pickups.length === 0 ? (
        <p>No assigned pickups.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-accent">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="bg-base-100 border rounded-xl p-4 shadow"
            >
              <h3 className="text-lg font-bold mb-1">{pickup.donationTitle}</h3>
              <p>
                <span className="font-semibold">Restaurant:</span>{" "}
                {pickup.restaurantName} ,{pickup.location}
              </p>
              <p>
                <span className="font-semibold">Food Type:</span>{" "}
                {pickup.foodType}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {pickup.quantity}
              </p>
              <p>
                <span className="font-semibold">Pickup Time:</span>{" "}
                {new Date(pickup.pickupTime).toLocaleString()}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`badge ${
                    pickup.status === "Picked Up"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {pickup.status === "Accepted" ? "Assigned" : pickup.status}
                </span>
              </p>
              {pickup.status === "Accepted" && (
                <button
                  onClick={() => handleConfirmPickup(pickup._id)}
                  className="btn btn-sm btn-primary"
                >
                  Confirm Pickup
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
