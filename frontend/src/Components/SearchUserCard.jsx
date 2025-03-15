import React from "react";

const SearchUserCard = ({ user }) => {
  return (
    <div>
      <div className="font-semibold">{user?.name}</div>
      <p className="text-sm">{user?.email}</p>
    </div>
  );
};

export default SearchUserCard;

