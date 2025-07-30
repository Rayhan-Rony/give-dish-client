import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: "https://give-dish-server.vercel.app",
  // baseURL: "http://localhost:5000",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
