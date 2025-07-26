import React from "react";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SaveToFavorites = ({ donation }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleSaveToFavorites = async () => {
    try {
      const res = await axiosSecure.post("/favorites", {
        userEmail: user.email,
        donationId: donation,
        savedAt: new Date().toISOString(),
      });
      if (res.data.insertedId) {
        Swal.fire("Saved!", "Donation added to your favorites.", "success");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire(
          "Already Saved",
          "This donation is already in your favorites.",
          "info"
        );
      } else {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };
  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={handleSaveToFavorites}
        className="btn btn-outline btn-primary"
      >
        ❤️ Save to Favorites
      </button>
    </div>
  );
};

export default SaveToFavorites;
