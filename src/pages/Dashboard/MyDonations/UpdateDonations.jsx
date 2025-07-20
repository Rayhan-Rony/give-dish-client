import React from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const UpdateDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: donation = [],
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
  const onSubmit = async (data) => {
    console.log("add donation", data);
    try {
      // Handle image upload
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgUploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imagebb_key
        }`,
        formData
      );
      const imageUrl = imgUploadRes.data.data.url;

      const donation = {
        title: data.title,
        type: data.foodType,
        quantity: data.quantity,
        pickupTimeWindow: data.pickupWindow,
        restaurant: user.displayName,
        email: user.email,
        location: data.location,
        instructions: data.pickupInstructions,
        image: imageUrl,
        status: "Pending",
        created_at: new Date().toISOString(),
        description: data.description,
      };

      const donationRes = await axiosSecure.post("/donations", donation); // Assuming your backend POST route
      //   console.log(donationRes.data.insertedId);
      if (donationRes.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Donation Added!",
          text: "Your donation has been successfully posted.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Great!",
        });
      }

      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the donation!",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Update Surplus Food Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="font-semibold">Donation Title*</label>
          <input
            {...register("title", { required: true })}
            className="input input-bordered w-full text-accent"
            defaultValue={donation.title}
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>

        {/* Food Type */}
        <div>
          <label className="font-semibold">Food Type*</label>
          <input
            {...register("foodType", { required: true })}
            className="input input-bordered w-full text-accent"
            defaultValue={donation.type}
          />

          {errors.foodType && (
            <span className="text-red-500">Food type is required</span>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">Quantity (kg or portions)*</label>
          <input
            type="text"
            {...register("quantity", { required: true })}
            className="input input-bordered w-full text-accent"
            defaultValue={donation.quantity}
          />
          {errors.quantity && (
            <span className="text-red-500">Quantity is required</span>
          )}
        </div>

        {/* Pickup Time Window */}
        <div>
          <label className="font-semibold">Pickup Time Window*</label>
          <input
            type="text"
            {...register("pickupWindow", { required: true })}
            className="input input-bordered w-full text-accent"
            defaultValue={donation.pickupTimeWindow}
          />
          {errors.pickupWindow && (
            <span className="text-red-500">Pick up window is required</span>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Restaurant Name</label>
            <input
              className="input input-bordered w-full text-accent"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">Restaurant Email</label>
            <input
              className="input input-bordered w-full text-accent"
              defaultValue={user?.email}
              readOnly
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location / Address*</label>
          <input
            {...register("location", { required: true })}
            className="input input-bordered w-full text-accent"
            defaultValue={donation.location}
          />
          {errors.location && (
            <span className="text-red-500">Location is required</span>
          )}
        </div>

        {/* Pickup Instructions */}
        <div>
          <label className="font-semibold">Pickup Instructions*</label>
          <textarea
            {...register("pickupInstructions", { required: true })}
            className="textarea textarea-bordered w-full text-accent"
            rows="3"
            defaultValue={donation.instructions}
          ></textarea>
          {errors.pickupInstructions && (
            <span className="text-red-500">
              Pick up instructions is required
            </span>
          )}
        </div>
        {/* Add Description */}
        <div>
          <label className="font-semibold">Description*</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full text-accent"
            rows="3"
            defaultValue={donation.description}
          ></textarea>
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="font-semibold">Upload Image*</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full text-accent"
          />
        </div>

        <button className="btn btn-primary w-full">Add Donation</button>
      </form>
    </div>
  );
};

export default UpdateDonations;
