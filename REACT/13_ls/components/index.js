import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useFetch, useToggle } from "../hooks"; // Імпортуємо хуки з єдиного файлу hooks/index.js
import {
  fetchAllUsers,
  fetchUserById,
  fetchAllPosts,
  fetchPostById,
  fetchAllComments,
  fetchCommentById,
} from "../services/api"; // Імпортуємо API-функції з services/api.js
import { registrationSchema, contactSchema } from "../validation/schemas"; // Імпортуємо схеми валідації

// --- Головний макет та навігація ---

function MainLayout() {
  return (
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
          to="/users"
          className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          Користувачі
        </Link>
        <Link
          to="/posts"
          className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          Пости
        </Link>
        <Link
          to="/comments"
          className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          Коментарі
        </Link>
        <Link
          to="/forms"
          className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          Форми
        </Link>
      </nav>

      {/* Область для відображення компонентів за маршрутом */}
      <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />{" "}
          {/* Деталі користувача */}
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />{" "}
          {/* Деталі посту */}
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/comments/:id" element={<CommentDetailPage />} />{" "}
          {/* Деталі коментаря */}
          <Route path="/forms" element={<FormsPage />} />
        </Routes>
      </main>

      {/* Футер */}
      <footer className="p-4 bg-gray-800 text-white text-center text-sm rounded-b-xl shadow-inner">
        <p>© 2025 Домашнє Завдання 13. Бабік Ярослав.</p>
      </footer>
    </div>
  );
}

// --- Сторінки додатку ---

// Довільна домашня сторінка
function HomePage() {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Вітаємо на сторінці Домашнього Завдання 13!
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Цей додаток демонструє можливості React Routing, роботу з API та форми
        Formik/Yup.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/users"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Переглянути Користувачів
        </Link>
        <Link
          to="/posts"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          Переглянути Пости
        </Link>
        <Link
          to="/comments"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
        >
          Переглянути Коментарі
        </Link>
        <Link
          to="/forms"
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold"
        >
          Перейти до Форм
        </Link>
      </div>
    </div>
  );
}

// Сторінка зі списком користувачів
function UsersPage() {
  const {
    data: users,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchAllUsers, []);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  if (loading)
    return (
      <p className="text-center text-blue-500 text-xl">
        Завантаження користувачів...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl">
        Помилка: {error.message}
      </p>
    );
  if (!users || users.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl">
        Немає користувачів для відображення.
      </p>
    );

  return (
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
            <Link
              to={`/users/${user.id}`}
              className="mt-auto self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-sm"
            >
              Деталі
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Сторінка зі списком постів
function PostsPage() {
  const {
    data: posts,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchAllPosts, []);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  if (loading)
    return (
      <p className="text-center text-green-500 text-xl">
        Завантаження постів...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl">
        Помилка: {error.message}
      </p>
    );
  if (!posts || posts.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl">
        Немає постів для відображення.
      </p>
    );

  return (
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
  );
}

// Сторінка зі списком коментарів
function CommentsPage() {
  const {
    data: comments,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchAllComments, []);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  if (loading)
    return (
      <p className="text-center text-purple-500 text-xl">
        Завантаження коментарів...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl">
        Помилка: {error.message}
      </p>
    );
  if (!comments || comments.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl">
        Немає коментарів для відображення.
      </p>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Список Коментарів
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-200 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-purple-800 mb-2">
              {comment.name}
            </h3>
            <p className="text-gray-700 text-sm mb-3">Email: {comment.email}</p>
            <p className="text-gray-600 text-xs mb-3">
              {comment.body.substring(0, 100)}...
            </p>
            <Link
              to={`/comments/${comment.id}`}
              className="mt-auto self-end px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-medium shadow-sm"
            >
              Деталі
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Сторінка для демонстрації форм Formik
function FormsPage() {
  const [showRegistration, setShowRegistration] = useState(true); // За замовчуванням показуємо форму реєстрації

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Форми Formik та Yup
      </h2>

      {/* Перемикачі для форм */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setShowRegistration(true)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
            ${
              showRegistration
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Форма Реєстрації
        </button>
        <button
          onClick={() => setShowRegistration(false)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
            ${
              !showRegistration
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Контактна Форма
        </button>
      </div>

      {/* Умовний рендеринг обраної форми */}
      {showRegistration ? <RegistrationForm /> : <ContactForm />}
    </div>
  );
}

// Компонент форми реєстрації (Formik + Yup)
function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "чоловік",
      subscribe: false,
      favoriteColor: "",
    },
    validationSchema: registrationSchema, // Підключаємо Yup схему
    onSubmit: (values) => {
      console.log("Дані форми реєстрації:", values);
      alert("Форма реєстрації успішно відправлена! Перевірте консоль.");
      formik.resetForm(); // Очищаємо форму після відправки
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Форма Реєстрації (Formik)
      </h2>

      {/* Поле для імені */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ім'я:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Для відображення помилок при втраті фокусу
          value={formik.values.name}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ваше ім'я"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

      {/* Поле для email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="your.email@example.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      {/* Поле для пароля */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Пароль:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ваш пароль"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      {/* Поле для підтвердження пароля */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Підтвердіть пароль:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Підтвердіть пароль"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      {/* Вибір статі (select) */}
      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Стать:
        </label>
        <select
          id="gender"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="чоловік">Чоловік</option>
          <option value="жінка">Жінка</option>
          <option value="інше">Інше</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.gender}
          </div>
        ) : null}
      </div>

      {/* Чекбокс для підписки */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="subscribe"
          name="subscribe"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.subscribe}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">
          Підписатися на розсилку
        </label>
      </div>

      {/* Радіо кнопки для улюбленого кольору */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Улюблений колір:
        </span>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="червоний"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.favoriteColor === "червоний"}
              className="form-radio h-4 w-4 text-red-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Червоний</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="синій"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.favoriteColor === "синій"}
              className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Синій</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="зелений"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.favoriteColor === "зелений"}
              className="form-radio h-4 w-4 text-green-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Зелений</span>
          </label>
        </div>
        {formik.touched.favoriteColor && formik.errors.favoriteColor ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.favoriteColor}
          </div>
        ) : null}
      </div>

      {/* Кнопка відправки */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={formik.isSubmitting} // Деактивуємо кнопку під час відправки
      >
        Відправити Реєстрацію
      </button>
    </form>
  );
}

// Компонент контактної форми (Formik + Yup)
function ContactForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema, // Підключаємо Yup схему
    onSubmit: (values) => {
      console.log("Дані контактної форми:", values);
      alert("Контактна форма успішно відправлена! Перевірте консоль.");
      formik.resetForm(); // Очищаємо форму після відправки
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Контактна Форма (Formik)
      </h2>

      {/* Поле для імені */}
      <div>
        <label
          htmlFor="contactName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ім'я:
        </label>
        <input
          type="text"
          id="contactName"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ваше ім'я"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

      {/* Поле для email */}
      <div>
        <label
          htmlFor="contactEmail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email:
        </label>
        <input
          type="email"
          id="contactEmail"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="your.email@example.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      {/* Поле для теми */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Тема:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Тема вашого повідомлення"
        />
        {formik.touched.subject && formik.errors.subject ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.subject}
          </div>
        ) : null}
      </div>

      {/* Поле для повідомлення (textarea) */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Повідомлення:
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          placeholder="Напишіть ваше повідомлення тут..."
        ></textarea>
        {formik.touched.message && formik.errors.message ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.message}
          </div>
        ) : null}
      </div>

      {/* Кнопка відправки */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        disabled={formik.isSubmitting}
      >
        Відправити Контакт
      </button>
    </form>
  );
}

