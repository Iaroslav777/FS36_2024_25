import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Хуки для взаємодії з Redux
import { fetchPosts, fetchUsers } from "../redux"; // Імпортуємо Async Thunks
import { fetchPostById, fetchUserById } from "../services/api"; // API для деталей (прямі запити)

// --- Головний макет та навігація (MainLayout) ---

function MainLayout() {
  return (
    <>
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col min-h-[calc(100vh-2rem)]">
        {/* Навігаційне меню */}
        <nav className="flex flex-wrap justify-center space-x-4 p-4 bg-blue-700 text-white shadow-md rounded-t-xl">
          <Link
            to="/"
            className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Головна
          </Link>
          <Link
            to="/posts"
            className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Пости
          </Link>
          <Link
            to="/users"
            className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Користувачі
          </Link>
          <Link
            to="/create-post"
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 font-medium"
          >
            Створити Пост
          </Link>
        </nav>

        {/* Область для відображення вкладених компонентів */}
        <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
          <Outlet /> {/* Тут будуть рендеритися вкладені маршрути */}
        </main>

        {/* Футер */}
        <footer className="p-4 bg-gray-800 text-white text-center text-sm rounded-b-xl shadow-inner">
          <p>© 2025 Екзаменаційна Робота. Бабік Ярослав.</p>
        </footer>
      </div>
    </>
  );
}

// --- Сторінки додатку ---

// Домашня сторінка
function HomePage() {
  return (
    <>
      <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Вітаємо на Блог-Панелі!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Цей додаток демонструє React Router, Redux Toolkit та взаємодію з API.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/posts"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Переглянути Пости
          </Link>
          <Link
            to="/users"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Переглянути Користувачів
          </Link>
          <Link
            to="/create-post"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
          >
            Створити Новий Пост
          </Link>
        </div>
      </div>
    </>
  );
}

