import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import commentsReducer from "./features/comments/commentsSlice";
import ideaReducer from "./features/ideas/ideasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentsReducer,
    ideas: ideaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const selectUser = (state: RootState) => state.user;
export const selectComments = (state: RootState) => state.comments;
export const selectIdeas = (state: RootState) => state.ideas;
