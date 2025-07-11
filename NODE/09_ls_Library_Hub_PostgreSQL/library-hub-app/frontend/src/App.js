import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ліниве завантаження компонентів для оптимізації
const MainLayout = lazy(() =>
  import("./components").then((module) => ({ default: module.MainLayout }))
);
const BookList = lazy(() =>
  import("./components").then((module) => ({ default: module.BookList }))
);
const BookForm = lazy(() =>
  import("./components").then((module) => ({ default: module.BookForm }))
);

// Створення роутера за допомогою createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Головний макет з Outlet
    children: [
      // Вкладені маршрути
      { index: true, element: <BookList /> }, // Список книг за замовчуванням
      { path: "add", element: <BookForm /> }, // Додавання нової книги
      { path: "edit/:id", element: <BookForm /> }, // Редагування книги
    ],
  },
]);

// Головний компонент додатку
function App() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-xl text-blue-600 mt-20">
          Завантаження...
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
