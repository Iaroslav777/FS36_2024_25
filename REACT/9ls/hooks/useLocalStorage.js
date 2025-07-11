import { useState, useEffect } from "react";

// Кастомний хук useLocalStorage для збереження та завантаження даних
function useLocalStorage(key, initialValue) {
  // Отримуємо початкове значення зі сховища або використовуємо надане
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Помилка завантаження з localStorage:", error);
      return initialValue;
    }
  });

  // useEffect для збереження значення в localStorage при його зміні
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Помилка збереження в localStorage:", error);
    }
  }, [key, storedValue]); // Залежить від ключа та значення

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