// --- Сторінки деталей ---

// Сторінка деталей користувача
function UserDetailPage() {
  const { id } = useParams(); // Отримуємо ID з URL
  const {
    data: userDetails,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchUserById);

  useEffect(() => {
    // Виконуємо запит на отримання деталей при зміні ID
    if (id) {
      executeFetch(id);
    }
  }, [id, executeFetch]);

  if (loading)
    return (
      <p className="text-center text-blue-500 text-xl">
        Завантаження деталей користувача...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl">
        Помилка: {error.message}
      </p>
    );
  if (!userDetails)
    return (
      <p className="text-center text-gray-500 text-xl">
        Користувача не знайдено.
      </p>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Деталі Користувача: {userDetails.name}
      </h2>
      <div className="space-y-3 text-lg text-gray-700">
        <p>
          <strong>Ім'я користувача:</strong> {userDetails.username}
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
      <div className="mt-8 text-center">
        <Link
          to="/users"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
        >
          Повернутися до списку користувачів
        </Link>
      </div>
    </div>
  );
}

// Сторінка деталей посту
function PostDetailPage() {
  const { id } = useParams(); // Отримуємо ID з URL
  const {
    data: postDetails,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchPostById);

  useEffect(() => {
    // Виконуємо запит на отримання деталей при зміні ID
    if (id) {
      executeFetch(id);
    }
  }, [id, executeFetch]);

  if (loading)
    return (
      <p className="text-center text-green-500 text-xl">
        Завантаження деталей посту...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl">
        Помилка: {error.message}
      </p>
    );
  if (!postDetails)
    return (
      <p className="text-center text-gray-500 text-xl">Посту не знайдено.</p>
    );

  return (
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
  );
}

// Сторінка деталей коментаря
function CommentDetailPage() {
  const { id } = useParams(); // Отримуємо ID з URL
  const {
    data: commentDetails,
    loading,
    error,
    executeFetch,
  } = useFetch(fetchCommentById);

  useEffect(() => {
    // Виконуємо запит на отримання деталей при зміні ID
    if (id) {
      executeFetch(id);
    }
  }, [id, executeFetch]);

  if (loading)
    return (
      <p className="text-center text-purple-500 text-xl">
        Завантаження деталей коментаря...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl">
        Помилка: {error.message}
      </p>
    );
  if (!commentDetails)
    return (
      <p className="text-center text-gray-500 text-xl">
        Коментаря не знайдено.
      </p>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Деталі Коментаря: {commentDetails.name}
      </h2>
      <div className="space-y-3 text-lg text-gray-700">
        <p>
          <strong>Ім'я:</strong> {commentDetails.name}
        </p>
        <p>
          <strong>Email:</strong> {commentDetails.email}
        </p>
        <p>
          <strong>Текст:</strong> {commentDetails.body}
        </p>
        <p>
          <strong>Post ID:</strong> {commentDetails.postId}
        </p>
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/comments"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold"
        >
          Повернутися до списку коментарів
        </Link>
      </div>
    </div>
  );
}

// Експортуємо всі компоненти з цього файлу
export {
  MainLayout,
  HomePage,
  UsersPage,
  PostsPage,
  CommentsPage,
  FormsPage,
  RegistrationForm,
  ContactForm,
  UserDetailPage,
  PostDetailPage,
  CommentDetailPage,
};
