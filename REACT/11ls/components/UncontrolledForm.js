import React, { useRef } from "react";

// Компонент неконтрольованої форми
function UncontrolledForm() {
  // Створюємо рефи для доступу до DOM-елементів форми
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const genderRef = useRef(null);
  const subscribeRef = useRef(null);
  // Для радіо кнопок, можна використовувати один реф для групи або окремі
  const redColorRef = useRef(null);
  const blueColorRef = useRef(null);
  const greenColorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігаємо стандартній поведінці форми

    // Отримуємо значення безпосередньо з DOM за допомогою рефів
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
      gender: genderRef.current.value,
      subscribe: subscribeRef.current.checked,
      favoriteColor: redColorRef.current.checked
        ? redColorRef.current.value
        : blueColorRef.current.checked
        ? blueColorRef.current.value
        : greenColorRef.current.checked
        ? greenColorRef.current.value
        : "",
    };
    console.log("Дані неконтрольованої форми:", formData);
    alert("Дані неконтрольованої форми відправлено! Перевірте консоль."); // Використовуємо alert для демонстрації

    // Очищення форми (потрібно вручну маніпулювати DOM або скидати форму)
    e.target.reset(); // Скидаємо форму за допомогою вбудованого методу DOM
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Неконтрольована Форма
      </h2>

      {/* Поле для імені */}
      <div>
        <label
          htmlFor="uncontrolledName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ім'я:
        </label>
        <input
          type="text"
          id="uncontrolledName"
          name="name"
          ref={nameRef} // Прив'язуємо реф
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ваше ім'я"
          required
        />
      </div>

      {/* Поле для email */}
      <div>
        <label
          htmlFor="uncontrolledEmail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email:
        </label>
        <input
          type="email"
          id="uncontrolledEmail"
          name="email"
          ref={emailRef}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="your.email@example.com"
          required
        />
      </div>

      {/* Поле для повідомлення (textarea) */}
      <div>
        <label
          htmlFor="uncontrolledMessage"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Повідомлення:
        </label>
        <textarea
          id="uncontrolledMessage"
          name="message"
          rows="4"
          ref={messageRef}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          placeholder="Напишіть ваше повідомлення тут..."
        ></textarea>
      </div>

      {/* Вибір статі (select) */}
      <div>
        <label
          htmlFor="uncontrolledGender"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Стать:
        </label>
        <select
          id="uncontrolledGender"
          name="gender"
          ref={genderRef}
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
          id="uncontrolledSubscribe"
          name="subscribe"
          ref={subscribeRef}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label
          htmlFor="uncontrolledSubscribe"
          className="ml-2 text-sm text-gray-700"
        >
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
              ref={redColorRef}
              className="form-radio h-4 w-4 text-red-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Червоний</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="синій"
              ref={blueColorRef}
              className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Синій</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="зелений"
              ref={greenColorRef}
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
        Відправити (Неконтрольована)
      </button>
    </form>
  );
}

export default UncontrolledForm;
