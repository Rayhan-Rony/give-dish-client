import React from "react";
import { FaStore, FaEnvelope } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RestaurantProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load restaurant data using React Query
  const { data: restaurant = [], isLoading } = useQuery({
    queryKey: ["restaurant", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch when email is available
  });

  const { name, email, role, photo, created_at } = restaurant;
  if (isLoading || loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="max-w-3xl mx-auto   rounded-2xl shadow-lg p-6 md:p-10 mt-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-md">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
            <FaStore className="text-primary" />
            {name}
          </h2>

          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaEnvelope className="text-blue-400" />
            {email}
          </p>

          <p className="flex items-center justify-center md:justify-start gap-2">
            <MdOutlineVerifiedUser className="text-green-400" />
            Role: <span className="capitalize font-semibold">{role}</span>
          </p>

          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaCalendarAlt className="text-yellow-400" />
            Registered on:{" "}
            <span className="font-medium">
              {/* {format(new Date(created_at), "MMMM dd, yyyy")} */}
              {restaurant?.created_at ? (
                <span className="text-gray-400">
                  {format(new Date(created_at), "PP")}
                </span>
              ) : (
                <span className="text-gray-400">
                  Joining date not available
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
