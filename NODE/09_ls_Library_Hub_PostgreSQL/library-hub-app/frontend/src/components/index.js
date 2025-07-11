// frontend/src/components/index.js - Всі React компоненти

import React, { useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
  fetchBookById,
  setCurrentPage,
  clearSelectedBook,
} from "../redux";

// --- MainLayout (Головний макет) ---
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Навігація */}
      <nav className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Список книг
          </Link>
          <Link
            to="/add"
            className="px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Додати книгу
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Library Hub</h1>
      </nav>

      {/* Основний контент */}
      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-xl">
          <Outlet /> {/* Тут будуть рендеритися вкладені маршрути */}
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm shadow-inner">
        &copy; 2024 Library Hub. Ярослав Бабік.
      </footer>
    </div>
  );
}

// --- BookList (Список книг) ---
function BookList() {
  const dispatch = useDispatch();
  const {
    items: books,
    loading,
    error,
    currentPage,
    totalPages,
  } = useSelector((state) => state.books);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const selectedBook = useSelector((state) => state.books.selectedBook); // Отримуємо вибрану книгу з Redux

  // Завантаження книг при завантаженні компонента або зміні сторінки
  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Ви впевнені, що хочете видалити цю книгу?")) {
        try {
          await dispatch(deleteBook(id)).unwrap();
          alert("Книгу успішно видалено!");
          // Після видалення, перезавантажуємо поточну сторінку, щоб оновити пагінацію
          dispatch(fetchBooks({ page: currentPage, limit: 10 }));
        } catch (err) {
          alert(`Помилка видалення: ${err.message}`);
        }
      }
    },
    [dispatch, currentPage]
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/edit/${id}`);
    },
    [navigate]
  );

  const handleViewDetails = useCallback(
    async (id) => {
      try {
        await dispatch(fetchBookById(id)).unwrap();
        setShowModal(true); // Показуємо модальне вікно після завантаження деталей
      } catch (err) {
        alert(`Помилка завантаження деталей книги: ${err.message}`);
      }
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    dispatch(clearSelectedBook()); // Очищаємо вибрану книгу в Redux
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-blue-500">Завантаження книг...</p>;
  if (error)
    return <p className="text-center text-red-500">Помилка: {error}</p>;

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Список книг
      </h2>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">
          Книг не знайдено. Спробуйте додати нові!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Назва
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Автор
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Рік
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Рейтинг
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td
                    className="py-3 px-4 text-blue-600 hover:underline cursor-pointer"
                    onClick={() => handleViewDetails(book.id)}
                  >
                    {book.title}
                  </td>
                  <td className="py-3 px-4">{book.author}</td>
                  <td className="py-3 px-4">{book.publication_year}</td>
                  <td className="py-3 px-4">{book.rating}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Пагінація */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Попередня
          </button>
          <span className="text-lg font-medium">
            Сторінка {currentPage} з {totalPages}
          </span>
          <button
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Наступна
          </button>
        </div>
      )}

      {/* Модальне вікно деталей книги */}
      {showModal && selectedBook && (
        <BookDetailsModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </>
  );
}

// --- BookForm (Форма додавання/редагування книги) ---
function BookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Отримуємо ID, якщо це режим редагування
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [rating, setRating] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Завантажуємо дані книги, якщо це режим редагування
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      dispatch(fetchBookById(id))
        .unwrap()
        .then((book) => {
          setTitle(book.title);
          setAuthor(book.author);
          setPublicationYear(book.publication_year);
          setRating(book.rating);
        })
        .catch((err) => {
          setStatusMessage(`Помилка завантаження книги: ${err.message}`);
          console.error(err);
        });
    } else {
      setIsEditing(false);
      // Очищаємо форму при переході з режиму редагування на додавання
      setTitle("");
      setAuthor("");
      setPublicationYear("");
      setRating("");
    }
  }, [id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    // Валідація форми
    if (!title.trim() || !author.trim() || !publicationYear || !rating) {
      setStatusMessage("Будь ласка, заповніть всі поля.");
      return;
    }
    const year = parseInt(publicationYear);
    const rate = parseInt(rating);

    if (isNaN(year) || year < 1000 || year > new Date().getFullYear() + 5) {
      // Проста перевірка року
      setStatusMessage(
        "Рік видання має бути дійсним числом (наприклад, 2023)."
      );
      return;
    }
    if (isNaN(rate) || rate < 1 || rate > 5) {
      setStatusMessage("Рейтинг має бути числом від 1 до 5.");
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      publication_year: year,
      rating: rate,
    };

    try {
      if (isEditing) {
        await dispatch(updateBook({ id, bookData })).unwrap();
        setStatusMessage("Книгу успішно оновлено!");
      } else {
        await dispatch(addBook(bookData)).unwrap();
        setStatusMessage("Книгу успішно додано!");
      }
      // Очищаємо форму після успішної операції
      setTitle("");
      setAuthor("");
      setPublicationYear("");
      setRating("");
      navigate("/"); // Переходимо на список книг після додавання/редагування
    } catch (err) {
      setStatusMessage(`Помилка: ${err.message}`);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {isEditing ? "Редагувати книгу" : "Додати нову книгу"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Назва:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Автор:
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="publicationYear"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Рік видання:
          </label>
          <input
            type="number"
            id="publicationYear"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1000" // Мінімальний рік
            max={new Date().getFullYear() + 5} // Максимальний рік (з невеликим запасом)
          />
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Рейтинг (1-5):
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            max="5"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
        >
          {isEditing ? "Зберегти зміни" : "Додати книгу"}
        </button>
        {statusMessage && (
          <p
            className={`text-center mt-4 ${
              statusMessage.includes("Помилка")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </form>
    </>
  );
}

// --- BookDetailsModal (Модальне вікно деталей книги) ---
function BookDetailsModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Зупиняємо розповсюдження кліку */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Деталі книги</h3>
        <p className="text-lg mb-2">
          <strong className="text-gray-700">Назва:</strong> {book.title}
        </p>
        <p className="text-lg mb-2">
          <strong className="text-gray-700">Автор:</strong> {book.author}
        </p>
        <p className="text-lg mb-2">
          <strong className="text-gray-700">Рік видання:</strong>{" "}
          {book.publication_year}
        </p>
        <p className="text-lg mb-2">
          <strong className="text-gray-700">Рейтинг:</strong> {book.rating} / 5
        </p>
        <p className="text-sm text-gray-500 mt-4">ID: {book.id}</p>
      </div>
    </div>
  );
}

// Експортуємо всі компоненти
export { MainLayout, BookList, BookForm, BookDetailsModal };
