import React from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const AddDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        status: "Available",
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
        Add Surplus Food Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="font-semibold">Donation Title*</label>
          <input
            {...register("title", { required: true })}
            className="input input-bordered w-full text-accent"
            placeholder="e.g. Surplus Pastries"
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
            placeholder="e.g. bakery,produce"
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
            placeholder="e.g. 5 kg or 10 portions"
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
            placeholder="e.g. 3PM - 5PM"
          />
          {errors.pickupWindow && (
            <span className="text-red-500">Pick up Window is required</span>
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
            placeholder="e.g. 123 Main Street, Dhaka"
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
            placeholder="e.g. Ask for manager, pickup from back door"
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
            placeholder="e.g. Seasonal fruits and vegetables from today's stock."
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

export default AddDonation;
