import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import commentsReducer from "./features/comments/commentsSlice";
import ideaReducer from "./features/ideas/ideasSlice";
import { useDispatch, useSelector } from "react-redux";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      comments: commentsReducer,
      ideas: ideaReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const selectUser = (state: RootState) => state.user;
export const selectComments = (state: RootState) => state.comments;
export const selectIdeas = (state: RootState) => state.ideas;
