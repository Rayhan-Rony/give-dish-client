import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUtensils,
  FaCheckCircle,
} from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // optional, else use axios directly
import { useParams } from "react-router";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const DonationDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure(); // or just use axios
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

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

  const handleSaveToFavorites = async () => {
    try {
      const res = await axiosSecure.post("/favorites", {
        userEmail: user.email,
        donationId: donation._id,
        savedAt: new Date().toISOString(),
      });
      if (res.data.insertedId) {
        Swal.fire("Saved!", "Donation added to your favorites.", "success");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire(
          "Already Saved",
          "This donation is already in your favorites.",
          "info"
        );
      } else {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  // save the reviews
  const onSubmit = async (data) => {
    const review = {
      ...data,
      donationId: donation._id,
      review_at: new Date().toISOString(),
    };
    console.log(review);

    try {
      const reviewRes = await axiosSecure.post("/reviews", review);
      setIsModalOpen(false);
      reset();
      console.log(reviewRes);
      if (reviewRes.data.insertedId) {
        refetchReviews();
        Swal.fire({
          title: "Review Added!",
          text: "Thank you for your feedback.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
      // ❌ SweetAlert2 on error
      Swal.fire({
        title: "Error",
        text: "Failed to submit review. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

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
                {donation.restaurantName}, {donation.location}
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Add Review
          </button>
        </div>
        {/* Save to Favorites Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveToFavorites}
            className="btn btn-outline btn-primary"
          >
            ❤️ Save to Favorites
          </button>
        </div>
      </div>

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Your Review</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("username", { required: true })}
                defaultValue={user.displayName}
                readOnly
                className="input input-bordered w-full mb-3"
                placeholder="Your Name"
              />
              <input
                {...register("email", { required: true })}
                readOnly
                defaultValue={user.email}
                className="input input-bordered w-full mb-3"
                placeholder="Email"
              />
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full mb-3"
                placeholder="Write your review..."
              ></textarea>
              <select
                {...register("rating", { required: true })}
                className="select select-bordered w-full mb-4"
              >
                <option value="">Rating</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button onClick={() => setIsModalOpen(false)} className="btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DonationDetails;
