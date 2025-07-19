import React from "react";
import GiveDishLogo from "../GiveDishLogo/GiveDishLogo";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-accent text-gray-200 pt-10 pb-6 px-4 md:px-16">
      <div className="max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Brand Info */}
        <div className="flex flex-col items-start space-y-3">
          <GiveDishLogo className="w-24 h-auto" />
          <p className="text-sm text-gray-400">
            GiveDish – Reducing food waste, feeding hope. Join us in making a
            difference!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-title text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                Donate
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="footer-title text-white">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                Bakery
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                Cooked Meals
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                Vegetables
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-300 hover:text-white">
                Meat & Dairy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="footer-title text-white">Contact</h4>
          <p className="text-sm text-gray-400 mb-4">
            Email: support@givedish.org
          </p>
          <div className="flex space-x-4 text-primary text-xl">
            <a href="#">
              <FaFacebookF className="hover:text-white" />
            </a>
            <a href="#">
              <FaTwitter className="hover:text-white" />
            </a>
            <a href="#">
              <FaInstagram className="hover:text-white" />
            </a>
            <a href="#">
              <FaEnvelope className="hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GiveDish. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
