import React from "react";

// Компонент TaskItem для відображення окремого завдання
function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-sm border
      ${
        task.completed
          ? "bg-green-100 border-green-300"
          : "bg-white border-gray-200"
      }
      transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <span
          className={`ml-3 text-lg ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
        <span
          className={`ml-4 px-2 py-1 text-xs font-semibold rounded-full
          ${
            task.category === "Робота"
              ? "bg-red-200 text-red-800"
              : task.category === "Особисте"
              ? "bg-blue-200 text-blue-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {task.category}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        {/* SVG іконка для видалення */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default TaskItem;
