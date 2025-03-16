import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import userImg from "../assets/user.png";

const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(URL, data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email: "",
        });
        navigate("/password", {
          state: response?.data?.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-[#E1E5F2] pt-20">
      <img src={userImg} alt="user-icon" className="w-20 h-20 mb-10" />
      <div className="bg-white p-10 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Welcome to Chrono Chat!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 mb-1 text-lg">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
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
            ENTER
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-5 text-lg">
          New User?{" "}
          <Link
            to={"/register"}
            className="text-blue-500 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
