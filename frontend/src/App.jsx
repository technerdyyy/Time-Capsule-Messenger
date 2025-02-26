import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
