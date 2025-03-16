// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   token: localStorage.getItem("token") || null, // Load token from localStorage
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//       localStorage.setItem("token", action.payload);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { setUser, setToken, logout } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; 

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  token: Cookies.get("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        Cookies.set("user", JSON.stringify(action.payload), { expires: 7 }); 
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set("token", action.payload, { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;

