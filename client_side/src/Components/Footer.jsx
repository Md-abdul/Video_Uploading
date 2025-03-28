import React from "react";
import { FiMail, FiGithub, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-300 to-indigo-200 text-black py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">VideoUpload</h3>
            <p className="text-gray-800">
              The simplest way to store and share your videos.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-800 hover:text-blue-400 transition duration-300"
            >
              <FiMail className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-blue-400 transition duration-300"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-blue-400 transition duration-300"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-900">
          <p>© {new Date().getFullYear()} VideoUpload. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
