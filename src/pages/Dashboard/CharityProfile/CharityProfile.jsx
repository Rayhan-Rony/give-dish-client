import React from "react";
import { useQuery } from "@tanstack/react-query";

import { FaUserShield, FaEnvelope } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const CharityProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: charity = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["charityProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (isError || !charity) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load charity profile.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      <div className="flex flex-col items-center text-center">
        <img
          src={charity.photo}
          alt="Charity Logo"
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
        />
        <h2 className="text-2xl font-bold text-accent">{charity.name}</h2>
        <p className="text-gray-600 flex items-center gap-1 mt-1">
          <FaEnvelope /> {charity.email}
        </p>
        <p className="text-sm text-accent mt-1 flex items-center gap-1">
          <FaUserShield /> Role: <span className="font-semibold">Charity</span>
        </p>
        {/* Optional: Add mission or contact info here */}
        <div className="mt-4">
          <p className="text-gray-700 italic">
            “We are committed to reducing food waste and serving those in need.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
