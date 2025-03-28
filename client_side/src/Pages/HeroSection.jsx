import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-300 to-indigo-200 text-black py-20 mt-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Upload, Store & Share Your Videos
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          A simple, secure platform for all your video storage needs. High
          quality, fast uploads, and easy sharing.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 hover:text-blue-700 transition duration-300 cursor-pointer">
            Get Started - It's Free
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 hover:text-blue-600 transition duration-300 cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
