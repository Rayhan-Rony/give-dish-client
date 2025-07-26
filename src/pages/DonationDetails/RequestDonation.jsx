import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";

const RequestDonation = ({ donation }) => {
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();
  const { user } = useAuth();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { mutate: requestDonation, isPending: isRequesting } = useMutation({
    mutationFn: async (requestData) => {
      const res = await axiosSecure.post("/donation-requests", requestData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Requested!", "Your request has been sent.", "success");
      setIsRequestModalOpen(false);
    },
    onError: () => {
      Swal.fire("Error", "Failed to send request. Try again.", "error");
    },
  });
  return (
    <div>
      {role === "charity" && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="btn btn-outline btn-primary"
          >
            📥 Request Donation
          </button>
        </div>
      )}
      {isRequestModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Request This Donation</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const request = {
                  donationId: donation._id,
                  donationTitle: donation.title,
                  restaurantName: donation.restaurant,
                  charityName: user.displayName,
                  charityEmail: user.email,
                  description: form.description.value,
                  pickupTime: form.pickupTime.value,
                  status: "Pending",
                  requestedAt: new Date().toISOString(),
                };
                try {
                  const res = await axiosSecure.post("/requests", request);
                  if (res.data.insertedId) {
                    Swal.fire(
                      "Requested!",
                      "Your request has been submitted.",
                      "success"
                    );
                    setIsRequestModalOpen(false);
                    form.reset();
                  }
                } catch (err) {
                  console.error(err);
                  Swal.fire("Error", "Failed to submit request.", "error");
                }
              }}
            >
              <input
                type="text"
                defaultValue={donation.title}
                readOnly
                className="input input-bordered w-full mb-3"
              />
              <input
                type="text"
                defaultValue={donation.restaurant}
                readOnly
                className="input input-bordered w-full mb-3"
              />
              <input
                type="text"
                defaultValue={user.displayName}
                readOnly
                className="input input-bordered w-full mb-3"
              />
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                className="input input-bordered w-full mb-3"
              />
              <textarea
                name="description"
                className="textarea textarea-bordered w-full mb-3"
                placeholder="Why are you requesting this donation?"
                required
              ></textarea>
              <input
                type="datetime-local"
                name="pickupTime"
                className="input input-bordered w-full mb-4"
                required
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Submit Request
                </button>
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="btn"
                >
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

export default RequestDonation;
