import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Query to fetch favorites
  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email, // only run if email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  // Handle remove from favorites
  const handleRemove = async (donationId) => {
    console.log("clicked");
    try {
      const res = await axiosSecure.delete(
        `/favorites/${donationId}?email=${user.email}`
      );
      if (res.data.deletedCount > 0) {
        Swal.fire(
          "Removed!",
          "The donation has been removed from favorites.",
          "success"
        );
        refetch(); // or manually update state
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">My Saved Donations</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            // favorites.map((fav) => console.log(fav.donation));
            const donation = fav.donation;
            return (
              <div
                key={donation._id}
                className="bg-base-100 shadow-md rounded-xl p-4 flex flex-col"
              >
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl text-accent font-bold">
                  {donation.title}
                </h3>
                <p className="text-sm mt-2 text-accent">
                  <FaMapMarkerAlt className="inline-block mr-1 text-primary" />
                  {donation.restaurant}, {donation.location}
                </p>
                <p className="text-sm mt-1 text-accent">
                  <span className="font-semibold ">Quantity:</span>{" "}
                  {donation.quantity}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-accent">Status:</span>{" "}
                  <span className="badge badge-primary">{donation.status}</span>
                </p>

                <div className="mt-auto flex gap-2 justify-between pt-4">
                  <Link
                    to={`/donations/${donation._id}`}
                    className="btn btn-outline btn-primary"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleRemove(donation._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    <FaTrashAlt className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
