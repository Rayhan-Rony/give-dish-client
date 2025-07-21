import React from "react";
import { useForm } from "react-hook-form";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RequestCharityRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const fixedAmount = 25;

  // Load user's existing role request
  const { data, isLoading } = useQuery({
    queryKey: ["roleRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/roleRequests/check?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
  const onSubmit = (data) => {
    const fullData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      amount: fixedAmount,
    };

    // Redirect to payment page
    navigate("/dashboard/payment", { state: fullData });
  };
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  // If request exists, show message instead of form
  console.log(data?.exists);
  if (data?.exists) {
    return (
      <div className="text-center text-white mt-10">
        <h2 className="text-2xl font-bold text-primary">
          Request Already Exists
        </h2>
        <p className="mt-2">
          You already have a role request that is{" "}
          <span className="font-semibold capitalize">{data.status}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-accent rounded-lg shadow text-white">
      <h2 className="text-3xl font-bold text-center mb-6">
        Request Charity Role
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            defaultValue={user?.displayName}
            readOnly
            className="w-full bg-gray-800 border px-3 py-2 rounded text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            defaultValue={user?.email}
            readOnly
            className="w-full bg-gray-800 border px-3 py-2 rounded text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Organization Name</label>
          <input
            {...register("organization", { required: true })}
            className="w-full bg-gray-900 border px-3 py-2 rounded text-white"
            placeholder="Your Organization"
          />
          {errors.organization && (
            <span className="text-red-500">Organization is required</span>
          )}
        </div>
        <div>
          <label className="block mb-1">Mission Statement</label>
          <textarea
            {...register("mission", { required: true })}
            rows={3}
            className="w-full bg-gray-900 border px-3 py-2 rounded text-white"
            placeholder="Briefly describe your mission"
          />
          {errors.mission && (
            <span className="text-red-500">Mission is required</span>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Payment Amount</label>
          <input
            type="text"
            value={`$${fixedAmount} (fixed)`}
            readOnly
            className="w-full bg-gray-800 border px-3 py-2 rounded text-white font-medium"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary hover:text-black"
          >
            Proceed to Pay & Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestCharityRole;
