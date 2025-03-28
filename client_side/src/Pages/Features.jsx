import React from "react";
import { FiUpload, FiShield, FiShare2, FiPlay } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: <FiUpload className="w-8 h-8" />,
      title: "Fast Uploads",
      description: "Upload your videos quickly with our optimized servers.",
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Storage",
      description: "Your videos are stored securely with encryption.",
    },
    {
      icon: <FiShare2 className="w-8 h-8" />,
      title: "Easy Sharing",
      description: "Share your videos with anyone via link or embed.",
    },
    {
      icon: <FiPlay className="w-8 h-8" />,
      title: "HD Playback",
      description: "Watch your videos in high quality from anywhere.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Amazing Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;