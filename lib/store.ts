import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const selectUser = (state: RootState) => state.user;
export const useAppDispatch = () => useDispatch<AppDispatch>();
