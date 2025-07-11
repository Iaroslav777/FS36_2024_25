// frontend/src/services/api.js - API-виклики за допомогою Fetch API

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/books";

// --- Допоміжна функція для обробки відповідей ---
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP помилка! Статус: ${response.status}`
    );
  }
  // Перевіряємо, чи є вміст, щоб уникнути помилок при 204 No Content
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return null; // Для відповідей без вмісту (наприклад, DELETE 204)
}

// --- API-виклики ---

// Отримати список усіх книг з пагінацією
export const getBooks = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Помилка при отриманні книг:", error);
    throw error;
  }
};

// Отримати одну книгу за ID
export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Помилка при отриманні книги з ID ${id}:`, error);
    throw error;
  }
};

// Додати нову книгу
export const addBook = async (bookData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Помилка при додаванні книги:", error);
    throw error;
  }
};

// Редагувати існуючу книгу
export const updateBook = async (id, bookData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Помилка при оновленні книги з ID ${id}:`, error);
    throw error;
  }
};

// Видалити книгу
export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response); // Поверне null для 204 No Content
  } catch (error) {
    console.error(`Помилка при видаленні книги з ID ${id}:`, error);
    throw error;
  }
};
