// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setToken, setUser } from "../redux/userSlice";

// const CheckPass = () => {
//   const [data, setData] = useState({
//     password: "",
//     userId: "",
//   });

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!location?.state?.name) {
//       navigate("/email");
//     }
//   }, []);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;

//     try {
//       const response = await axios({
//         method: "post",
//         url: URL,
//         data: {
//           userId: location?.state?._id,
//           password: data.password,
//         },
//         withCredentials: true,
//       });

//       toast.success(response.data.message);

//       if (response.data.success) {
//         dispatch(setToken(response?.data?.token));
//         localStorage.setItem("token", response?.data?.token);
//         // console.log("Stored Token:", localStorage.getItem("token"));

//         setTimeout(() => {
//           navigate("/");
//         }, 100);

//         // setData({
//         //   password: "",
//         // });
//         // navigate("/");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-[#E1E5F2]">
//       <div className="bg-white p-10 rounded-lg shadow-lg w-[450px]">
//         <h2 className="text-3xl font-semibold text-center mb-6">
//           Enter Your Password
//         </h2>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-gray-600 mb-1 text-lg">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={data.password}
//               // onChange={(e) => setPassword(e.target.value)}
//               onChange={handleOnChange}
//               required
//               className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#022B3A] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#011826] transition"
//           >
//             LOGIN
//           </button>

//           <p className="text-center text-gray-600 mt-5 text-lg">
//             <Link
//               to={"/forgot-password"}
//               className="text-blue-500 hover:underline font-semibold"
//             >
//               Forgot Password?
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckPass;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";
import Cookies from "js-cookie"; 

const CheckPass = () => {
  const [data, setData] = useState({
    password: "",
    userId: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;

    try {
      const response = await axios.post(URL, {
        userId: location?.state?._id,
        password: data.password,
      }, { withCredentials: true });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        Cookies.set("token", response?.data?.token, { expires: 7 }); 

        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#E1E5F2]">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Enter Your Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 mb-1 text-lg">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#022B3A] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#011826] transition"
          >
            LOGIN
          </button>

          <p className="text-center text-gray-600 mt-5 text-lg">
            <Link
              to={"/forgot-password"}
              className="text-blue-500 hover:underline font-semibold"
            >
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckPass;
