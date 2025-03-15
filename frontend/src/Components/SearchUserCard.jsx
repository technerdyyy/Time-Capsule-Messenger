import React from "react";
import { useNavigate } from "react-router-dom";

const SearchUserCard = ({ user, onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/message", { state: { recipientEmail: user?.email } });
    onClose(); // Close the search modal
  };

  return (
    <div onClick={handleClick} className="p-2 lg:p-3 cursor-pointer hover:bg-gray-100">
      <div className="font-semibold text-ellipsis line-clamp-1">{user?.name}</div>
      <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
    </div>
  );
};

export default SearchUserCard;
