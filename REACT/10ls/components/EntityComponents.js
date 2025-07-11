import React, { useEffect } from "react";
import { useFetch, useToggle } from "../hooks"; // Імпортуємо хуки з єдиного файлу
import {
  fetchAllUsers,
  fetchUserById,
  fetchAllPosts,
  fetchPostById,
  fetchAllComments,
  fetchCommentById,
} from "../api"; // Імпортуємо API-функції з єдиного файлу

// --- Компоненти для деталей сутностей ---

// Компонент для відображення деталей користувача
function UserDetails({ userId }) {
  const {
    data: userDetails,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchUserById);

  // Виконуємо запит на отримання деталей при зміні userId
  useEffect(() => {
    if (userId) {
      // Перевіряємо, чи є ID
      executeFetch(userId);
    }
  }, [userId, executeFetch]);

  if (loading)
    return (
      <p className="text-center text-blue-400 text-sm mt-3">
        Завантаження деталей користувача...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-400 text-sm mt-3">
        Помилка завантаження деталей: {error.message}
      </p>
    );
  if (!userDetails) return null; // Не відображаємо нічого, якщо даних ще немає

  return (
    <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-gray-600">
      <p>
        <strong>Ім'я:</strong> {userDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {userDetails.email}
      </p>
      <p>
        <strong>Телефон:</strong> {userDetails.phone}
      </p>
      <p>
        <strong>Вебсайт:</strong>{" "}
        <a
          href={`http://${userDetails.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {userDetails.website}
        </a>
      </p>
      <p>
        <strong>Компанія:</strong> {userDetails.company?.name}
      </p>
      <p>
        <strong>Місто:</strong> {userDetails.address?.city}
      </p>
    </div>
  );
}

// Компонент для відображення деталей посту
function PostDetails({ postId }) {
  const {
    data: postDetails,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchPostById);

  // Виконуємо запит на отримання деталей при зміні postId
  useEffect(() => {
    if (postId) {
      // Перевіряємо, чи є ID
      executeFetch(postId);
    }
  }, [postId, executeFetch]);

  if (loading)
    return (
      <p className="text-center text-green-400 text-sm mt-3">
        Завантаження деталей посту...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-400 text-sm mt-3">
        Помилка завантаження деталей: {error.message}
      </p>
    );
  if (!postDetails) return null; // Не відображаємо нічого, якщо даних ще немає

  return (
    <div className="mt-3 pt-3 border-t border-green-200 text-sm text-gray-600">
      <p>
        <strong>Заголовок:</strong> {postDetails.title}
      </p>
      <p>
        <strong>Текст:</strong> {postDetails.body}
      </p>
    </div>
  );
}

// Компонент для відображення деталей коментаря
function CommentDetails({ commentId }) {
  const {
    data: commentDetails,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchCommentById);

  // Виконуємо запит на отримання деталей при зміні commentId
  useEffect(() => {
    if (commentId) {
      // Перевіряємо, чи є ID
      executeFetch(commentId);
    }
  }, [commentId, executeFetch]);

  if (loading)
    return (
      <p className="text-center text-purple-400 text-sm mt-3">
        Завантаження деталей коментаря...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-400 text-sm mt-3">
        Помилка завантаження деталей: {error.message}
      </p>
    );
  if (!commentDetails) return null; // Не відображаємо нічого, якщо даних ще немає

  return (
    <div className="mt-3 pt-3 border-t border-purple-200 text-sm text-gray-600">
      <p>
        <strong>Ім'я:</strong> {commentDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {commentDetails.email}
      </p>
      <p>
        <strong>Текст:</strong> {commentDetails.body}
      </p>
    </div>
  );
}

// --- Компоненти для списків сутностей ---

// Допоміжний компонент для окремого елемента користувача
function UserItem({ user }) {
  const [showDetails, toggleDetails] = useToggle(false); // useToggle для деталей

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-blue-200 flex flex-col">
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{user.name}</h3>
      <p className="text-gray-700 text-sm mb-3">ID: {user.id}</p>

      {/* Умовний рендеринг деталей користувача */}
      {showDetails && <UserDetails userId={user.id} />}

      <button
        onClick={toggleDetails}
        className="mt-auto self-end px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-medium shadow-sm"
      >
        {showDetails ? "Приховати Деталі" : "Показати Деталі"}
      </button>
    </div>
  );
}

// Компонент для відображення списку користувачів
function UserList() {
  const {
    data: users,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchAllUsers, []);

  // Виконуємо запит при першому монтуванні компонента
  useEffect(() => {
    executeFetch();
  }, [executeFetch]); // Залежність від executeFetch

  if (loading)
    return (
      <p className="text-center text-blue-500 text-lg">
        Завантаження користувачів...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-lg">
        Помилка: {error.message}
      </p>
    );
  if (!users || users.length === 0)
    return (
      <p className="text-center text-gray-500 text-lg">
        Немає користувачів для відображення.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

// Допоміжний компонент для окремого елемента посту
function PostItem({ post }) {
  const [showDetails, toggleDetails] = useToggle(false); // useToggle для деталей

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-green-200 flex flex-col">
      <h3 className="text-xl font-semibold text-green-800 mb-2">
        {post.title}
      </h3>
      <p className="text-gray-700 text-sm mb-3">
        ID: {post.id} | Автор (User ID): {post.userId}
      </p>

      {/* Умовний рендеринг деталей посту */}
      {showDetails && <PostDetails postId={post.id} />}

      <button
        onClick={toggleDetails}
        className="mt-auto self-end px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm font-medium shadow-sm"
      >
        {showDetails ? "Приховати Деталі" : "Показати Деталі"}
      </button>
    </div>
  );
}

// Компонент для відображення списку постів
function PostList() {
  const {
    data: posts,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchAllPosts, []);

  // Виконуємо запит при першому монтуванні компонента
  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  if (loading)
    return (
      <p className="text-center text-green-500 text-lg">
        Завантаження постів...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-lg">
        Помилка: {error.message}
      </p>
    );
  if (!posts || posts.length === 0)
    return (
      <p className="text-center text-gray-500 text-lg">
        Немає постів для відображення.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

// Допоміжний компонент для окремого елемента коментаря
function CommentItem({ comment }) {
  const [showDetails, toggleDetails] = useToggle(false); // useToggle для деталей

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-purple-200 flex flex-col">
      <h3 className="text-xl font-semibold text-purple-800 mb-2">
        {comment.name}
      </h3>
      <p className="text-gray-700 text-sm mb-3">
        ID: {comment.id} | Post ID: {comment.postId}
      </p>

      {/* Умовний рендеринг деталей коментаря */}
      {showDetails && <CommentDetails commentId={comment.id} />}

      <button
        onClick={toggleDetails}
        className="mt-auto self-end px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-200 text-sm font-medium shadow-sm"
      >
        {showDetails ? "Приховати Деталі" : "Показати Деталі"}
      </button>
    </div>
  );
}

// Компонент для відображення списку коментарів
function CommentList() {
  const {
    data: comments,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchAllComments, []);

  // Виконуємо запит при першому монтуванні компонента
  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  if (loading)
    return (
      <p className="text-center text-purple-500 text-lg">
        Завантаження коментарів...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-lg">
        Помилка: {error.message}
      </p>
    );
  if (!comments || comments.length === 0)
    return (
      <p className="text-center text-gray-500 text-lg">
        Немає коментарів для відображення.
      </p>
    );

  return (
    <div className="grid grid-cols-1 gap-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

// Експортуємо всі компоненти списків та деталей
export {
  UserList,
  PostList,
  CommentList,
  UserDetails,
  PostDetails,
  CommentDetails,
};
