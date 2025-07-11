// Базовий URL для нашого бекенд-сервера
// Переконайтеся, що він відповідає порту, на якому працює ваш Node.js сервер
const API_BASE_URL = "http://localhost:3001/api";

/**
 * Загальна функція для виконання GET-запитів до API.
 * @param {string} endpoint - Шлях до API-ендпоінту (наприклад, '/tournaments').
 * @returns {Promise<Array|Object>} - Проміс, який повертає дані з сервера.
 * @throws {Error} - Виняток, якщо запит не вдається.
 */
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      // Якщо відповідь не успішна (наприклад, 404 або 500), кидаємо помилку
      throw new Error(
        `Помилка HTTP: ${response.status} - ${response.statusText}`
      );
    }
    // Парсимо відповідь як JSON та повертаємо її
    return await response.json();
  } catch (error) {
    console.error(`Помилка отримання даних з ${endpoint}:`, error);
    throw error; // Перекидаємо помилку для подальшої обробки компонентами
  }
}

// Функції для отримання даних з конкретних ендпоінтів

/**
 * Отримує всі турніри.
 * @returns {Promise<Array>} - Масив об'єктів турнірів.
 */
export const getTournaments = () => fetchData("/tournaments");

/**
 * Отримує список унікальних міст.
 * @returns {Promise<Array>} - Масив рядків з назвами міст.
 */
export const getCities = () => fetchData("/cities");

/**
 * Отримує статистику турнірів.
 * @returns {Promise<Object>} - Об'єкт зі статистичними даними.
 */
export const getStatistics = () => fetchData("/statistics");

/**
 * Отримує 5 найбільших турнірів за призовим фондом, пропускаючи перші 2.
 * @returns {Promise<Array>} - Масив об'єктів турнірів.
 */
export const getTopTournaments = () => fetchData("/top");

/**
 * Отримує турніри з призовим фондом вище середнього.
 * @returns {Promise<Array>} - Масив об'єктів турнірів.
 */
export const getAboveAveragePrizePoolTournaments = () =>
  fetchData("/above-average-prize-pool");
