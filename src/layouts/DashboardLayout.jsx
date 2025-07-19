import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaUtensils,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import GiveDishLogo from "../components/GiveDishLogo/GiveDishLogo";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              to="/dashboard/add-donation"
              className="flex items-center gap-3 hover:text-primary transition"
            >
              <FaUtensils /> Add Donation
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-donations"
              className="flex items-center gap-3 hover:text-primary transition"
            >
              <FaUtensils /> My Donations
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/requested-donations"
              className="flex items-center gap-3 hover:text-primary transition"
            >
              <FaUtensils /> Requested Donations
            </Link>
          </li>
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
