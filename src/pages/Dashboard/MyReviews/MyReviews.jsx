import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch reviews
  const {
    data: myReviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(myReviews);

  //  Delete mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews", user?.email]);
      Swal.fire("Deleted!", "Your review has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete the review.", "error");
    },
  });

  //  Handle delete click
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReviewMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingPage></LoadingPage>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading reviews</p>
    );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myReviews.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          You haven't posted any reviews yet.
        </p>
      ) : (
        myReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-xl shadow-md p-5 border relative"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {review.donationTitle || "Donation Title"}
            </h2>
            <p className="text-gray-600 mb-1 font-medium">
              Restaurant:{" "}
              <span className="text-gray-800">{review.restaurantName}</span>
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Reviewed on: {new Date(review.review_at).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-3">{review.description}</p>

            <button
              onClick={() => handleDelete(review._id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
              title="Delete review"
            >
              <FaTrash size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
