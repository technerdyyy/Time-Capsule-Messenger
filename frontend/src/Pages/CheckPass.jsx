import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

const CheckPass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token); // Get token from Redux

  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");

  // Redirect to homepage if token exists
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("user");

    if (!storedUserId || !storedUser) {
      toast.error(
        "User ID or User data missing. Please verify your email first."
      );
      navigate("/email"); // Redirect if userId or user data doesn't exist
    } else {
      setUserId(storedUserId); // Set userId here
    }

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;

    try {
      const response = await axios.post(
        URL,
        { password, userId: storedUserId }, // Use storedUserId directly
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Dispatch token and user to Redux and store them in localStorage
        dispatch(setToken(response?.data?.token));
        dispatch(setUser(response?.data?.user)); // ✅ Store user details

        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));

        setPassword(""); // Clear the password field after successful login
        navigate("/"); // Redirect to homepage after successful login
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
          <div>
            <label className="block text-gray-600 mb-1 text-lg">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#022B3A] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#011826] transition"
          >
            LOGIN
          </button>

          <p className="text-center text-gray-600 mt-5 text-lg">
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
