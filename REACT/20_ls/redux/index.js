import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as api from "../services/api"; // Імпортуємо всі функції API

// --- Async Thunks для завантаження даних ---

// Пости
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts", // Унікальний тип дії
  async (_, { rejectWithValue }) => {
    try {
      const posts = await api.fetchAllPosts();
      return posts;
    } catch (error) {
      // Використовуємо rejectWithValue для передачі помилки в extraReducers
      return rejectWithValue(
        error.message || "Невідома помилка при отриманні постів"
      );
    }
  }
);

// Користувачі
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.fetchAllUsers();
      return users;
    } catch (error) {
      return rejectWithValue(
        error.message || "Невідома помилка при отриманні користувачів"
      );
    }
  }
);

// --- Slices (Редьюсери та дії) ---

// Slice для постів
const postsSlice = createSlice({
  name: "posts",
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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null; // Очищаємо помилку при новому запиті
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // action.payload містить помилку, передану rejectWithValue
        state.items = []; // Очищаємо елементи при помилці
      });
  },
});

// Slice для користувачів
const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
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

// --- Redux Store ---
// Конфігуруємо Redux Store за допомогою configureStore
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
  },
  // configureStore автоматично додає redux-thunk та Redux DevTools Extension
});

export default store;
