import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useLocationInfo from "../../hooks/useLocationInfo";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { navigate, from } = useLocationInfo();
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async (result) => {
        console.log(result.user);
        navigate(from);
        // send user info in db
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          role: "user",
          photo: result.user.photoURL,
          created_at: new Date().toISOString(),
        };
        const userRes = await axiosPublic.post("/users", userInfo);
        console.log(userRes);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="btn w-full bg-white text-black hover:bg-gray-200 border-gray-300 flex items-center justify-center gap-2"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
