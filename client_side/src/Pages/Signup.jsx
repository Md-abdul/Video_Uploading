import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";

export const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, signup } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }
    await signup(formData);
  };

  const Googlebtn = () => {
    toast.error("Please fill in your data in the inputs.");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto rounded-lg">
      <h2 className="text-2xl font-poppins text-gray-900 mb-6 text-center mt-14">
        Welcome! Please sign up to continue
      </h2>

      <div className="flex items-center justify-center text-gray-500 text-sm my-2 w-full">
        <div className="flex-1 border-b border-black-600 mx-2"></div>
        <span>or</span>
        <div className="flex-1 border-b border-black-600 mx-2"></div>
      </div>

      <form onSubmit={handleSignup} className="w-full">
        <label className="flex flex-col mb-5 font-poppins">
          Name*
          <input
            type="text"
            placeholder="Enter your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="py-3 px-4 mt-2 text-base border border-gray-200 rounded w-full focus:outline-none focus:border-green-700"
          />
        </label>

        <label className="flex flex-col mb-5 font-poppins">
          Email*
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="py-3 px-4 mt-2 text-base border border-gray-200 rounded w-full focus:outline-none focus:border-green-700"
          />
        </label>

        <div className="relative mb-5 w-full">
          <label className="flex flex-col font-poppins">
            Password*
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="py-3 px-4 mt-2 text-base border border-gray-200 rounded w-full focus:outline-none focus:border-green-700"
            />
          </label>
          <div
            onClick={togglePasswordVisibility}
            className="absolute top-14 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`py-3 text-base text-white bg-green-700 border-none rounded w-full cursor-pointer transition-colors duration-300 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-800"
          }`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <p className="text-gray-600 mt-4 font-poppins">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 no-underline hover:underline">
          Sign in
        </a>
      </p>

      <p className="text-gray-600 text-sm font-poppins mt-2 text-center leading-relaxed">
        We never share your information with anyone. We only collect information
        to suggest relevant content.
      </p>
    </div>
  );
};
