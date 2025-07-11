import React, { useState, useEffect } from "react";

// Функціональна компонента Content2
function Content2() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Початкове повідомлення");
  const [data, setData] = useState(null); // Для симуляції завантаження даних
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // 1. useEffect без масиву залежностей (виконується при кожному рендерингу)
  // Використовувати з обережністю, може призвести до нескінченних циклів
  useEffect(() => {
    console.log(
      "Content2: useEffect (без залежностей) - Компонент рендерився або оновлювався."
    );
    // Приклад: оновлення лічильника рендерингів (не рекомендується для складних операцій)
    // Якщо тут змінювати стан, це викличе нескінченний цикл
  });

  // 2. useEffect з порожнім масивом залежностей [] (виконується один раз при монтуванні)
  // Еквівалент componentDidMount
  useEffect(() => {
    console.log(
      "Content2: useEffect (порожні залежності) - Компонент змонтовано."
    );

    // Приклад: Завантаження даних з бекенду (симуляція з setTimeout)
    const fetchData = setTimeout(() => {
      setData({
        id: 1,
        title: "Завантажені дані",
        description: "Це дані, завантажені при монтуванні компонента.",
      });
      console.log(
        "Content2: useEffect (порожні залежності) - Дані завантажено."
      );
    }, 2000);

    // Приклад: Додавання глобального обробника подій
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    console.log(
      "Content2: useEffect (порожні залежності) - Додано обробник подій миші."
    );

    // Функція очищення (виконується при демонтуванні компонента)
    // Еквівалент componentWillUnmount
    return () => {
      console.log(
        "Content2: useEffect (очищення) - Компонент буде демонтовано."
      );
      clearTimeout(fetchData); // Очищаємо таймер, якщо він ще не спрацював
      window.removeEventListener("mousemove", handleMouseMove); // Видаляємо обробник подій
      console.log("Content2: useEffect (очищення) - Ресурси очищено.");
    };
  }, []); // Порожній масив залежностей

  // 3. useEffect з залежностями [count] (виконується при монтуванні та при зміні 'count')
  // Еквівалент componentDidMount + componentDidUpdate для конкретної залежності
  useEffect(() => {
    console.log(
      `Content2: useEffect (залежність від count) - Count змінився на: ${count}`
    );
    if (count > 0) {
      setMessage(`Лічильник: ${count}. Гарна робота!`);
    } else {
      setMessage("Лічильник скинуто.");
    }
    // Приклад: зміна стилів або виконання інших дій при зміні 'count'
    const countDisplay = document.getElementById("count-display");
    if (countDisplay) {
      countDisplay.style.color = count % 2 === 0 ? "blue" : "red";
    }
  }, [count]); // Залежність від змінної 'count'

  // Функції для керування лічильником
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-3xl font-semibold mb-4 text-purple-700">
        Динамічний Контент 2 (Функціональний)
      </h2>

      <div className="mb-6">
        <p className="text-lg text-gray-700">
          Повідомлення:{" "}
          <span className="font-medium text-indigo-600">{message}</span>
        </p>
        <p className="text-xl font-bold mt-2">
          Лічильник:{" "}
          <span id="count-display" className="transition-colors duration-300">
            {count}
          </span>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Зменшити
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Скинути
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Збільшити
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">
          Завантаження даних (useEffect з [])
        </h3>
        {data ? (
          <div className="bg-blue-50 p-3 rounded-md text-left">
            <p className="font-medium">{data.title}</p>
            <p className="text-sm text-gray-600">{data.description}</p>
          </div>
        ) : (
          <p className="text-gray-500">Дані завантажуються...</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-teal-600">
          Події миші (useEffect з [])
        </h3>
        <div className="bg-teal-50 p-3 rounded-md">
          <p className="text-gray-700">Рухайте мишкою по екрану:</p>
          <p className="font-mono text-sm">
            X: {mouseX}, Y: {mouseY}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content2;
