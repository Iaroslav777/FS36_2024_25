import React, { useState, useRef, useId } from "react";

// Компонент TaskInput для додавання нових завдань
function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState("");
  const [taskCategory, setTaskCategory] = useState("Особисте"); // Категорія за замовчуванням
  const inputRef = useRef(null); // useRef для автофокусу
  const uniqueId = useId(); // useId для унікального ID (хоча для завдань ми генеруємо ID в useTaskReducer)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText, taskCategory);
      setTaskText(""); // Очистити поле вводу
      inputRef.current.focus(); // Автофокус після додавання
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 mb-6"
    >
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        ref={inputRef} // Прив'язуємо реф до поля вводу
        placeholder="Додати нове завдання..."
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
      />
      <select
        value={taskCategory}
        onChange={(e) => setTaskCategory(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
      >
        <option value="Особисте">Особисте</option>
        <option value="Робота">Робота</option>
        <option value="Навчання">Навчання</option>
      </select>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        Додати
      </button>
    </form>
  );
}

export default TaskInput;
