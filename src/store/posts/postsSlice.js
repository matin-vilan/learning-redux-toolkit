import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "../../api";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
  status: "idle",
});

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    return await axios.get("/posts");
  }
);

export const {
  selectById: selectPostById,
  selectAll: selectAllPosts,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostByUser = createSelector(
  selectAllPosts,
  (state, userId) => userId,
  (posts, userId) => posts.filter((post) => (post.userId = userId))
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: {
      reducer(state, action) {
        postsAdapter.addOne(state, action.payload);
      },
    },
    editPost: {
      reducer(state, action) {
        postsAdapter.updateOne(state, action.payload);
      },
    },
    deletePost: {
      reducer(state, action) {
        postsAdapter.removeOne(state, action.payload);
      },
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        postsAdapter.upsertMany(state, action.payload);
        state.status = "success";
      }),
});

export const { editPost, addNewPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
