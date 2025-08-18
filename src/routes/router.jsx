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
import AddDonation from "../pages/Dashboard/AddDonation/AddDonation";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";
import UpdateDonations from "../pages/Dashboard/MyDonations/UpdateDonations";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import RequestCharityRole from "../pages/Dashboard/RequestCharityRole/RequestCharityRole";
import Payment from "../pages/Dashboard/Payment/Payment";
import Favorites from "../pages/Dashboard/Favorites/Favorites";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import TransactionHistory from "../pages/Dashboard/TransactionsHistory/TransactionsHistory";
import CharityProfile from "../pages/Dashboard/CharityProfile/CharityProfile";
import MyRequests from "../pages/Dashboard/MyRequests/MyRequests";
import MyPickups from "../pages/Dashboard/MyPickups/MyPickups";
import RequestedDonations from "../pages/Dashboard/RequestedDonations/RequestedDonations";
import ReceivedDonations from "../pages/Dashboard/ReceivedDonations/ReceivedDonations";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import ManageDonations from "../pages/Dashboard/ManageDonations/ManageDonations";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageRoleRequests from "../pages/Dashboard/ManageRoleRequests/ManageRoleRequests";
import ManageRequests from "../pages/Dashboard/ManageRequests/ManageRequests";
import FeatureDonations from "../pages/Dashboard/FeatureDonations/FeatureDonations";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllDonations from "../pages/AllDonations/AllDonations";
import DashboardOverview from "../pages/Dashboard/DashboardOverview/DashboardOverview";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "donations/:id",
        element: <DonationDetails></DonationDetails>,
      },
      {
        path: "allDonations",
        element: <AllDonations></AllDonations>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <ErrorPage />,
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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardOverview></DashboardOverview>,
      },
      {
        path: "restaurantProfile",
        Component: RestaurantProfile,
      },
      {
        path: "addDonation",
        Component: AddDonation,
      },
      {
        path: "myDonations",
        Component: MyDonations,
      },
      {
        path: "updateDonation/:id",
        Component: UpdateDonations,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "requestCharityRole",
        Component: RequestCharityRole,
      },
      {
        path: "payment",
        Component: Payment,
      },
      {
        path: "favorites",
        Component: Favorites,
      },
      {
        path: "myReviews",
        Component: MyReviews,
      },
      {
        path: "transactions",
        Component: TransactionHistory,
      },
      {
        path: "charityProfile",
        Component: CharityProfile,
      },
      {
        path: "myRequests",
        Component: MyRequests,
      },
      {
        path: "myPickups",
        Component: MyPickups,
      },
      {
        path: "requestedDonations",
        Component: RequestedDonations,
      },
      {
        path: "receivedDonations",
        Component: ReceivedDonations,
      },
      {
        path: "transactionsHistory",
        Component: TransactionHistory,
      },
      {
        path: "adminProfile",
        Component: AdminProfile,
      },
      {
        path: "manageDonations",
        Component: ManageDonations,
      },
      {
        path: "manageUsers",
        Component: ManageUsers,
      },
      {
        path: "manageRoleRequests",
        Component: ManageRoleRequests,
      },
      {
        path: "manageRequests",
        Component: ManageRequests,
      },
      {
        path: "featureDonations",
        Component: FeatureDonations,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />, // catch-all for undefined routes
  },
]);

export default router;
