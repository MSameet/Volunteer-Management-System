import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {
    login: (state, action) => {
      return action?.payload;
    },
    signup: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    logout: (state, action) => {
      return (state = {});
    },
  },
});

export const { login, signup, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
