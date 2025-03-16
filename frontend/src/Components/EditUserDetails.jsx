import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose }) => {
  const user = useSelector((state) => state.user); // ✅ Get user from Redux
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: user?.name || "",
  });

  useEffect(() => {
    console.log("User prop received in EditUserDetails:", user); // Debugging
    if (user && user._id) {
      setData((prev) => ({ ...prev, ...user }));
    }
  }, [user]);

  if (!user || !user._id) {
    return <p>Loading user details...</p>;
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    console.log("Updating field:", name, "Value:", value);

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

    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`;

      const response = await axios.post(URL, data);
      console.log("API Response:", response.data);
      // toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        toast.success(response?.data?.message);
        onClose();
      } else {
        toast.error("invalid user data received");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit User Details</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-[#E1E5F2] border-0.5"
            />
          </div>

          <Divider />
          <div className="flex gap-2 w-fit ml-auto">
            <button
              onClick={onClose}
              className="border-[#E1E5F2] border text-[#022B3A] px-4 py-1 hover:bg-[#022B3A] hover:text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border-primary bg-[#022B3A] text-white border px-4 py-1 hover:bg-[#03435a] rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
