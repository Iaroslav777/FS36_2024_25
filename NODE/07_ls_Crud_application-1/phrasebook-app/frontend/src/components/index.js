// frontend/src/components/index.js - Все React компоненты

import React, { useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPhrases,
  addPhrase,
  deletePhrase,
  updatePhraseStatus,
  exportPhrasesToFile,
} from "../redux";

// --- MainLayout (Головний макет) ---
function MainLayout() {
  const navigate = useNavigate();
  // Стан для теми, читаємо з LocalStorage при ініціалізації
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // useEffect для застосування класу теми до <html> елемента
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

  // Функція для перемикання теми
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleExport = async () => {
    const dispatch = useDispatch();
    try {
      await dispatch(exportPhrasesToFile()).unwrap();
      alert("Фрази успішно експортовано!");
    } catch (error) {
      alert(`Помилка експорту: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Навігація */}
      <nav className="bg-blue-700 dark:bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-3 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors"
          >
            Список фраз
          </Link>
          <Link
            to="/add"
            className="px-3 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors"
          >
            Додати фразу
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? "Світла тема" : "Темна тема"}
          </button>
          <ExportButton /> {/* Кнопка экспорта */}
        </div>
      </nav>

      {/* Основний контент */}
      <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl transition-colors duration-300">
          <Outlet /> {/* Тут будуть рендеритися вкладені маршрути */}
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white p-4 text-center text-sm shadow-inner transition-colors duration-300">
        &copy; 2024 Словник фраз. Ярослав Бабік.
      </footer>
    </div>
  );
}

// --- PhraseList (Список фраз) ---
function PhraseList() {
  const dispatch = useDispatch();
  const {
    items: phrases,
    loading,
    error,
  } = useSelector((state) => state.phrases);
  const [searchTerm, setSearchTerm] = useState("");

  // Завантаження фраз при завантаженні компонента або зміні searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(fetchPhrases(searchTerm));
    }, 300); // Debounce для пошуку
    return () => clearTimeout(handler);
  }, [dispatch, searchTerm]);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Ви впевнені, що хочете видалити цю фразу?")) {
        try {
          await dispatch(deletePhrase(id)).unwrap();
          alert("Фразу успішно видалено!");
        } catch (err) {
          alert(`Помилка видалення: ${err}`);
        }
      }
    },
    [dispatch]
  );

  const handleToggleLearned = useCallback(
    async (id, currentStatus) => {
      try {
        await dispatch(
          updatePhraseStatus({ id, learned: !currentStatus })
        ).unwrap();
        alert(
          `Статус фрази оновлено до "${
            !currentStatus ? "вивчено" : "не вивчено"
          }"!`
        );
      } catch (err) {
        alert(`Помилка оновлення статусу: ${err}`);
      }
    },
    [dispatch]
  );

  if (loading)
    return (
      <p className="text-center text-blue-500 dark:text-blue-300">
        Завантаження фраз...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 dark:text-red-300">
        Помилка: {error}
      </p>
    );

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Список фраз
      </h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Пошук фраз..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
      {phrases.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Фрази не знайдено. Спробуйте додати нові!
        </p>
      ) : (
        <ul className="space-y-4">
          {phrases.map((phrase) => (
            <li
              key={phrase.id}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center transition-colors duration-300"
            >
              <div className="text-lg mb-2 sm:mb-0 sm:text-left flex-grow">
                <p
                  className={`font-semibold ${
                    phrase.learned
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {phrase.english}
                </p>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {phrase.ukrainian}
                </p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleToggleLearned(phrase.id, phrase.learned)}
                  className={`px-4 py-2 rounded-md font-medium text-white transition-colors duration-200 ${
                    phrase.learned
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {phrase.learned ? "Не вивчено" : "Вивчено"}
                </button>
                <button
                  onClick={() => handleDelete(phrase.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Видалити
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// --- AddPhraseForm (Форма додавання нової фрази) ---
function AddPhraseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [english, setEnglish] = useState("");
  const [ukrainian, setUkrainian] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!english.trim() || !ukrainian.trim()) {
      setStatusMessage("Будь ласка, заповніть обидва поля.");
      return;
    }

    try {
      await dispatch(addPhrase({ english, ukrainian })).unwrap();
      setStatusMessage("Фразу успішно додано!");
      setEnglish("");
      setUkrainian("");
      navigate("/"); // Переходимо на список фраз після додавання
    } catch (err) {
      setStatusMessage(`Помилка додавання: ${err}`);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Додати нову фразу
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="english"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Англійська фраза:
          </label>
          <input
            type="text"
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="ukrainian"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Український переклад:
          </label>
          <input
            type="text"
            id="ukrainian"
            value={ukrainian}
            onChange={(e) => setUkrainian(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
        >
          Додати фразу
        </button>
        {statusMessage && (
          <p
            className={`text-center mt-4 ${
              statusMessage.includes("Помилка")
                ? "text-red-500 dark:text-red-300"
                : "text-green-500 dark:text-green-300"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </form>
    </>
  );
}

// --- ExportButton (Кнопка експорту) ---
function ExportButton() {
  const dispatch = useDispatch();
  const [exportStatus, setExportStatus] = useState("");

  const handleExport = async () => {
    setExportStatus("Експортуємо...");
    try {
      await dispatch(exportPhrasesToFile()).unwrap();
      setExportStatus("Експорт завершено! Файл завантажено.");
      setTimeout(() => setExportStatus(""), 3000); // Очистити повідомлення
    } catch (error) {
      setExportStatus(`Помилка експорту: ${error}`);
      console.error("Помилка експорту:", error);
      setTimeout(() => setExportStatus(""), 5000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleExport}
        className="px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 shadow-md"
      >
        Експортувати в JSON
      </button>
      {exportStatus && (
        <p className="text-sm mt-1 text-white">{exportStatus}</p>
      )}
    </div>
  );
}

// Експортуємо всі компоненти
export { MainLayout, PhraseList, AddPhraseForm, ExportButton };
