import React, { Suspense, lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux"; // Для доступу до стану теми

// Ліниве завантаження компонентів для оптимізації
const MainLayout = lazy(() =>
  import("./components").then((module) => ({ default: module.MainLayout }))
);
const PhraseList = lazy(() =>
  import("./components").then((module) => ({ default: module.PhraseList }))
);
const AddPhraseForm = lazy(() =>
  import("./components").then((module) => ({ default: module.AddPhraseForm }))
);

// Створення роутера за допомогою createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Головний макет з Outlet
    children: [
      // Вкладені маршрути
      { index: true, element: <PhraseList /> }, // Список фраз за замовчуванням
      { path: "add", element: <AddPhraseForm /> }, // Додавання нової фрази
    ],
  },
]);

// Головний компонент додатку
function App() {
  // Отримуємо стан теми з LocalStorage (або дефолт)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Застосовуємо клас теми до <html> елемента
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Передаємо функцію toggleTheme через контекст або пропси,
  // але для простоти в цьому завданні, MainLayout буде мати свою логіку перемикання,
  // і App просто встановлює початковий клас.

  return (
    <Suspense
      fallback={
        <div className="text-center text-xl text-blue-600 mt-20 dark:text-blue-300">
          Завантаження...
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
