import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import userImg from "../assets/user.png";

const CheckPass = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Retrieve userId from localStorage or sessionStorage (set during email verification)
  const userId = localStorage.getItem("userId");

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("User ID missing. Please verify your email first.");
      return;
    }

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;
    console.log("Backend URL:", URL);

    try {
      const response = await axios.post(
        URL,
        { password, userId },
        { withCredentials: true }
      );
      toast.success(response.data.message);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store auth token if needed
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#E1E5F2]">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Enter Your Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Password Input */}
          <div>
            <label className="block text-gray-600 mb-1 text-lg">
              Password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#022B3A] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#011826] transition"
          >
            LOGIN
          </button>
          {/* Login Link */}
          <p className="text-center text-gray-600 mt-5 text-lg">
            {" "}
            <Link
              to={"/forgot-password"}
              className="text-blue-500 hover:underline font-semibold"
            >
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckPass;
