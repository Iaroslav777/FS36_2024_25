import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Функції для роботи з постами
export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні постів:", error);
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при отриманні посту з ID ${id}:`, error);
    throw error;
  }
};

// Функції для роботи з користувачами
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при отриманні користувача з ID ${id}:`, error);
    throw error;
  }
};
