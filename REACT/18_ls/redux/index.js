import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as api from "../services/api"; // Імпортуємо всі функції API

// --- Async Thunks для завантаження даних ---

// Користувачі
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers", // Унікальний тип дії
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.fetchAllUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Пости
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const posts = await api.fetchAllPosts();
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Коментарі
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const comments = await api.fetchAllComments();
      return comments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slices (Редьюсери та дії) ---

// Slice для користувачів
const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Тут можна додати синхронні редьюсери, якщо вони потрібні
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

// Slice для постів
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

// Slice для коментарів
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

// --- Redux Store ---
// Конфігуруємо Redux Store за допомогою configureStore
const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
  },
  // configureStore автоматично додає redux-thunk та Redux DevTools Extension
});

export default store;
