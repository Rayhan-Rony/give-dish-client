import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ReceivedDonations = () => {
  const [rating, setRating] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [reviewText, setReviewText] = useState("");

  // Get all "Picked Up" donations for the current charity
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["receivedDonations"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/picked-up?email=${user?.email}`
      );
      return res.data;
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      setSelectedDonation(null);
      setReviewText("");
      Swal.fire("Success", "Review submitted!", "success");
      queryClient.invalidateQueries(["receivedDonations"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit review.", "error");
    },
  });

  const handleSubmitReview = () => {
    if (!reviewText.trim() || rating === "") {
      return Swal.fire(
        "Warning",
        "Please enter both review and rating.",
        "warning"
      );
    }

    reviewMutation.mutate({
      donationId: selectedDonation.donationId,
      username: user.displayName,
      email: selectedDonation.charityEmail,
      description: reviewText,
      review_at: new Date(),
      rating,
    });
    // Reset state after submission (optional)
    setReviewText("");
    setRating("");
    setSelectedDonation(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Received Donations</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : donations.length === 0 ? (
        <p>No donations picked up yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border p-4 rounded shadow space-y-2"
            >
              <h3 className="text-lg font-bold">{donation.donationTitle}</h3>
              <p>
                <strong>Restaurant:</strong> {donation.restaurantName}
              </p>
              <p>
                <strong>Food Type:</strong> {donation.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <p>
                <strong>Pickup Date:</strong>{" "}
                {new Date(donation.pickupTime).toLocaleString()}
              </p>

              <button
                className="btn btn-sm btn-primary"
                onClick={() => setSelectedDonation(donation)}
              >
                Review
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedDonation && (
        <dialog id="review_modal" open className="modal text-accent">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              Review for {selectedDonation.donationTitle}
            </h3>

            {/* Rating input */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Rating:</label>
              <div className="rating">
                {["1", "2", "3", "4", "5"].map((num) => (
                  <input
                    key={num}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    checked={rating === num}
                    onChange={() => setRating(num)}
                    required
                  />
                ))}
              </div>
            </div>

            {/* Review text */}
            <textarea
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <div className="modal-action">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleSubmitReview}
              >
                Submit
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  setSelectedDonation(null);
                  setReviewText("");
                  setRating(0);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ReceivedDonations;
