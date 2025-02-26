import React from "react";
import "../index.css";
// import { Menu, X } from "lucide-react";

const AuthLayouts = ({ children }) => {
  return (
    <>
      <nav className="bg-[#022B3A] text-white py-10 flex justify-center items-center h-16 shadow-[0px_4px_10px_rgba(0,0,0,0.3)]">
        <div className="text-2xl font-bold">Chrono Chat</div>
      </nav>

      {children}
    </>
  );
};

export default AuthLayouts;
