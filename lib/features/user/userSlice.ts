import { User } from "@/app/types/user";
import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
  user: null | User;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("/user/fetchUser", async () => {
  const { data } = await axiosInstance.get("/user/profile");
  return data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await axiosInstance.post("/auth/logout");
  return;
});

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to logout";
      });
  },
});

export default userSlice.reducer;
