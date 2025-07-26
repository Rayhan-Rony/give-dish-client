import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const AddReview = ({ donation: id, refetchReviews }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const review = {
      ...data,
      donationId: id,
      review_at: new Date().toISOString(),
    };
    console.log(review);

    try {
      const reviewRes = await axiosSecure.post("/reviews", review);
      setIsModalOpen(false);
      reset();
      console.log(reviewRes);
      if (reviewRes.data.insertedId) {
        refetchReviews();
        Swal.fire({
          title: "Review Added!",
          text: "Thank you for your feedback.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
      // ❌ SweetAlert2 on error
      Swal.fire({
        title: "Error",
        text: "Failed to submit review. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
        Add Review
      </button>
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Your Review</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("username", { required: true })}
                defaultValue={user.displayName}
                readOnly
                className="input input-bordered w-full mb-3"
                placeholder="Your Name"
              />
              <input
                {...register("email", { required: true })}
                readOnly
                defaultValue={user.email}
                className="input input-bordered w-full mb-3"
                placeholder="Email"
              />
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full mb-3"
                placeholder="Write your review..."
              ></textarea>
              <select
                {...register("rating", { required: true })}
                className="select select-bordered w-full mb-4"
              >
                <option value="">Rating</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button onClick={() => setIsModalOpen(false)} className="btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AddReview;
