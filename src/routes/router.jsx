import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register/Register";
import { Component } from "react";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import RestaurantProfile from "../pages/Dashboard/RestaurantProfile/RestaurantProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "donations/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "restaurantProfile",
        Component: RestaurantProfile,
      },
    ],
  },
]);

export default router;
