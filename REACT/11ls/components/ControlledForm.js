import React, { useState } from "react";

// Компонент контрольованої форми
function ControlledForm() {
  // Стан для кожного поля форми
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("чоловік"); // Значення за замовчуванням для select
  const [subscribe, setSubscribe] = useState(false); // Для чекбоксу
  const [favoriteColor, setFavoriteColor] = useState(""); // Для радіо кнопок

  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігаємо стандартній поведінці форми (перезавантаженню сторінки)
    const formData = {
      name,
      email,
      message,
      gender,
      subscribe,
      favoriteColor,
    };
    console.log("Дані контрольованої форми:", formData);
    alert("Дані контрольованої форми відправлено! Перевірте консоль."); // Використовуємо alert для демонстрації

    // Очищення форми (якщо потрібно)
    setName("");
    setEmail("");
    setMessage("");
    setGender("чоловік");
    setSubscribe(false);
    setFavoriteColor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Контрольована Форма
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
          value={name} // Значення контролюється станом
          onChange={(e) => setName(e.target.value)} // Оновлення стану при зміні
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ваше ім'я"
          required
        />
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="your.email@example.com"
          required
        />
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          placeholder="Напишіть ваше повідомлення тут..."
        ></textarea>
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
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="чоловік">Чоловік</option>
          <option value="жінка">Жінка</option>
          <option value="інше">Інше</option>
        </select>
      </div>

      {/* Чекбокс для підписки */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="subscribe"
          name="subscribe"
          checked={subscribe}
          onChange={(e) => setSubscribe(e.target.checked)}
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
              checked={favoriteColor === "червоний"}
              onChange={(e) => setFavoriteColor(e.target.value)}
              className="form-radio h-4 w-4 text-red-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Червоний</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="синій"
              checked={favoriteColor === "синій"}
              onChange={(e) => setFavoriteColor(e.target.value)}
              className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Синій</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="зелений"
              checked={favoriteColor === "зелений"}
              onChange={(e) => setFavoriteColor(e.target.value)}
              className="form-radio h-4 w-4 text-green-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Зелений</span>
          </label>
        </div>
      </div>

      {/* Кнопка відправки */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Відправити (Контрольована)
      </button>
    </form>
  );
}

export default ControlledForm;
