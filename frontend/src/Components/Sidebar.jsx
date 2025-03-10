import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { TbLogout2 } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import EditUserDetails from "./EditUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize useNavigate
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch to reset Redux state

    dispatch(setToken(null)); // Clear token from Redux
    dispatch(setUser(null)); // Clear user data from Redux

    // Clear data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    // Redirect to email page
    navigate("/email", { replace: true });
  };

  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between text-slate-600">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div
            title="add friend"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={25} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <FaCircleUser size={35} />
          </button>

          {/* Logout Button */}
          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            onClick={handleLogout} // ✅ Call handleLogout instead of logout
          >
            <span className="-ml-2">
              <TbLogout2 size={25} />
            </span>
          </button>
        </div>
      </div>

      {/* edit user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </div>
  );
};

export default Sidebar;
