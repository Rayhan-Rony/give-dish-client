import React from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = useAuth(); // get admin info from context
  const axiosSecure = useAxiosSecure();

  const {
    data: admin = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const lastLogin =
    user?.metadata?.lastSignInTime || new Date().toLocaleString();
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (isError || !admin) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load Admin profile.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col items-center gap-4">
        <img
          src={admin.photo}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{admin.name}</h2>
        <p className="text-base text-gray-600">
          <span className="font-medium">Role:</span> {admin.role}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Last Login:</span> {lastLogin}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
