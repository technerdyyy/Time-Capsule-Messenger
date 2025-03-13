import React from "react";
import { Link } from "react-router-dom";

const SearchUserCard = ({ user, onClose }) => {
  return (
    <Link to={"/" + user?._id} onClick={onClose}>
      <div className="p-2 lg:p-3">
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
};

export default SearchUserCard;
