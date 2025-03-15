import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Spinner from "./Spinner";
import SearchUserCard from "./SearchUserCard";
import toast from "react-hot-toast";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // Store selected users

  const navigate = useNavigate();

  const handleSearchUser = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`;
    try {
      setLoading(true);
      const response = await axios.post(URL, { search });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  const toggleUserSelection = (user) => {
    setSelectedUsers((prevSelected) => {
      const isAlreadySelected = prevSelected.find((u) => u._id === user._id);
      if (isAlreadySelected) {
        return prevSelected.filter((u) => u._id !== user._id);
      }
      return [...prevSelected, user];
    });
  };

  const handleProceedToMessage = () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one recipient.");
      return;
    }
    navigate("/message", { state: { recipients: selectedUsers } });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="Search User by email..."
            className="w-full outline-none py-1 h-full px-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchSharp size={25} />
          </div>
        </div>

        <div className="bg-white mt-2 w-full p-4 rounded">
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user found!</p>
          )}
          {loading && <Spinner />}

          {searchUser.map((user) => (
            <div
              key={user._id}
              className={`p-2 lg:p-3 border ${
                selectedUsers.some((u) => u._id === user._id)
                  ? "bg-blue-100"
                  : "bg-white"
              } cursor-pointer`}
              onClick={() => toggleUserSelection(user)}
            >
              <SearchUserCard user={user} />
            </div>
          ))}
        </div>

        <button
          className="bg-[#022B3A] hover:bg-[#03435A] text-white px-4 py-2 rounded w-full mt-4"
          onClick={handleProceedToMessage}
        >
          Proceed to Message
        </button>
      </div>

      <div
        className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-[#E1E5F2]"
        onClick={onClose}
      >
        <button>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default SearchUser;


