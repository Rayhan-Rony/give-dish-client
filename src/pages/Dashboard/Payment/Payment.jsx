import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
// console.log(stripePromise);

const Payment = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default Payment;
