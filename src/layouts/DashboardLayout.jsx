import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaUtensils,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHandshake,
  FaHeart,
  FaReceipt,
  FaStar,
  FaHandHoldingHeart,
  FaTruck,
  FaBoxOpen,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import {} from "react-icons/fa";

import GiveDishLogo from "../components/GiveDishLogo/GiveDishLogo";
import { Link, Outlet } from "react-router";
import useUserRole from "../hooks/useUserRole";
import LoadingPage from "../components/LoadingPage/LoadingPage";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, isLoading } = useUserRole();
  console.log(role);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Mobile Header */}
      <header className="flex items-center justify-between md:hidden bg-black p-4 shadow-md">
        <GiveDishLogo />
        <button
          className="text-white text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-black p-6 md:p-6 transition-all duration-300 z-10 absolute md:relative`}
      >
        <div className="mb-10 text-center">
          <GiveDishLogo />
          <h1 className="text-2xl font-bold mt-3">Dashboard</h1>
        </div>

        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 hover:text-primary transition"
            >
              <FaHome /> Home
            </Link>
          </li>
          {/* user Dashboard Link  */}
          {role === "user" && (
            <>
              <li>
                <Link
                  to="/dashboard/myProfile"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaUser /> My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/requestCharityRole"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaHandshake /> Request Charity Role
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/favorites"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaHeart /> Favourites
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/myReviews"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaStar /> My Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/transactions"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaReceipt /> Transaction History
                </Link>
              </li>
            </>
          )}
          {/* restaurant Dashboard link */}
          {role === "restaurant" && (
            <>
              {" "}
              <li>
                <Link
                  to="/dashboard/restaurantProfile"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaUser /> Restaurant Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/addDonation"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaUtensils /> Add Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/myDonations"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaUtensils /> My Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/requestedDonations"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaUtensils /> Requested Donations
                </Link>
              </li>
            </>
          )}
          {role === "charity" && (
            <>
              <li>
                <Link
                  to="/dashboard/charityProfile"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaUser /> Charity Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/myRequests"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaHandHoldingHeart /> My Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/myPickups"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaTruck /> My Pickups
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/receivedDonations"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaBoxOpen /> Received Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/transactionsHistory"
                  className="flex items-center gap-3 hover:text-primary transition"
                >
                  <FaFileInvoiceDollar /> Transaction History
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="mt-10">
          <button className="flex items-center gap-2 hover:text-red-400 transition">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-accent md:ml-0 mt-4 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
