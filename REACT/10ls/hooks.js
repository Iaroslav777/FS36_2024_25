import { useState, useEffect, useCallback } from "react";

// Кастомний хук useFetch для виконання асинхронних запитів
function useFetch(fetchFunction, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функція для виконання запиту, оптимізована за допомогою useCallback
  const executeFetch = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(...args);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  ); // Залежність від fetchFunction

  // Повертаємо дані, стан завантаження, помилку та функцію для виконання запиту
  return { data, loading, error, executeFetch, setData };
}

// Кастомний хук useToggle для керування булевим станом (перемикачами)
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Функція для перемикання значення, оптимізована за допомогою useCallback
  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, toggle];
}

export { useFetch, useToggle };
