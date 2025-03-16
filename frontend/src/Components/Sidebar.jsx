import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import EditUserDetails from "./EditUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";
import { LuArrowUpLeft } from "react-icons/lu";
import SearchUser from "./SearchUser";
import { logout } from "../redux/userSlice";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/email");
  };

  const handleOpenEditUser = () => {
    if (user && user._id) {
      setEditUserOpen(true);
    } else {
      console.log("User data not loaded yet.");
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-3 flex flex-col justify-between text-slate-600">
        <div className="gap-3">
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div
            title="add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
          >
            <FaUserPlus size={25} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={handleOpenEditUser}
          >
            <FaCircleUser size={35} />
          </button>

          {/* Logout Button */}
          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
            onClick={handleLogout}
          >
            <span className="-ml-2">
              <TbLogout2 size={25} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className=" h-16 flex items-center  border-b-2">
          <h2 className="text-2xl font-bold p-3 text-slate-800 ">Messages</h2>
        </div>
        <div className=" h-[calc(100vh-73px)] overflow-x-hidden overflow-y-auto">
          {allUser.length === 0 && (
            <div className="mt-10">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <LuArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-500">
                Explore users to start a conversation!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* edit user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} />
      )}

      {/* search user */}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
