import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Хуки для взаємодії з Redux
import {
  increment,
  decrement,
  addTen,
  subtractTen,
  divideByTwo,
  setZero,
  setHundred,
} from "../redux"; // Імпортуємо генератори дій з єдиного файлу redux/index.js

// Компонент лічильника
function Counter() {
  // useSelector - хук для отримання даних зі стану Redux Store
  const count = useSelector((state) => state.count);
  // useDispatch - хук для отримання функції dispatch, яка дозволяє відправляти дії
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
        Redux Лічильник
      </h1>

      {/* Відображення поточного значення лічильника */}
      <div className="text-8xl font-black text-gray-900 mb-8">{count}</div>

      {/* Кнопки для зміни лічильника */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => dispatch(increment())}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
        >
          -1
        </button>
        <button
          onClick={() => dispatch(addTen())}
          className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-colors duration-200"
        >
          +10
        </button>
        <button
          onClick={() => dispatch(subtractTen())}
          className="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-colors duration-200"
        >
          -10
        </button>
        <button
          onClick={() => dispatch(divideByTwo())}
          className="px-6 py-3 bg-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-200"
        >
          /2
        </button>
        <button
          onClick={() => dispatch(setZero())}
          className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
        >
          Set 0
        </button>
      </div>

      <button
        onClick={() => dispatch(setHundred())}
        className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
      >
        Set 100
      </button>
    </div>
  );
}

export { Counter };
