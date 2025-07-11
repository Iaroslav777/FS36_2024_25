import React, { useState } from "react";

// Головний компонент додатку
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <HomeworkPage />
    </div>
  );
}

// Компонент-обгортка HomeworkPage
function HomeworkPage() {
  // 3 об'єкти з довільною інформацією для прокидання через props
  const headerData = {
    title: "Привіт з Заголовка!",
    description: "Це верхня частина нашої сторінки.",
    version: "1.0",
  };

  const footerData = {
    text: "© 2025 Моє Домашнє Завдання. Всі права захищені.",
    author: "Штучний Інтелект", // Цей пропс більше не використовується у Footer
    location: "Фрайберг, Німеччина", // Цей пропс більше не використовується у Footer
  };

  const sidebarData = {
    menuItems: ["Головна", "Про нас", "Послуги", "Контакти"],
    isOpen: true, // Приклад для умовного рендерингу
    info: "Бічна панель з навігацією.",
  };

  return (
    <div className="flex flex-col w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden md:flex-row">
      {/* Клас для Header */}
      <div className="w-full md:w-1/4 bg-blue-600 text-white p-4 rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none">
        <Sidebar data={sidebarData} />
      </div>

      <div className="flex flex-col w-full md:w-3/4">
        {/* Клас для Header */}
        <div className="w-full bg-blue-500 text-white p-4 rounded-tr-lg md:rounded-tr-lg md:rounded-tl-none">
          <Header data={headerData} />
        </div>

        {/* Клас для Content */}
        <div className="flex-grow p-6 bg-gray-50 overflow-y-auto">
          <Content />
        </div>

        {/* Клас для Footer */}
        <div className="w-full bg-gray-800 text-white p-4 rounded-br-lg md:rounded-br-lg md:rounded-bl-none">
          <Footer data={footerData} />
        </div>
      </div>
    </div>
  );
}

// Компонент Header
function Header({ data }) {
  return (
    <header className="text-center">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-lg">{data.description}</p>
      <span className="text-sm opacity-80">Версія: {data.version}</span>
    </header>
  );
}

// Компонент Footer
function Footer({ data }) {
  return (
    <footer className="text-center text-sm">
      <p className="mb-1">{data.text}</p>
      {/* Ці рядки були видалені згідно з запитом користувача */}
      {/* <p>Розроблено: {data.author}</p> */}
      {/* <p>Місцезнаходження: {data.location}</p> */}
    </footer>
  );
}

// Компонент Sidebar (з демонстрацією умовного рендерингу)
function Sidebar({ data }) {
  return (
    <aside className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Навігація</h2>
      {/* Умовний рендеринг: показуємо меню, якщо isOpen true */}
      {data.isOpen ? (
        <ul className="space-y-2">
          {data.menuItems.map((item, index) => (
            <li
              key={index}
              className="text-lg hover:text-blue-200 cursor-pointer transition-colors duration-200"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">Меню тимчасово недоступне.</p>
      )}
      <p className="mt-4 text-sm opacity-90">{data.info}</p>
    </aside>
  );
}

// Компонент Content (з демонстрацією інтерполяції та лічильника)
function Content() {
  // Об'єкт з 2 полями
  const contentInfo = {
    title: "Ласкаво просимо до нашого додатку!",
    describe:
      "Тут ви знайдете цікавий контент та інтерактивні елементи. Цей розділ демонструє виведення даних та роботу лічильника.",
  };

  return (
    <main className="text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {contentInfo.title}
      </h1>
      <p className="text-lg leading-relaxed mb-8 text-center">
        {contentInfo.describe}
      </p>

      <div className="flex justify-center mt-8">
        <Count />
      </div>
    </main>
  );
}

// Компонент Count (лічильник)
function Count() {
  const [count, setCount] = useState(0); // Стан для лічильника

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
      <h2 className="text-3xl font-semibold mb-4 text-blue-700">Лічильник</h2>
      <p className="text-6xl font-extrabold mb-6 text-gray-900">{count}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={decrement}
          className="px-6 py-3 bg-red-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          Зменшити
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Скинути
        </button>
        <button
          onClick={increment}
          className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          Збільшити
        </button>
      </div>
    </div>
  );
}

export default App;
