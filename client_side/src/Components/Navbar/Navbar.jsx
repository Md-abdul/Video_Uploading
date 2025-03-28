import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import navdata from "./NavbarLinks";
import { useUser } from "../../context/UserContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user, logout } = useUser();

  const toggleDrawer = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navData = navdata();

  const handleLogout = () => {
    logout();
    if (isOpen) toggleDrawer(); 
  };

  return (
    <div className="font-poppins">
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isSticky ? "bg-white shadow-lg" : "bg-white/10 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto px-4">
          <div className="flex items-center">
            <Link to={"/"}>
              <h1 className="text-2xl font-bold">
              <span className="text-yellow-400">Video</span>Upload
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex flex-grow justify-center space-x-8">
            {navData[0].subItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className={`px-5 py-3 rounded-md hover:bg-gray-100 font-medium text-gray-700 transition-all duration-300 hover:shadow-md hover:border hover:border-gray-200 ${
                  location.pathname === item.link
                    ? "border-b-2 border-yellow-400"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 font-medium cursor-pointer"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition-all duration-300 font-medium"
              >
                <LuUserRound className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          <button
            className="flex md:hidden p-2 rounded-md bg-gray-200 text-black hover:bg-gray-400 transition-all duration-300"
            onClick={toggleDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-25 z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" onClick={toggleDrawer}>
              <h1 className="text-2xl font-bold">
                <span className="text-yellow-400">Video</span>Upload
              </h1>
            </Link>
            <button
              className="p-2 rounded-md bg-gray-200 text-black hover:bg-gray-400 transition-all duration-300"
              onClick={toggleDrawer}
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {navData[0].subItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="block px-5 py-3 rounded-md hover:bg-gray-100 font-medium text-gray-700 transition-all duration-300 hover:shadow-md hover:border hover:border-gray-200"
                onClick={toggleDrawer}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="space-y-4">
                <div className="px-5 py-3 font-medium text-gray-700">
                  Hi, {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 font-medium"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-3 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition-all duration-300 font-medium"
                onClick={toggleDrawer}
              >
                <LuUserRound className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
