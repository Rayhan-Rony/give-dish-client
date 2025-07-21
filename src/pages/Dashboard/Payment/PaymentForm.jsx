import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    // payment intent to confirm the payment with amount send to server side
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: parseInt(25 * 100),
    });
    console.log("payment intent res", res);

    // confirm the payment and finish the process with client secret
    const clientSecret = res.data.clientSecret;
    console.log(clientSecret);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName, // You can collect this from your form
        },
      },
    });

    if (result.error) {
      // Show error to your customer
      console.error(result.error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: result.error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
        background: "#1a1a1a", // dark bg to match your theme
        color: "#fff", // white text
      });
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment Successful");

        // save payment info to db
        const paymentInfo = {
          name: user.displayName,
          email: user.email,
          transactionId: result.paymentIntent.id,
          amount: parseInt(25 * 100),
          paymentMethod: result.paymentIntent.payment_method_types,
          paid_At: new Date().toISOString(),
          purpose: "Charity Role Request",
        };
        console.log(paymentInfo);
        const paymentRes = await axiosSecure.post("/payments", paymentInfo);
        console.log(paymentRes);
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Thank you! Your payment was processed successfully.",
          confirmButtonColor: "#22c55e", // Tailwind green-500
          background: "#1a1a1a", // Dark background to match your theme
          color: "#fff", // White text
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-black rounded-xl p-6 shadow-2xl space-y-6 text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-2 text-white ">
        Secure Payment
      </h2>

      {/* Card Input Field */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-gray-300 font-semibold">
            Pay with Card
          </span>
        </label>
        <div className="rounded-xl bg-white p-4 border border-primary shadow-md transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-primary ">
          <CardElement className="" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full text-white font-semibold tracking-wide shadow hover:shadow-lg transition duration-300 hover:bg-secondary hover:text-black"
        disabled={!stripe}
      >
        Pay $25
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
