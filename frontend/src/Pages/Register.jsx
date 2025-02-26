import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("data", data);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E1E5F2]">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Welcome to Chrono Chat!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="block text-gray-600 mb-1 text-lg">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>

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

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 mb-1 text-lg">
              Password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#022B3A] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#011826] transition"
          >
            REGISTER
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-5 text-lg">
          Already have an account?{" "}
          <Link
            to={"/email"}
            className="text-blue-500 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
