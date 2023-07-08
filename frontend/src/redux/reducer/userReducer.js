import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {
    login: (state, action) => {
      return action?.payload;
    },
    signup: (state, action) => {
      return action?.payload;
    },
    logout: (state, action) => {
      return (state = {});
    },
    updateUser: (state, action) => {
      return { ...state, user: action.payload.user };
    },
  },
});

export const { login, signup, logout, updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
