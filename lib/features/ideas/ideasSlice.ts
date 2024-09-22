import { Idea } from "@/types/idea";
import { axiosInstance } from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addComment } from "../comments/commentsSlice";

interface IdeaState {
  ideas: Idea[];
  savedIdeas: Idea[];
  ideasStatus: "idle" | "loading" | "succeeded" | "failed";
  savedIdeasStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IdeaState = {
  ideas: [],
  savedIdeas: [],
  ideasStatus: "idle",
  savedIdeasStatus: "idle",
  error: null,
};

export const fetchIdeas = createAsyncThunk("ideas/fetchIdeas", async () => {
  const { data } = await axiosInstance.get("/idea");
  return data;
});

export const postIdea = createAsyncThunk(
  "ideas/postIdea",
  async (idea: { category: string; idea: string }) => {
    const { data } = await axiosInstance.post("/idea", idea);
    return data;
  }
);

export const fetchIdeaById = createAsyncThunk(
  "ideas/fetchIdeaById",
  async (ideaId: string | string[]) => {
    const { data } = await axiosInstance.get(`/idea/${ideaId}`);
    return data;
  }
);

export const toggleSavedIdeas = createAsyncThunk(
  "ideas/toggleSavedIdea",
  async ({
    ideaId,
    userId,
  }: {
    ideaId: string;
    userId: string | undefined;
  }) => {
    const { data } = await axiosInstance.post(`/idea/${ideaId}/save`);
    return data;
  }
);

export const fetchSavedIdeas = createAsyncThunk(
  "ideas/fetchSavedIdeas",
  async () => {
    const { data } = await axiosInstance.get("/idea/saved");
    return data;
  }
);

export const upvoteIdea = createAsyncThunk(
  "ideas/upvoteIdea",
  async (ideaId: string) => {
    const { data } = await axiosInstance.post(`/idea/${ideaId}/upvote`);
    return data;
  }
);

export const downvoteIdea = createAsyncThunk(
  "ideas/downvoteIdea",
  async (ideaId: string) => {
    const { data } = await axiosInstance.post(`/idea/${ideaId}/downvote`);
    return data;
  }
);

const ideaSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdeas.pending, (state) => {
        state.ideasStatus = "loading";
      })
      .addCase(fetchIdeas.fulfilled, (state, action: PayloadAction<Idea[]>) => {
        state.ideasStatus = "succeeded";
        state.ideas = action.payload;
      })
      .addCase(fetchIdeas.rejected, (state, action) => {
        state.ideasStatus = "failed";
        state.error = action.error.message || "Failed to fetch ideas";
      })
      .addCase(postIdea.fulfilled, (state, action) => {
        state.ideas.push(action.payload);
      })
      .addCase(fetchSavedIdeas.pending, (state) => {
        state.savedIdeasStatus = "loading";
      })
      .addCase(
        fetchSavedIdeas.fulfilled,
        (state, action: PayloadAction<Idea[]>) => {
          state.savedIdeasStatus = "succeeded";
          state.savedIdeas = action.payload;
        }
      )
      .addCase(fetchSavedIdeas.rejected, (state, action) => {
        state.savedIdeasStatus = "failed";
        state.error = action.error.message || "Failed to fetch saved ideas";
      })
      .addCase(
        toggleSavedIdeas.fulfilled,
        (state, action: PayloadAction<Idea>) => {
          const updatedIdea = action.payload;

          state.ideas = state.ideas.map((idea) =>
            idea._id === updatedIdea._id ? updatedIdea : idea
          );

          state.savedIdeas = state.savedIdeas.some(
            (idea) => idea._id === updatedIdea._id
          )
            ? state.savedIdeas.map((idea) =>
                idea._id === updatedIdea._id ? updatedIdea : idea
              )
            : [...state.savedIdeas, updatedIdea];
        }
      )
      .addCase(upvoteIdea.fulfilled, (state, action: PayloadAction<Idea>) => {
        const updatedIdea = action.payload;
        state.ideas = state.ideas.map((idea) =>
          idea._id === updatedIdea._id ? updatedIdea : idea
        );
        state.savedIdeas = state.savedIdeas.map((idea) =>
          idea._id === updatedIdea._id ? updatedIdea : idea
        );
      })
      .addCase(downvoteIdea.fulfilled, (state, action: PayloadAction<Idea>) => {
        const updatedIdea = action.payload;
        state.ideas = state.ideas.map((idea) =>
          idea._id === updatedIdea._id ? updatedIdea : idea
        );
        state.savedIdeas = state.savedIdeas.map((idea) =>
          idea._id === updatedIdea._id ? updatedIdea : idea
        );
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedIdea = action.payload.idea;
        state.ideas = state.ideas.map((idea) =>
          idea._id === updatedIdea._id ? updatedIdea : idea
        );
      });
  },
});

export default ideaSlice.reducer;
