// frontend/src/redux/index.js - Redux Store, Slices, Async Thunks

import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as api from "../services/api"; // Імпортуємо всі функції API

// --- Async Thunks для взаємодії з API ---

// Отримати всі книги з пагінацією
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.getBooks(page, limit);
      return response; // Повертаємо об'єкт { books, currentPage, totalPages, totalBooks }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Отримати книгу за ID
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getBookById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Додати нову книгу
export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await api.addBook(bookData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Оновити книгу
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const response = await api.updateBook(id, bookData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Видалити книгу
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteBook(id);
      return id; // Повертаємо ID для оновлення стану
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice для управління станом книг ---

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0,
    selectedBook: null, // Для модального вікна деталей
  },
  reducers: {
    // Синхронні редьюсери, якщо потрібні
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.books;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalBooks = action.payload.totalBooks;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      })
      // fetchBookById
      .addCase(fetchBookById.pending, (state) => {
        state.selectedBook = null; // Очищаємо попередній вибір
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.error = action.payload;
      })
      // addBook
      .addCase(addBook.fulfilled, (state, action) => {
        // Після додавання, можна оновити список або просто перезавантажити сторінку
        // Для простоти, ми просто дозволимо fetchBooks оновити список
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.payload;
      })
      // updateBook
      .addCase(updateBook.fulfilled, (state, action) => {
        // Знаходимо оновлену книгу та замінюємо її
        const index = state.items.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.payload;
      })
      // deleteBook
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter((book) => book.id !== action.payload);
        // Можливо, потрібно перерахувати пагінацію або перейти на попередню сторінку,
        // якщо на поточній сторінці не залишилося книг. Для простоти, це буде оброблено fetchBooks.
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Експортуємо синхронні дії
export const { setCurrentPage, clearSelectedBook } = booksSlice.actions;

// --- Store ---
const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export default store;
