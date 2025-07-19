import React from "react";
import useAuth from "../hooks/useAuth";
import Login from "../pages/Login/Login";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import useLocationInfo from "../hooks/useLocationInfo";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { location } = useLocationInfo();
  //   console.log(location?.pathname);
  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!user) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
