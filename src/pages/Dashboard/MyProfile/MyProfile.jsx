import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { format } from "date-fns";
import { FaEnvelope, FaUserTag, FaCalendar } from "react-icons/fa";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["myProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-black text-white rounded-lg shadow-lg border border-gray-700">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={userData.photo}
          alt={userData.name}
          className="w-32 h-32 rounded-full border-4 border-primary object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="flex items-center gap-2 mt-2">
            <FaEnvelope className="text-primary" /> {userData.email}
          </p>
          {userData.role !== "user" && (
            <p className="flex items-center gap-2 mt-2">
              <FaUserTag className="text-primary" /> Role:{" "}
              <span className="capitalize">{userData.role}</span>
            </p>
          )}
          <p className="flex items-center gap-2 mt-2">
            <FaCalendar className="text-primary" /> Joined:{" "}
            {userData?.created_at ? (
              <span>
                {format(new Date(userData.created_at), "dd MMM yyyy")}
              </span>
            ) : (
              <span>Date Not Found</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
