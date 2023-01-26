import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "../reducer/userReducer";
import { adminReducer } from "../reducer/adminReducer";

export const store = configureStore({
  reducer: {
    userReducer,
    adminReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});
