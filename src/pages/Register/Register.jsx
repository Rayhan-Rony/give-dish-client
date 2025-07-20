import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import Lottie from "lottie-react";
import registerAnim from "../../assets/lottieRegister.json";
import GiveDishLogo from "../../components/GiveDishLogo/GiveDishLogo";
import { Link } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useLocationInfo from "../../hooks/useLocationInfo";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const [fileName, setFileName] = useState("Choose a file");
  const [profilePic, setProfilePic] = useState("");
  const { navigate, from } = useLocationInfo();
  const axiosPublic = useAxiosPublic();

  const handleFileChange = async (e) => {
    // upload profile pic to imageBB
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const imgRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_key}`,
      formData
    );
    const imageUrl = imgRes.data.data.display_url;
    setProfilePic(imageUrl);

    // set file name in ui
    if (file) setFileName(file.name);
    else setFileName("Choose a file");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Registration Data:", data);
    const { name, email, password } = data;

    try {
      // 1. Create User in Firebase
      const userCredential = await createUser(email, password);
      const currentUser = userCredential.user;
      console.log(currentUser);
      // 2. Update displayName and photoURL
      await updateUserProfile({
        displayName: name,
        photoURL: profilePic,
      });
      console.log("User registered successfully:", currentUser);
      //  redirect
      navigate(from);
      // send user info in db
      const userInfo = {
        email: data.email,
        name: data.name,
        role: "user",
        photo: profilePic,
        created_at: new Date().toISOString(),
      };
      const userRes = await axiosPublic.post("/users", userInfo);
      console.log(userRes);
    } catch (err) {
      console.error("Registration error:", err.message);
      //Todo show toast or error
    }
  };

  return (
    <div className="min-h-screen bg-accent text-white flex flex-col-reverse md:flex-row items-center justify-center">
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
            {/* profile photo upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Profile Photo</span>
              </label>

              <div className="flex items-center gap-4">
                <label className="cursor-pointer w-full">
                  <div className="flex items-center justify-between border border-dashed border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3.5 7.5M7 4l3.5 3.5M17 16v-5a4 4 0 00-4-4h-4a4 4 0 00-4 4v5"
                        />
                      </svg>
                      <span className="text-gray-600">
                        {fileName.length > 30
                          ? fileName.slice(0, 30) + "..."
                          : fileName}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("photo", {
                        required: true,
                      })}
                      onChange={handleFileChange}
                    />
                  </div>
                </label>
              </div>

              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">Photo is required</p>
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
