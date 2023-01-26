import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    signup: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    logout: (state, action) => {
      return (state = { user: {}, token: "" });
    },
  },
});

export const { login, signup, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
