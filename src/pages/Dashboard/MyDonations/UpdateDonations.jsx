import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import Swal from "sweetalert2";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const UpdateDonation = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const { data: donation, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const onSubmit = async (data) => {
    try {
      let imageUrl = donation.image;

      // Handle image upload if a new one is provided
      if (data.image?.[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imagebb_key
          }`,
          formData
        );

        imageUrl = imgRes.data.data.url;
      }

      const updatedDonation = {
        title: data.title,
        type: data.foodType,
        quantity: data.quantity,
        pickupTimeWindow: data.pickupWindow,
        location: data.location,
        instructions: data.pickupInstructions,
        image: imageUrl,
        description: data.description,
        updated_at: new Date(),
      };

      const res = await axiosSecure.patch(`/donations/${id}`, updatedDonation);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Donation successfully updated", "success");
      } else {
        Swal.fire("No Changes", "No updates were made.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update donation", "error");
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-accent">
        Update Surplus Food Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-accent">
        {/* Title */}
        <div>
          <label className="font-semibold">Donation Title*</label>
          <input
            {...register("title", { required: true })}
            defaultValue={donation.title}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Food Type */}
        <div>
          <label className="font-semibold">Food Type*</label>
          <input
            {...register("foodType", { required: true })}
            defaultValue={donation.type}
            className="input input-bordered w-full"
          />
          {errors.foodType && (
            <p className="text-red-500">Food type required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">Quantity (kg or portions)*</label>
          <input
            type="text"
            {...register("quantity", { required: true })}
            defaultValue={donation.quantity}
            className="input input-bordered w-full"
          />
          {errors.quantity && <p className="text-red-500">Quantity required</p>}
        </div>

        {/* Pickup Window */}
        <div>
          <label className="font-semibold">Pickup Time Window*</label>
          <input
            {...register("pickupWindow", { required: true })}
            defaultValue={donation.pickupTimeWindow}
            className="input input-bordered w-full"
          />
          {errors.pickupWindow && <p className="text-red-500">Required</p>}
        </div>

        {/* Restaurant Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Restaurant Name</label>
            <input
              className="input input-bordered w-full"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>
          <div>
            <label className="font-semibold">Restaurant Email</label>
            <input
              className="input input-bordered w-full"
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
            defaultValue={donation.location}
            className="input input-bordered w-full"
          />
          {errors.location && <p className="text-red-500">Location required</p>}
        </div>

        {/* Instructions */}
        <div>
          <label className="font-semibold">Pickup Instructions*</label>
          <textarea
            {...register("pickupInstructions", { required: true })}
            defaultValue={donation.instructions}
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
          {errors.pickupInstructions && (
            <p className="text-red-500">Instructions required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description*</label>
          <textarea
            {...register("description", { required: true })}
            defaultValue={donation.description}
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
          {errors.description && <p className="text-red-500">Required</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Upload Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">Update Donation</button>
      </form>
    </div>
  );
};

export default UpdateDonation;
