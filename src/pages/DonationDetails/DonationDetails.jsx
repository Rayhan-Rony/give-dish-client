import React from "react";
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

const DonationDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure(); // or just use axios

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
    </div>
  );
};

export default DonationDetails;
