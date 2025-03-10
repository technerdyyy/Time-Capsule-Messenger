import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("token") !== "undefined" ? localStorage.getItem("token") : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user safely
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Store token safely
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
