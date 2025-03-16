import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../redux/userSlice";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("redux user", user);

  // const fetchUserDetails = async () => {
  //   if (!user.token) {
  //     navigate("/email"); // Redirect if no token exists
  //     return;
  //   }
  //   try {
  //     const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
  //     const response = await axios.get(URL, { withCredentials: true });
  //     if (!response.data || !response.data.data) {
  //       console.error("Invalid response format:", response);
  //       return;
  //     }

  //     dispatch(setUser(response.data.data));

  //     if (response.data.logout) {
  //       console.log("fetchUserDetails response:", response.data);
  //       dispatch(logout());
  //       navigate("/email");
  //     }
  //     // console.log("current user details", response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token"); // ✅ Fetch token from storage

    if (!token) {
      console.log("No token found, redirecting to /email...");
      navigate("/email");
      return;
    }

    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
      const response = await axios.get(URL, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Send token
        withCredentials: true,
      });

      console.log("fetchUserDetails response:", response.data);

      if (!response.data || !response.data.data) {
        console.error("Invalid response format:", response);
        return;
      }

      dispatch(setUser(response.data.data)); // ✅ Update Redux with user

      if (response.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
      navigate("/email"); // ✅ Redirect only if error occurs
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[500px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div className="hidden md:flex justify-center items-center h-full w-full bg-[#E1E5F2]">
          <h1 className="text-center">
            <span className="text-4xl font-bold">ChronoChat</span>
            <br />
            <span className="text-lg mt-2 block">
              Click on the user to send your message!
            </span>
          </h1>
        </div>
      </div>
    </div>
    // <div className="grid lg:grid-cols-[500px,1fr] h-screen max-h-screen">
    //   <section>
    //     <Sidebar />
    //   </section>
    //   <main className="md:bg-[#E1E5F2] md:flex-1">
    //     {/* Main content here */}
    //     <Message />
    //   </main>
    // </div>
  );
};

export default Home;
