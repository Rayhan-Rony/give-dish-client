import React from "react";
import { useLocation, useNavigate } from "react-router";

const useLocationInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  return { location, navigate, from };
};

export default useLocationInfo;
