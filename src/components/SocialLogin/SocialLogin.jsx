import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <button
      // onClick={handleGoogleLogin}
      className="btn w-full bg-white text-black hover:bg-gray-200 border-gray-300 flex items-center justify-center gap-2"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
