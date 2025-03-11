import React from "react";

const SearchUserCard = ({ user }) => {
  return (
    <div className="p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border-blue-800">
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </div>
  );
};

export default SearchUserCard;
