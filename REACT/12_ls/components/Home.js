import React from "react";

// Компонент домашньої сторінки
function Home() {
  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Ласкаво просимо!
      </h2>
      <p className="text-lg text-gray-600">
        Оберіть форму для демонстрації в навігаційному меню.
      </p>
    </div>
  );
}

export default Home;
