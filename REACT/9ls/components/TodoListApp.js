import React, { useState, useEffect, useMemo, useCallback } from "react";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import useLocalStorage from "../hooks/useLocalStorage"; // Кастомний хук для localStorage
import useTaskReducer from "../hooks/useTaskReducer"; // Кастомний хук для useReducer

// Компонент TodoListApp - головний компонент для списку завдань
function TodoListApp() {
  // Використовуємо useLocalStorage для збереження та завантаження завдань
  // useLocalStorage повертає [value, setValue], а useTaskReducer очікує початковий стан.
  // Тому ми передаємо початковий стан з useLocalStorage до useTaskReducer.
  const [storedTasks, setStoredTasks] = useLocalStorage("todos", []);
  const [tasks, dispatch] = useTaskReducer(storedTasks);

  // useEffect для синхронізації стану useReducer з localStorage
  // Це гарантує, що localStorage оновлюється щоразу, коли змінюється стан tasks.
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  // Стан для фільтрації за категоріями
  const [filterCategory, setFilterCategory] = useState("Всі"); // 'Всі', 'Робота', 'Особисте', 'Навчання'

  // Використовуємо useMemo для підрахунку кількості виконаних завдань
  const completedTasksCount = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]); // Перераховуємо лише при зміні списку завдань

  // Фільтруємо завдання на основі обраної категорії
  const filteredTasks = useMemo(() => {
    if (filterCategory === "Всі") {
      return tasks;
    }
    return tasks.filter((task) => task.category === filterCategory);
  }, [tasks, filterCategory]); // Перераховуємо лише при зміні завдань або фільтра

  // Функція для додавання завдання (оптимізована за допомогою useCallback)
  const addTask = useCallback(
    (text, category) => {
      dispatch({ type: "ADD_TASK", payload: { text, category } });
    },
    [dispatch]
  ); // Залежність від dispatch

  // Функція для видалення завдання (оптимізована за допомогою useCallback)
  const deleteTask = useCallback(
    (id) => {
      dispatch({ type: "DELETE_TASK", payload: id });
    },
    [dispatch]
  ); // Залежність від dispatch

  // Функція для позначення завдання як виконаного/невиконаного (оптимізована за допомогою useCallback)
  const toggleTask = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TASK", payload: id });
    },
    [dispatch]
  ); // Залежність від dispatch

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        Мій Список Завдань
      </h1>

      {/* Компонент для додавання нового завдання */}
      <TaskInput addTask={addTask} />

      {/* Фільтри категорій */}
      <div className="flex justify-center space-x-4 mb-6">
        {["Всі", "Робота", "Особисте", "Навчання"].map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${
                filterCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Список завдань */}
      <div className="space-y-4 mb-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Немає завдань у цій категорії.
          </p>
        )}
      </div>

      {/* Лічильник виконаних завдань */}
      <div className="text-center text-gray-600 text-lg font-semibold mt-6">
        Виконано завдань: {completedTasksCount} з {tasks.length}
      </div>
    </div>
  );
}

export default TodoListApp;
