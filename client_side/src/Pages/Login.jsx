import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, login } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }
    await login(formData);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto rounded-lg mt-18" >
      <h2 className="text-2xl font-poppins text-gray-900 mb-6 text-center mt-14">
        Welcome back! Please login to continue
      </h2>

      <form onSubmit={handleLogin} className="w-full">
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
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="text-gray-600 mt-4 font-poppins">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 no-underline hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};
