import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import Lottie from "lottie-react";
import registerAnim from "../../assets/lottieRegister.json";
import GiveDishLogo from "../../components/GiveDishLogo/GiveDishLogo";
import { Link } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
    // TODO: implement actual registration logic
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col-reverse md:flex-row items-center justify-center">
      {/* Left - Register Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16">
        <div className="max-w-md mx-auto">
          <div className=" flex justify-center mb-6">
            <GiveDishLogo />
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label text-white">Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full pl-10 text-black"
                  {...register("name", { required: "Name is required" })}
                />
                <FaUser className="absolute top-3 left-3 text-gray-500" />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label text-white">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 text-black"
                  {...register("email", { required: "Email is required" })}
                />
                <FaEnvelope className="absolute top-3 left-3 text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10 text-black"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <FaLock className="absolute top-3 left-3 text-gray-500" />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label text-white">Confirm Password</label>
              <div className="relative">
                <input
                  type={confirmShowPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="input input-bordered w-full pl-10 text-black"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <FaLock className="absolute top-3 left-3 text-gray-500" />
                <span
                  onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>
          <div className="divider">or</div>
          <SocialLogin></SocialLogin>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Lottie Animation */}
      <div className="w-full md:w-1/2 flex items-center justify-center md:p-8">
        <Lottie
          animationData={registerAnim}
          loop
          autoplay
          className="w-full "
        />
      </div>
    </div>
  );
};

export default Register;