// Сторінка зі списком постів
function PostsPage() {
  const dispatch = useDispatch();
  const { items: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // Завантажуємо пости, якщо їх ще немає в стані або якщо була помилка
    if (posts.length === 0 && !loading && !error) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length, loading, error]);

  if (loading)
    return (
      <p className="text-center text-green-500 text-xl">
        Завантаження постів...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 text-xl">Помилка: {error}</p>;
  if (!posts || posts.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl">
        Немає постів для відображення.
      </p>
    );

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Список Постів
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                Автор (User ID): {post.userId}
              </p>
              <p className="text-gray-600 text-xs mb-3">
                {post.body.substring(0, 100)}...
              </p>
              <Link
                to={`/posts/${post.id}`}
                className="mt-auto self-end px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                Деталі
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Сторінка зі списком користувачів
function UsersPage() {
  const dispatch = useDispatch();
  const { items: users, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate(); // Хук для навігації

  useEffect(() => {
    // Завантажуємо користувачів, якщо їх ще немає в стані або якщо була помилка
    if (users.length === 0 && !loading && !error) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length, loading, error]);

  // Функція для переходу на сторінку деталей користувача з передачею стану
  const handleViewDetails = (user) => {
    navigate(`/users/${user.id}`, { state: { user } });
  };

  if (loading)
    return (
      <p className="text-center text-blue-500 text-xl">
        Завантаження користувачів...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 text-xl">Помилка: {error}</p>;
  if (!users || users.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl">
        Немає користувачів для відображення.
      </p>
    );

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Список Користувачів
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {user.name}
              </h3>
              <p className="text-gray-700 text-sm mb-3">@{user.username}</p>
              <p className="text-gray-600 text-xs mb-3">{user.email}</p>
              <button
                onClick={() => handleViewDetails(user)} // Використовуємо кнопку з useNavigate
                className="mt-auto self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                Деталі
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// --- Сторінки деталей ---

// Сторінка деталей посту (використовує useParams та fetchPostById)
function PostDetailPage() {
  const { id } = useParams(); // Отримуємо ID з URL
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      fetchPostById(id)
        .then((data) => setPostDetails(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-green-500 text-xl">
        Завантаження деталей посту...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 text-xl">Помилка: {error}</p>;
  if (!postDetails)
    return (
      <p className="text-center text-gray-500 text-xl">Посту не знайдено.</p>
    );

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Деталі Посту: {postDetails.title}
        </h2>
        <div className="space-y-3 text-lg text-gray-700">
          <p>
            <strong>Заголовок:</strong> {postDetails.title}
          </p>
          <p>
            <strong>Текст:</strong> {postDetails.body}
          </p>
          <p>
            <strong>Автор (User ID):</strong> {postDetails.userId}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/posts"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
          >
            Повернутися до списку постів
          </Link>
        </div>
      </div>
    </>
  );
}

// Сторінка деталей користувача (використовує useLocation)
function UserDetailPage() {
  const { id } = useParams(); // Отримуємо ID з URL
  const location = useLocation(); // Отримуємо об'єкт location
  const navigate = useNavigate(); // Для переходу назад

  // Спробуємо отримати дані користувача зі state, якщо вони були передані
  const userDetailsFromState = location.state?.user;

  // Якщо дані не передані через state, тоді робимо запит
  const [userFromFetch, setUserFromFetch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Робимо запит лише якщо даних немає в state
    if (!userDetailsFromState && id) {
      setLoading(true);
      setError(null);
      fetchUserById(id)
        .then((data) => setUserFromFetch(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, userDetailsFromState]); // Залежності: id та userDetailsFromState

  const userToDisplay = userDetailsFromState || userFromFetch;

  if (loading)
    return (
      <p className="text-center text-blue-500 text-xl">
        Завантаження деталей користувача...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 text-xl">Помилка: {error}</p>;
  if (!userToDisplay)
    return (
      <p className="text-center text-gray-500 text-xl">
        Користувача не знайдено.
      </p>
    );

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Деталі Користувача: {userToDisplay.name}
        </h2>
        <div className="space-y-3 text-lg text-gray-700">
          <p>
            <strong>Ім'я користувача:</strong> {userToDisplay.username}
          </p>
          <p>
            <strong>Email:</strong> {userToDisplay.email}
          </p>
          <p>
            <strong>Телефон:</strong> {userToDisplay.phone}
          </p>
          <p>
            <strong>Вебсайт:</strong>{" "}
            <a
              href={`http://${userToDisplay.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {userToDisplay.website}
            </a>
          </p>
          <p>
            <strong>Компанія:</strong> {userToDisplay.company?.name}
          </p>
          <p>
            <strong>Місто:</strong> {userToDisplay.address?.city}
          </p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/users")} // Повернення до списку користувачів
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Повернутися до списку користувачів
          </button>
        </div>
      </div>
    </>
  );
}

// Компонент форми для створення нового посту
function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !userId.trim()) {
      setStatus("Будь ласка, заповніть всі поля.");
      return;
    }

    const newPost = {
      title,
      body,
      userId: parseInt(userId), // Перетворюємо ID користувача на число
    };

    console.log("Новий пост для відправки:", newPost);
    setStatus("Пост успішно створено (дані в консолі)!");
    // В реальному додатку тут був би dispatch(createPost(newPost)) або API-запит
    setTitle("");
    setBody("");
    setUserId("");
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Створити Новий Пост
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="postTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Заголовок Посту:
            </label>
            <input
              type="text"
              id="postTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Введіть заголовок"
              required
            />
          </div>
          <div>
            <label
              htmlFor="postBody"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Текст Посту:
            </label>
            <textarea
              id="postBody"
              rows="5"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-y"
              placeholder="Введіть текст посту"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="postUserId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ID Користувача:
            </label>
            <input
              type="number"
              id="postUserId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Введіть ID користувача (наприклад, 1)"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200"
          >
            Створити Пост
          </button>
          {status && (
            <p className="mt-4 text-center text-sm font-medium text-purple-700">
              {status}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

// Експортуємо всі компоненти з цього файлу
export {
  MainLayout,
  HomePage,
  PostsPage,
  PostDetailPage,
  UsersPage,
  UserDetailPage,
  CreatePostForm,
};
