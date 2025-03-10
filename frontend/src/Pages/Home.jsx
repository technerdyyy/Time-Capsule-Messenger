import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../redux/userSlice";
import Sidebar from '../Components/Sidebar';

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("redux user", user);
  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
      const response = await axios.get({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("current user details", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-white">
       <Sidebar/> 
      </section>
      {/*message component*/}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
