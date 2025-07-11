import React from "react";
import { useToggle } from "../hooks"; // Імпортуємо хуки з єдиного файлу
import { UserList, PostList, CommentList } from "./EntityComponents"; // Імпортуємо згруповані списки

// Головний компонент додатку, який керує видимістю списків сутностей
function MainApp() {
  const [showUsers, toggleShowUsers] = useToggle(false);
  const [showPosts, toggleShowPosts] = useToggle(false);
  const [showComments, toggleShowComments] = useToggle(false);

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        Дані з JSONPlaceholder
      </h1>

      {/* Перемикачі для сутностей */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={toggleShowUsers}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
            ${
              showUsers
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {showUsers ? "Приховати Користувачів" : "Показати Користувачів"}
        </button>
        <button
          onClick={toggleShowPosts}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
            ${
              showPosts
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {showPosts ? "Приховати Пости" : "Показати Пости"}
        </button>
        <button
          onClick={toggleShowComments}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
            ${
              showComments
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {showComments ? "Приховати Коментарі" : "Показати Коментарі"}
        </button>
      </div>

      {/* Умовний рендеринг списків сутностей */}
      {showUsers && (
        <section className="mb-10 p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
          <h2 className="text-3xl font-semibold mb-6 text-blue-800 text-center">
            Список Користувачів
          </h2>
          <UserList />
        </section>
      )}

      {showPosts && (
        <section className="mb-10 p-6 bg-green-50 rounded-lg shadow-sm border border-green-200">
          <h2 className="text-3xl font-semibold mb-6 text-green-800 text-center">
            Список Постів
          </h2>
          <PostList />
        </section>
      )}

      {showComments && (
        <section className="p-6 bg-purple-50 rounded-lg shadow-sm border border-purple-200">
          <h2 className="text-3xl font-semibold mb-6 text-purple-800 text-center">
            Список Коментарів
          </h2>
          <CommentList />
        </section>
      )}
    </div>
  );
}

export default MainApp;
