import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name || "", // Ensure name is set correctly
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,

        name: user.name || "",
      }));
    }
  }, [user]);

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
    console.log("Submitting data:", data);

    e.stopPropagation();

    if (!user?.email) {
      // Ensure email is available
      console.error("Missing email! Cannot update user.");
      toast.error("Email is missing. Please try again.");
      return;
    }

    try {
      const URL = "http://localhost:8080/api/update-user";

      const payload = {
        email: user.email, // Send email along with name
        name: data.name,
      };

      console.log("Payload being sent:", payload); // Debugging

      const response = await axios.post(URL, payload, {
        withCredentials: true,
      });

      console.log("API Response:", response.data);
      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser({ ...user, name: data.name })); // Update Redux state
        onClose();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
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
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
            />
          </div>

          <Divider />
          <div className="flex gap-2 w-fit ml-auto">
            <button
              onClick={onClose}
              className="border-primary border text-primary px-4 py-1 hover:bg-purple-900 hover:text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border-primary bg-purple-900 text-white border px-4 py-1 hover:bg-purple-700 rounded"
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
