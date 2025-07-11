import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ліниве завантаження компонентів для оптимізації
// Використовуємо .then(module => ({ default: module.ComponentName })) для іменованих експортів
const RootLayout = lazy(() =>
  import("./components").then((module) => ({ default: module.MainLayout }))
);
const HomePage = lazy(() =>
  import("./components").then((module) => ({ default: module.HomePage }))
);
const UsersPage = lazy(() =>
  import("./components").then((module) => ({ default: module.UsersPage }))
);
const UserDetailPage = lazy(() =>
  import("./components").then((module) => ({ default: module.UserDetailPage }))
);
const PostsPage = lazy(() =>
  import("./components").then((module) => ({ default: module.PostsPage }))
);
const PostDetailPage = lazy(() =>
  import("./components").then((module) => ({ default: module.PostDetailPage }))
);
const CommentsPage = lazy(() =>
  import("./components").then((module) => ({ default: module.CommentsPage }))
);
const CommentDetailPage = lazy(() =>
  import("./components").then((module) => ({
    default: module.CommentDetailPage,
  }))
);
const NewFeaturesPage = lazy(() =>
  import("./components").then((module) => ({ default: module.NewFeaturesPage }))
); // Нова сторінка для ДЗ15

// Створення роутера за допомогою createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Головний макет з Outlet
    children: [
      // Вкладені маршрути
      { index: true, element: <HomePage /> }, // Головна сторінка за замовчуванням
      {
        path: "users",
        children: [
          { index: true, element: <UsersPage /> },
          { path: ":id", element: <UserDetailPage /> }, // Деталі користувача
        ],
      },
      {
        path: "posts",
        children: [
          { index: true, element: <PostsPage /> },
          { path: ":id", element: <PostDetailPage /> }, // Деталі посту
        ],
      },
      {
        path: "comments",
        children: [
          { index: true, element: <CommentsPage /> },
          { path: ":id", element: <CommentDetailPage /> }, // Деталі коментаря
        ],
      },
      {
        path: "new-features", // Маршрут для нових можливостей ДЗ15
        element: <NewFeaturesPage />,
      },
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
