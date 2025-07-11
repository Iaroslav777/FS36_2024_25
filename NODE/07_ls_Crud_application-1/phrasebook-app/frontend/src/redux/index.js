// frontend/src/redux/index.js - Redux Store, Slices, Async Thunks

import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as api from "../services/api"; // Імпортуємо всі функції API

// --- Async Thunks для взаємодії з API ---

// Асинхронна дія для отримання фраз з бекенду.
// Приймає необов'язковий `searchTerm` для фільтрації.
export const fetchPhrases = createAsyncThunk(
  "phrases/fetchPhrases", // Унікальний тип дії для цієї асинхронної операції
  async (searchTerm = "", { rejectWithValue }) => {
    try {
      const response = await api.getPhrases(searchTerm);
      return response; // Повертаємо дані, які будуть payload'ом для fulfilled дії
    } catch (error) {
      // Використовуємо rejectWithValue для передачі повідомлення про помилку в extraReducers
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна дія для додавання нової фрази.
// Приймає об'єкт `newPhrase` ({ english, ukrainian }).
export const addPhrase = createAsyncThunk(
  "phrases/addPhrase",
  async (newPhrase, { rejectWithValue }) => {
    try {
      const response = await api.addPhrase(newPhrase);
      return response; // Повертаємо додану фразу
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна дія для видалення фрази за ID.
// Приймає `id` фрази для видалення.
export const deletePhrase = createAsyncThunk(
  "phrases/deletePhrase",
  async (id, { rejectWithValue }) => {
    try {
      await api.deletePhrase(id);
      return id; // Повертаємо ID видаленої фрази для оновлення стану
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна дія для оновлення статусу "вивчено" фрази.
// Приймає об'єкт з `id` фрази та новим статусом `learned`.
export const updatePhraseStatus = createAsyncThunk(
  "phrases/updatePhraseStatus",
  async ({ id, learned }, { rejectWithValue }) => {
    try {
      const response = await api.updatePhraseStatus(id, learned);
      return response; // Повертаємо оновлену фразу
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна дія для експорту фраз у файл.
// Не змінює стан Redux, але викликає завантаження файлу.
export const exportPhrasesToFile = createAsyncThunk(
  "phrases/exportPhrases",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.exportPhrases();
      return result; // Повертаємо результат операції (успіх/помилка)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice для управління станом фраз ---

// `createSlice` автоматично генерує дії та редьюсери.
const phrasesSlice = createSlice({
  name: "phrases", // Ім'я зрізу, використовується як префікс для типів дій
  initialState: {
    // Початковий стан для цього зрізу
    items: [], // Масив фраз
    loading: false, // Індикатор завантаження
    error: null, // Повідомлення про помилку
  },
  reducers: {
    // Тут можна додати синхронні редьюсери, якщо вони потрібні
    // Наприклад: setPhrases: (state, action) => { state.items = action.payload; }
  },
  // `extraReducers` обробляє дії, створені `createAsyncThunk`
  extraReducers: (builder) => {
    builder
      // Обробка станів для `fetchPhrases`
      .addCase(fetchPhrases.pending, (state) => {
        state.loading = true; // Встановлюємо стан завантаження
        state.error = null; // Очищаємо попередні помилки
      })
      .addCase(fetchPhrases.fulfilled, (state, action) => {
        state.loading = false; // Завантаження завершено
        state.items = action.payload; // Оновлюємо список фраз отриманими даними
      })
      .addCase(fetchPhrases.rejected, (state, action) => {
        state.loading = false; // Завантаження завершено з помилкою
        state.error = action.payload; // Зберігаємо повідомлення про помилку
        state.items = []; // Очищаємо елементи у випадку помилки завантаження
      })
      // Обробка станів для `addPhrase`
      .addCase(addPhrase.fulfilled, (state, action) => {
        state.items.push(action.payload); // Додаємо нову фразу до списку
      })
      .addCase(addPhrase.rejected, (state, action) => {
        state.error = action.payload; // Зберігаємо помилку додавання
      })
      // Обробка станів для `deletePhrase`
      .addCase(deletePhrase.fulfilled, (state, action) => {
        // Видаляємо фразу зі списку за ID, отриманим з payload
        state.items = state.items.filter(
          (phrase) => phrase.id !== action.payload
        );
      })
      .addCase(deletePhrase.rejected, (state, action) => {
        state.error = action.payload; // Зберігаємо помилку видалення
      })
      // Обробка станів для `updatePhraseStatus`
      .addCase(updatePhraseStatus.fulfilled, (state, action) => {
        // Знаходимо індекс оновленої фрази та замінюємо її
        const index = state.items.findIndex(
          (phrase) => phrase.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload; // Оновлюємо фразу
        }
      })
      .addCase(updatePhraseStatus.rejected, (state, action) => {
        state.error = action.payload; // Зберігаємо помилку оновлення статусу
      })
      // Обробка станів для `exportPhrasesToFile`
      // Ця дія не змінює стан `items`, але ми можемо логувати її успіх/помилку
      .addCase(exportPhrasesToFile.fulfilled, (state, action) => {
        console.log(action.payload.message); // Виводимо повідомлення про успіх експорту
      })
      .addCase(exportPhrasesToFile.rejected, (state, action) => {
        console.error("Помилка експорту:", action.payload); // Логуємо помилку експорту
        state.error = action.payload; // Зберігаємо помилку експорту
      });
  },
});

// --- Redux Store ---
// `configureStore` спрощує налаштування Redux Store.
// Він автоматично додає `redux-thunk` як middleware та налаштовує Redux DevTools Extension.
const store = configureStore({
  reducer: {
    phrases: phrasesSlice.reducer, // Додаємо редьюсер фраз до кореневого редьюсера
  },
});

export default store;
