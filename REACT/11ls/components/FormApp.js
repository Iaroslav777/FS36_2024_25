import React, { useState } from "react";
import ControlledForm from "./ControlledForm";
import UncontrolledForm from "./UncontrolledForm";

// Головний компонент для демонстрації форм
function FormApp() {
  const [showControlled, setShowControlled] = useState(true); // За замовчуванням показуємо контрольовану форму

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        React Форми
      </h1>

      {/* Перемикачі для типів форм */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setShowControlled(true)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
            ${
              showControlled
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Контрольована Форма
        </button>
        <button
          onClick={() => setShowControlled(false)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
            ${
              !showControlled
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Неконтрольована Форма
        </button>
      </div>

      {/* Умовний рендеринг обраної форми */}
      {showControlled ? <ControlledForm /> : <UncontrolledForm />}
    </div>
  );
}

export default FormApp;
