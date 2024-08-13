import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-customBlue text-white">
      <div className="text-lg font-bold">Home</div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/my-account" className="hover:underline">
              My Account
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="hover:underline">
              Login
            </Link>
            <Link to="/auth/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/contact" className="hover:underline">
          Contact Us
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/faqs" className="hover:underline">
          FAQs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
