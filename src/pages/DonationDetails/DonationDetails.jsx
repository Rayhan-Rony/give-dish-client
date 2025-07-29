import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUtensils,
  FaCheckCircle,
} from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // optional, else use axios directly
import { useParams } from "react-router";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useUserRole from "../../hooks/useUserRole";
import SaveToFavorites from "./SaveToFavorites";
import AddReview from "./AddReview";
import RequestDonation from "./RequestDonation";

const DonationDetails = () => {
  const { role } = useUserRole();
  console.log(role);
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure(); // or just use axios

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  // load donation with id
  const {
    data: donation = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id, // ensures query runs only when ID exists
  });
  // console.log(donation);

  //   load reviews
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const revRes = await axiosSecure.get(`/reviews?donationId=${id}`);
      return revRes.data;
    },
    enabled: !!id,
  });
  const { data: myRequest, isLoading: myRequestLoading } = useQuery({
    queryKey: ["myRequest", id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/single?donationId=${id}&email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!id && !!user?.email,
  });

  // pickup
  const { mutate: confirmPickup, isPending: isConfirming } = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosSecure.patch(`/donation-requests/${requestId}`, {
        status: "Picked Up",
        pickedUpAt: new Date().toISOString(),
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Donation marked as Picked Up!", "success");
      queryClient.invalidateQueries(["myRequest"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status. Try again.", "error");
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading donation data.
      </p>
    );
  }

  // save favourites post

  // save the reviews

  // Request Donation

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl  mx-auto p-6 bg-base-100 shadow-lg rounded-xl my-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-[300px] object-cover rounded-xl"
          />

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4">{donation.title}</h2>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-lg">
                <FaUtensils className="text-primary" />
                <span className="font-semibold">Food Type:</span>{" "}
                {donation.type}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Description:</span>{" "}
                {donation.description}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Quantity:</span>{" "}
                {donation.quantity}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Pickup Instructions:</span>{" "}
                {donation.instructions}
              </p>

              <p className="flex items-center gap-2 text-lg">
                <FaMapMarkerAlt className="text-primary" />
                <span className="font-semibold">Restaurant:</span>{" "}
                {donation.restaurant}, {donation.location}
              </p>

              <p className="flex items-center gap-2 text-lg">
                <FaClock className="text-primary" />
                <span className="font-semibold">Pickup Time:</span>{" "}
                {donation.pickupTimeWindow}
              </p>

              <p className="flex items-center gap-2 text-lg">
                <FaCheckCircle className="text-primary" />
                <span className="font-semibold">Status:</span>{" "}
                <span className={`badge badge-primary font-semibold `}>
                  {donation.status}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 mt-8">
          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

            {/* List of Reviews */}
            {reviews?.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-100 p-4 rounded shadow mb-3"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold">{review.username}</h4>
                    <span className="text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          {/* Add Review Button */}
          <AddReview
            donation={donation._id}
            refetchReviews={refetchReviews}
          ></AddReview>
        </div>
        {/* Save to Favorites Button */}
        <SaveToFavorites donation={donation._id}></SaveToFavorites>

        {/* Request donation btn  */}
        <RequestDonation donation={donation}></RequestDonation>
        {role === "charity" && myRequest?.status === "Accepted" && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => confirmPickup(myRequest._id)}
              className="btn btn-success btn-sm"
              disabled={isConfirming}
            >
              {isConfirming ? "Confirming..." : "Confirm Pickup"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;
