import { User } from "@/app/types/user";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
  user: null | User;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.isAuthenticated = true), (state.user = action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
