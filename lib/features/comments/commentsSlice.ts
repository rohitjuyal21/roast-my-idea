import { Comment } from "@/app/types/comment";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (ideaId: string | undefined) => {
    const { data } = await axiosInstance.get(`/comments/${ideaId}`);
    return data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({
    ideaId,
    comment,
  }: {
    ideaId: string | undefined;
    comment: { comment: string };
  }) => {
    const { data } = await axiosInstance.post(`/comments/${ideaId}`, comment);
    return data;
  }
);

export const upvoteComment = createAsyncThunk(
  "comments/upvoteComment",
  async (commentId: string) => {
    const { data } = await axiosInstance.post(`/comments/${commentId}/upvote`);
    return data;
  }
);

export const downvoteComment = createAsyncThunk(
  "comments/downvoteComment",
  async (commentId: string) => {
    const { data } = await axiosInstance.post(
      `/comments/${commentId}/downvote`
    );
    return data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
        }
      )
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.comment);
      })
      .addCase(
        upvoteComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          const updatedComment = action.payload;
          state.comments = state.comments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          );
        }
      )
      .addCase(
        downvoteComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          const updatedComment = action.payload;
          state.comments = state.comments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          );
        }
      );
  },
});

export default commentsSlice.reducer;
