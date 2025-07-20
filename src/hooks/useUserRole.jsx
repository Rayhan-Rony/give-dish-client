import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user } = useAuth(); // Get the logged-in user
  const axiosSecure = useAxiosSecure(); // Authenticated axios instance

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch if email exists
  });

  return {
    role: data?.role,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useUserRole;
