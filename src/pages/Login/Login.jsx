import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Lottie from "lottie-react";
import loginAnim from "../../assets/LogInLottie.json";

import GiveDishLogo from "../../components/GiveDishLogo/GiveDishLogo";
import { Link } from "react-router";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // TODO: add login logic here
  };

  return (
    <div className="min-h-screen  bg-[#060606] text-white flex flex-col-reverse md:flex-row items-center justify-center">
      {/* Left - Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 ">
        <div className="max-w-md mx-auto">
          <div className=" flex justify-center mb-6">
            <GiveDishLogo />
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  className="input input-bordered w-full pl-10 pr-10 text-black"
                  {...register("password", {
                    required: "Password is required",
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

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
          <div className="divider">or</div>
          <SocialLogin></SocialLogin>

          {/* Register Link */}
          <p className="mt-4 text-center text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Lottie */}
      <div className="w-full  md:w-1/2 flex items-center justify-center md:p-8">
        <Lottie animationData={loginAnim} loop autoplay className="w-full " />
      </div>
    </div>
  );
};

export default Login;
