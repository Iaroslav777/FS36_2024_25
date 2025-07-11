// frontend/src/services/api.js - API-виклики за допомогою Axios

import axios from "axios";

// Базовий URL для API, беремо з .env файлу
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/phrases";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPhrases = async (searchTerm = "") => {
  try {
    const response = await api.get(`?search=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні фраз:", error);
    throw error;
  }
};

export const addPhrase = async (phrase) => {
  try {
    const response = await api.post("/", phrase);
    return response.data;
  } catch (error) {
    console.error("Помилка при додаванні фрази:", error);
    throw error;
  }
};

export const deletePhrase = async (id) => {
  try {
    await api.delete(`/${id}`);
    return id; // Повертаємо ID видаленої фрази
  } catch (error) {
    console.error(`Помилка при видаленні фрази з ID ${id}:`, error);
    throw error;
  }
};

export const updatePhraseStatus = async (id, learned) => {
  try {
    const response = await api.put(`/${id}`, { learned });
    return response.data; // Повертаємо оновлену фразу
  } catch (error) {
    console.error(`Помилка при оновленні статусу фрази з ID ${id}:`, error);
    throw error;
  }
};

export const exportPhrases = async () => {
  try {
    // Зверніть увагу: оскільки це завантаження файлу, Axios може не обробити його як JSON
    // Ми повертаємо URL для прямого завантаження або обробляємо відповідь як Blob
    const response = await api.get("/export", { responseType: "blob" });
    // Створюємо тимчасовий URL для завантаження файлу
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "phrases_export.json"); // Ім'я файлу
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // Очищаємо тимчасовий URL
    return { success: true, message: "Фрази успішно експортовано!" };
  } catch (error) {
    console.error("Помилка при експорті фраз:", error);
    throw error;
  }
};
